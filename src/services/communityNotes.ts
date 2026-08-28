import { Redis } from '@upstash/redis';

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

const REDIS_KEY = 'portfolio_community_notes_v2';
const REDIS_PROFILE_STATUS_KEY = 'portfolio_profile_status';
const LOCAL_STORAGE_NOTE_ID_KEY = 'jp_portfolio_user_note_id';
const LOCAL_STORAGE_AUTHOR_KEY = 'jp_portfolio_user_author_key';
const LOCAL_STORAGE_FALLBACK_NOTES_KEY = 'jp_portfolio_notes_fallback_v2';
const LOCAL_STORAGE_PROFILE_STATUS_KEY = 'jp_portfolio_profile_status';

const UPSTASH_URL = (import.meta.env.VITE_UPSTASH_REDIS_REST_URL as string | undefined) ?? '';
const UPSTASH_TOKEN = (import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN as string | undefined) ?? '';

let redisClient: Redis | null = null;
if (UPSTASH_URL && UPSTASH_TOKEN) {
  try {
    redisClient = new Redis({
      url: UPSTASH_URL,
      token: UPSTASH_TOKEN,
    });
  } catch (err) {
    console.warn('Failed to initialize Upstash Redis client:', err);
  }
}

export const initialSeedNotes: CommunityNote[] = [];

export const getProfileStatus = async (): Promise<string> => {
  if (redisClient) {
    try {
      const data = await redisClient.get<string | { text?: string }>(REDIS_PROFILE_STATUS_KEY);
      if (typeof data === 'string' && data.trim() !== '') {
        return data.trim();
      }
      if (typeof data === 'object' && data !== null && typeof data.text === 'string' && data.text.trim() !== '') {
        return data.text.trim();
      }
    } catch (err) {
      console.warn('Error fetching profile status from Upstash Redis:', err);
    }
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
  if (redisClient) {
    try {
      const data = await redisClient.get<CommunityNote[]>(REDIS_KEY);
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    } catch (err) {
      console.warn('Error fetching notes from Upstash Redis, using local fallback:', err);
    }
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
  const existingNotes = await getCommunityNotes();
  const existingNoteId = input.id ?? getUserSavedNoteId();

  const existingIndex = existingNoteId
    ? existingNotes.findIndex(n => n.id === existingNoteId && (n.authorKey === authorKey || !n.authorKey))
    : -1;

  let savedNote: CommunityNote;
  let isNew = false;
  let updatedList: CommunityNote[];

  if (existingIndex >= 0) {
    savedNote = {
      ...existingNotes[existingIndex],
      name: input.name.trim() !== '' ? input.name.trim() : 'Anonymous Visitor',
      role: input.role && input.role.trim() !== '' ? input.role.trim() : 'Community Member',
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
      name: input.name.trim() !== '' ? input.name.trim() : 'Anonymous Visitor',
      role: input.role && input.role.trim() !== '' ? input.role.trim() : 'Community Member',
      message: input.message.trim(),
      color: input.color,
      spotNumber: maxSpotNumber + 1,
      createdAt: Date.now(),
    };
    updatedList = [savedNote, ...existingNotes];
  }

  setUserSavedNoteId(savedNote.id);
  localStorage.setItem(LOCAL_STORAGE_FALLBACK_NOTES_KEY, JSON.stringify(updatedList));

  if (redisClient) {
    try {
      await redisClient.set(REDIS_KEY, updatedList);
    } catch (err) {
      console.warn('Error saving note to Upstash Redis, kept in local fallback:', err);
    }
  }

  return { note: savedNote, isNew };
};