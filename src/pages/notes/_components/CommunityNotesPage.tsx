import { useState, useEffect } from 'react';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Footer } from '@/components/footer/Footer';
import { CommunityCard } from '@/components/notes/CommunityCard';
import { LeaveNoteModal } from '@/components/notes/LeaveNoteModal';
import {
  getCommunityNotes,
  getUserSavedNoteId,
  type CommunityNote,
} from '@/services/communityNotes';

export const CommunityNotesPage = () => {
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
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Sticky Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-4xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            number="05"
            title="Community Board"
            subtitle="Explore all notes, testimonials, and verified member cards from collaborators and visitors."
          />

          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="shrink-0 self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-sans text-xs font-bold shadow-md transition-all duration-200 cursor-pointer hover:scale-102"
          >
            {userHasNote ? '✨ Edit Your Spot' : '🚀 Drop a Note'}
          </button>
        </div>

        {/* Empty State or Masonry Grid Layout */}
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div
              className="w-full max-w-[340px] cursor-pointer mb-6"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <CommunityCard
                note={{
                  id: 'empty-placeholder',
                  authorKey: 'empty',
                  name: 'Claim Spot #1',
                  role: 'First Community Contributor',
                  message: 'No community notes yet. Be the first to leave your feedback, testimonial, or note and claim Spot #1 on the board!',
                  color: 'obsidian',
                  spotNumber: 1,
                  createdAt: Date.now(),
                }}
                isInteractive={true}
              />
            </div>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400 max-w-sm">
              The board is fresh and awaiting its first contributor. Click the card or button above to claim Spot #1!
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pt-2">
            {notes.map(note => (
              <div key={note.id} className="break-inside-avoid">
                <CommunityCard note={note} isInteractive={true} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <LeaveNoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onNoteSaved={handleNoteSaved}
        existingNotes={notes}
      />
    </div>
  );
};
