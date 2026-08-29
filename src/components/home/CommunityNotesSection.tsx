import { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StackedCardsCarousel } from '@/components/notes/StackedCardsCarousel';
import { LeaveNoteModal } from '@/components/notes/LeaveNoteModal';
import {
  getCommunityNotes,
  getUserSavedNoteId,
  SESSION_COMMUNITY_NOTES_KEY,
  type CommunityNote,
} from '@/services/communityNotes';
import { getSessionCache } from '@/utils/sessionCache';

export const CommunityNotesSection = () => {
  const [notes, setNotes] = useState<CommunityNote[]>(() => {
    const sessionData = getSessionCache(SESSION_COMMUNITY_NOTES_KEY);
    if (Array.isArray(sessionData)) return sessionData as CommunityNote[];
    const local = localStorage.getItem('jp_portfolio_notes_fallback_v2');
    if (local) {
      try {
        const parsed = JSON.parse(local) as CommunityNote[];
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userHasNote, setUserHasNote] = useState(() => {
    const savedId = getUserSavedNoteId();
    const sessionData = getSessionCache(SESSION_COMMUNITY_NOTES_KEY);
    if (savedId && Array.isArray(sessionData)) {
      return (sessionData as CommunityNote[]).some(n => n.id === savedId);
    }
    return false;
  });

  useEffect(() => {
    const fetchNotes = async () => {
      const fetched = await getCommunityNotes();
      setNotes(fetched);
      const savedId = getUserSavedNoteId();
      setUserHasNote(Boolean(savedId && fetched.some(n => n.id === savedId)));
    };
    void fetchNotes();
  }, []);

  const handleNoteSaved = (savedNote: CommunityNote) => {
    setNotes(prev => {
      const index = prev.findIndex(n => n.id === savedNote.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedNote;
        return updated;
      }
      return [savedNote, ...prev];
    });
    setUserHasNote(true);
  };

  return (
    <section id="notes" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="05"
        title="Notes"
        subtitle="Endorsements, greetings, and feedback from colleagues, users, and the tech community."
        viewAllLink={{
          label: 'All Notes',
          href: '/notes',
        }}
      />

      <StackedCardsCarousel
        notes={notes}
        onOpenModal={() => {
          setIsModalOpen(true);
        }}
        userHasNote={userHasNote}
      />

      <LeaveNoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onNoteSaved={handleNoteSaved}
        existingNotes={notes}
      />
    </section>
  );
};
