import { create } from 'zustand';
import type { TeamMember } from '../types';

// ============================================
// Team Store - Team Members & Modal State
// ============================================

interface TeamState {
  // Team Members
  members: TeamMember[];
  
  // Modal State
  selectedMember: TeamMember | null;
  isModalOpen: boolean;
  modalResponse: 'yes' | 'no' | null;
  showSadEmoji: boolean;
  
  // Actions
  selectMember: (member: TeamMember) => void;
  closeModal: () => void;
  setModalResponse: (response: 'yes' | 'no') => void;
  resetModal: () => void;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Ejaz', role: 'Developer' },
  { id: '2', name: 'Maher', role: 'Lead' },
  { id: '3', name: 'Rao', role: 'Developer' },
  { id: '4', name: 'Nafih', role: 'Designer' },
  { id: '5', name: 'Jerryn', role: 'Developer' },
];

export const useTeamStore = create<TeamState>((set) => ({
  // Initial State
  members: teamMembers,
  selectedMember: null,
  isModalOpen: false,
  modalResponse: null,
  showSadEmoji: false,

  // Actions
  selectMember: (member) => {
    // Only show modal for Maher
    if (member.name === 'Maher') {
      set({ selectedMember: member, isModalOpen: true, modalResponse: null, showSadEmoji: false });
    }
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedMember: null, modalResponse: null, showSadEmoji: false });
  },

  setModalResponse: (response) => {
    // Always show sad emoji regardless of response
    set({ modalResponse: response, showSadEmoji: true });
  },

  resetModal: () => {
    set({ selectedMember: null, isModalOpen: false, modalResponse: null, showSadEmoji: false });
  },
}));
