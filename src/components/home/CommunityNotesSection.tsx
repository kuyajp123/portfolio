import { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StackedCardsCarousel } from '@/components/notes/StackedCardsCarousel';
import { LeaveNoteModal } from '@/components/notes/LeaveNoteModal';
import {
  getCommunityNotes,
  getUserSavedNoteId,
  type CommunityNote,
} from '@/services/communityNotes';

export const CommunityNotesSection = () => {
  const [notes, setNotes] = useState<CommunityNote[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userHasNote, setUserHasNote] = useState(false);

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
