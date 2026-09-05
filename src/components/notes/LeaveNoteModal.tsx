import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiCheck } from 'react-icons/fi';
import { CommunityCard } from '@/components/notes/CommunityCard';
import {
  type CardColor,
  type CommunityNote,
  saveOrUpdateCommunityNote,
  getUserSavedNoteId,
} from '@/services/communityNotes';

interface LeaveNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteSaved: (note: CommunityNote) => void;
  existingNotes: CommunityNote[];
}

const colorOptions: { id: CardColor; label: string; swatch: string }[] = [
  { id: 'obsidian', label: 'Obsidian', swatch: 'bg-[#181d26] border-white/20' },
  { id: 'amber', label: 'Amber Gold', swatch: 'bg-[#b87004] border-amber-300/40' },
  { id: 'emerald', label: 'Emerald Pine', swatch: 'bg-[#0e5c4d] border-emerald-300/40' },
  { id: 'sapphire', label: 'Midnight Sapphire', swatch: 'bg-[#1b3a6e] border-sky-300/40' },
  { id: 'plum', label: 'Imperial Plum', swatch: 'bg-[#5c1a45] border-pink-300/40' },
  { id: 'titanium', label: 'Titanium Slate', swatch: 'bg-[#313747] border-white/30' },
];

export const LeaveNoteModal = ({
  isOpen,
  onClose,
  onNoteSaved,
  existingNotes,
}: LeaveNoteModalProps) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<CardColor>('obsidian');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingNoteId, setExistingNoteId] = useState<string | null>(null);

  // Check if user already has a note on open
  useEffect(() => {
    if (isOpen) {
      const savedId = getUserSavedNoteId();
      if (savedId) {
        const found = existingNotes.find(n => n.id === savedId);
        if (found) {
          setExistingNoteId(found.id);
          setName(found.name);
          setRole(found.role ?? '');
          setMessage(found.message);
          setColor(found.color);
          return;
        }
      }
      setExistingNoteId(null);
    }
  }, [isOpen, existingNotes]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const currentSpotNumber = existingNoteId
    ? existingNotes.find(n => n.id === existingNoteId)?.spotNumber ?? 1
    : existingNotes.reduce((max, n) => Math.max(max, n.spotNumber), 0) + 1;

  const previewNote: CommunityNote = {
    id: existingNoteId ?? 'preview',
    authorKey: 'preview-key',
    name: name.trim(),
    role: role.trim() !== '' ? role.trim() : undefined,
    message: message.trim() !== '' ? message.trim() : 'Leave a thought, message, feedback, or whatever.',
    color,
    spotNumber: currentSpotNumber,
    createdAt: Date.now(),
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { note } = await saveOrUpdateCommunityNote({
        id: existingNoteId ?? undefined,
        name,
        role,
        message,
        color,
      });
      onNoteSaved(note);
      onClose();
    } catch (err) {
      console.error('Error saving note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-[#12161f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left min-w-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {existingNoteId ? `SPOT #${String(currentSpotNumber)} (EDIT)` : `CLAIM SPOT #${String(currentSpotNumber)}`}
                </span>
                <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                  {existingNoteId ? 'Update your card & vibe' : 'Get your spot & drop a note'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Content: Form Left / Live Preview Right */}
            <form
              onSubmit={e => {
                void handleSubmit(e);
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-start min-w-0 w-full"
            >
              {/* Form Controls */}
              <div className="md:col-span-7 flex flex-col gap-4 min-w-0 w-full">
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs text-gray-300 mb-1.5">
                    What should we call you? <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={28}
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                    placeholder="e.g. Satoshi, Batman, or your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>

                {/* Role / Tagline */}
                <div>
                  <label className="block font-mono text-xs text-gray-300 mb-1.5">
                    Your vibe or title <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={role}
                    onChange={e => {
                      setRole(e.target.value);
                    }}
                    placeholder="e.g. Dev / Coffee Addict / Lurker"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-xs text-gray-300">
                      What's on your mind? <span className="text-amber-400">*</span>
                    </label>
                    <span className="font-mono text-[11px] text-gray-500">
                      {message.length}/120
                    </span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    maxLength={120}
                    value={message}
                    onChange={e => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Drop a quick hot take, greeting, or feedback (max 120 chars)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block font-mono text-xs text-gray-300 mb-2">
                    Pick your card aesthetic
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {colorOptions.map(opt => {
                      const isSelected = color === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setColor(opt.id);
                          }}
                          className={`relative w-8 h-8 rounded-full border ${opt.swatch} flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
                            isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#12161f]' : ''
                          }`}
                          title={opt.label}
                        >
                          {isSelected && <FiCheck size={13} className="text-white drop-shadow-md" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!message.trim() || isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-sans text-sm font-bold shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-101"
                  >
                    {isSubmitting
                      ? 'Securing Spot...'
                      : existingNoteId
                      ? `✨ Update Your Spot (Spot #${String(currentSpotNumber)})`
                      : `🚀 Drop Note`}
                  </button>
                </div>
              </div>

              {/* Live Card Preview */}
              <div className="md:col-span-5 hidden sm:flex flex-col items-center justify-start min-w-0 w-full pt-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Live Card Preview
                </span>
                <div className="w-[230px] max-w-full min-w-0 shrink-0">
                  <CommunityCard note={previewNote} isInteractive={false} />
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
