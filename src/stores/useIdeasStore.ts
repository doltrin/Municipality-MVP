import { create } from 'zustand';
import type { Idea, IdeaFormData } from '../types';

// ============================================
// Ideas Store - Citizen Ideas State Management
// ============================================

interface IdeasState {
  // Ideas List
  ideas: Idea[];
  filteredIdeas: Idea[];
  activeCategory: string;
  
  // Liked Ideas
  likedIdeas: Set<string>;
  
  // View Mode
  viewMode: 'browse' | 'submit';
  
  // Form State
  formData: IdeaFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submittedReference: string | null;
  
  // Actions
  setActiveCategory: (category: string) => void;
  setViewMode: (mode: 'browse' | 'submit') => void;
  toggleLike: (ideaId: string) => void;
  
  // Form Actions
  updateFormData: (data: Partial<IdeaFormData>) => void;
  resetForm: () => void;
  submitIdea: () => Promise<void>;
  resetSubmission: () => void;
}

const initialFormData: IdeaFormData = {
  title: '',
  description: '',
  category: '',
  location: '',
  images: [],
};

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Free WiFi in all public squares',
    description: 'Install free public WiFi hotspots in all major squares and parks to improve connectivity for citizens and tourists.',
    category: 'digital',
    location: 'City-wide',
    author: 'Maria K.',
    date: '2 days ago',
    likes: 234,
    comments: 18,
    status: 'under_review'
  },
  {
    id: '2',
    title: 'More recycling bins in Exarchia',
    description: 'The neighborhood needs more recycling bins, especially for plastic and paper. Current bins are always overflowing.',
    category: 'environment',
    location: 'Exarchia',
    author: 'Nikos P.',
    date: '5 days ago',
    likes: 156,
    comments: 12,
    status: 'approved'
  },
  {
    id: '3',
    title: 'Pedestrian zone on Ermou Street weekends',
    description: 'Close Ermou Street to traffic on weekends to create a pedestrian-friendly shopping experience.',
    category: 'mobility',
    location: 'Syntagma',
    author: 'Elena T.',
    date: '1 week ago',
    likes: 412,
    comments: 45,
    status: 'implemented'
  },
  {
    id: '4',
    title: 'Community garden in abandoned lot',
    description: 'Transform the abandoned lot on Patision Street into a community garden where residents can grow vegetables.',
    category: 'environment',
    location: 'Patisia',
    author: 'Dimitris M.',
    date: '3 days ago',
    likes: 89,
    comments: 7,
    status: 'pending'
  },
  {
    id: '5',
    title: 'Night bus service extension',
    description: 'Extend night bus service hours until 3 AM on weekends to improve nightlife accessibility.',
    category: 'mobility',
    location: 'City-wide',
    author: 'Sofia L.',
    date: '4 days ago',
    likes: 298,
    comments: 23,
    status: 'under_review'
  },
];

export const useIdeasStore = create<IdeasState>((set, get) => ({
  // Initial State
  ideas: mockIdeas,
  filteredIdeas: mockIdeas,
  activeCategory: 'all',
  likedIdeas: new Set(),
  viewMode: 'browse',
  formData: initialFormData,
  isSubmitting: false,
  isSubmitted: false,
  submittedReference: null,

  // Category Filter
  setActiveCategory: (category) => {
    const ideas = get().ideas;
    const filtered = category === 'all' 
      ? ideas 
      : ideas.filter(i => i.category === category);
    set({ activeCategory: category, filteredIdeas: filtered });
  },

  // View Mode
  setViewMode: (mode) => set({ viewMode: mode }),

  // Like Toggle
  toggleLike: (ideaId) => {
    const likedIdeas = new Set(get().likedIdeas);
    if (likedIdeas.has(ideaId)) {
      likedIdeas.delete(ideaId);
    } else {
      likedIdeas.add(ideaId);
    }
    set({ likedIdeas });
  },

  // Form Actions
  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data }
    }));
  },

  resetForm: () => set({ formData: initialFormData }),

  submitIdea: async () => {
    set({ isSubmitting: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const reference = `IDEA-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    
    set({ 
      isSubmitting: false, 
      isSubmitted: true,
      submittedReference: reference,
    });
  },

  resetSubmission: () => {
    set({
      isSubmitted: false,
      submittedReference: null,
      formData: initialFormData,
      viewMode: 'browse',
    });
  },
}));
