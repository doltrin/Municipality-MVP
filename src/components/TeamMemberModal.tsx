import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTeamStore } from '../stores';
import { Button } from './ui';

// ============================================
// Team Member Modal - Shows work question for Maher
// ============================================

export const TeamMemberModal: React.FC = () => {
  const { 
    isModalOpen, 
    selectedMember, 
    modalResponse, 
    showSadEmoji,
    closeModal, 
    setModalResponse 
  } = useTeamStore();

  if (!isModalOpen || !selectedMember) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xs bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="p-6 text-center">
            {!showSadEmoji ? (
              <>
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {selectedMember.name.charAt(0)}
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedMember.name}
                </h2>

                {/* Question */}
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Did you work today?
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="success"
                    fullWidth
                    onClick={() => setModalResponse('yes')}
                  >
                    Yes ✓
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => setModalResponse('no')}
                  >
                    No ✗
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Sad Emoji */}
                <div className="text-8xl mb-4">😢</div>
                
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {modalResponse === 'yes' ? 'Oh no...' : 'That\'s sad...'}
                </h2>
                
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                  {modalResponse === 'yes' 
                    ? 'Even though you worked, it\'s still sad!' 
                    : 'We missed you today!'}
                </p>

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={closeModal}
                >
                  Close
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeamMemberModal;
