import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Theme, Notification, ModalState } from '../types';

// ============================================
// App Store - Global Application State
// ============================================

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserPoints: (points: number) => void;
  updateWalletBalance: (amount: number) => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;

  // Modal
  modal: ModalState;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;

  // UI State
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // User - Default mock user
      user: {
        id: '1',
        name: 'Alexandros',
        email: 'alex@example.com',
        verified: true,
        points: 1250,
        walletBalance: 45.50,
      },
      setUser: (user) => set({ user }),
      updateUserPoints: (points) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, points: user.points + points } });
        }
      },
      updateWalletBalance: (amount) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, walletBalance: user.walletBalance + amount } });
        }
      },

      // Notifications
      notifications: [
        {
          id: '1',
          title: 'Request Update',
          message: 'Your street light repair request is now in progress.',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Points Earned',
          message: 'You earned 50 points for recycling!',
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Water Supply Notice',
          message: 'Scheduled maintenance on Dec 8th in Kypseli area.',
          type: 'warning',
          read: true,
          createdAt: new Date().toISOString(),
        },
      ],
      unreadCount: 2,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

      // Modal
      modal: { isOpen: false, type: null, data: undefined },
      openModal: (type, data) => set({ modal: { isOpen: true, type, data } }),
      closeModal: () => set({ modal: { isOpen: false, type: null, data: undefined } }),

      // UI State
      isChatOpen: false,
      setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
      isSearchOpen: false,
      setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'athens-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);
