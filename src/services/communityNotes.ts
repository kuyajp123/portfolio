import { COMMUNITY_NOTES, PROFILE_STATUS } from '@/API/endpoint';

export type CardColor = 'obsidian' | 'amber' | 'emerald' | 'sapphire' | 'plum' | 'titanium';

export interface CommunityNote {
  id: string;
  authorKey: string;
  name: string;
  role?: string;
  message: string;
  color: CardColor;
  spotNumber: number;
  memberNumber?: number;
  createdAt: number;
  updatedAt?: number;
}

const LOCAL_STORAGE_NOTE_ID_KEY = 'jp_portfolio_user_note_id';
const LOCAL_STORAGE_AUTHOR_KEY = 'jp_portfolio_user_author_key';
const LOCAL_STORAGE_FALLBACK_NOTES_KEY = 'jp_portfolio_notes_fallback_v2';
const LOCAL_STORAGE_PROFILE_STATUS_KEY = 'jp_portfolio_profile_status';

export const initialSeedNotes: CommunityNote[] = [];

export const getProfileStatus = async (): Promise<string> => {
  try {
    const res = await fetch(PROFILE_STATUS.API);
    if (res.ok) {
      const data = (await res.json()) as { status?: string };
      if (typeof data.status === 'string') {
        const text = data.status.trim();
        localStorage.setItem(LOCAL_STORAGE_PROFILE_STATUS_KEY, text);
        return text;
      }
    }
  } catch (err) {
    console.warn('Error fetching profile status from server function:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_PROFILE_STATUS_KEY);
  if (cached && cached.trim() !== '') {
    return cached.trim();
  }

  return '';
};

export const getOrCreateAuthorKey = (): string => {
  let key = localStorage.getItem(LOCAL_STORAGE_AUTHOR_KEY);
  if (!key) {
    key = 'usr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem(LOCAL_STORAGE_AUTHOR_KEY, key);
  }
  return key;
};

export const getUserSavedNoteId = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_NOTE_ID_KEY);
};

export const setUserSavedNoteId = (id: string): void => {
  localStorage.setItem(LOCAL_STORAGE_NOTE_ID_KEY, id);
};

export const getCommunityNotes = async (): Promise<CommunityNote[]> => {
  try {
    const res = await fetch(COMMUNITY_NOTES.API);
    if (res.ok) {
      const data = (await res.json()) as CommunityNote[];
      if (Array.isArray(data)) {
        localStorage.setItem(LOCAL_STORAGE_FALLBACK_NOTES_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Error fetching notes from server function, using local fallback:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_FALLBACK_NOTES_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as CommunityNote[];
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Ignore parse errors
    }
  }

  return [];
};

export const saveOrUpdateCommunityNote = async (input: {
  id?: string;
  name: string;
  role?: string;
  message: string;
  color: CardColor;
}): Promise<{ note: CommunityNote; isNew: boolean }> => {
  const authorKey = getOrCreateAuthorKey();
  const existingNoteId = input.id ?? getUserSavedNoteId();

  try {
    const res = await fetch(COMMUNITY_NOTES.API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: existingNoteId ?? undefined,
        authorKey,
        name: input.name,
        role: input.role,
        message: input.message,
        color: input.color,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as { note: CommunityNote; isNew: boolean };
      setUserSavedNoteId(data.note.id);
      const cached = await getCommunityNotes();
      const updated = data.isNew
        ? [data.note, ...cached.filter(n => n.id !== data.note.id)]
        : cached.map(n => (n.id === data.note.id ? data.note : n));
      localStorage.setItem(LOCAL_STORAGE_FALLBACK_NOTES_KEY, JSON.stringify(updated));
      return data;
    }
  } catch (err) {
    console.warn('Error saving note via server function, applying local offline fallback:', err);
  }

  // Local offline fallback if serverless function is unreachable
  const existingNotes = await getCommunityNotes();
  const existingIndex = existingNoteId
    ? existingNotes.findIndex(n => n.id === existingNoteId && (n.authorKey === authorKey || !n.authorKey))
    : -1;

  let savedNote: CommunityNote;
  let isNew = false;
  let updatedList: CommunityNote[];

  if (existingIndex >= 0) {
    savedNote = {
      ...existingNotes[existingIndex],
      name: input.name.trim(),
      role: input.role && input.role.trim() !== '' ? input.role.trim() : undefined,
      message: input.message.trim(),
      color: input.color,
      spotNumber: existingNotes[existingIndex].spotNumber,
      updatedAt: Date.now(),
    };
    updatedList = [...existingNotes];
    updatedList[existingIndex] = savedNote;
  } else {
    isNew = true;
    const maxSpotNumber = existingNotes.reduce(
      (max, n) => (n.spotNumber > max ? n.spotNumber : max),
      0
    );

    savedNote = {
      id: 'note_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
      authorKey,
      name: input.name.trim(),
      role: input.role && input.role.trim() !== '' ? input.role.trim() : undefined,
      message: input.message.trim(),
      color: input.color,
      spotNumber: maxSpotNumber + 1,
      createdAt: Date.now(),
    };
    updatedList = [savedNote, ...existingNotes];
  }

  setUserSavedNoteId(savedNote.id);
  localStorage.setItem(LOCAL_STORAGE_FALLBACK_NOTES_KEY, JSON.stringify(updatedList));

  return { note: savedNote, isNew };
};