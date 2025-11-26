'use client';

import { create } from 'zustand';

interface User {
  id: string;
  nickname: string;
}

export const useAuthStore = create<{
  user: User | null;
  isUserLoaded: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  markUserLoaded: () => void;
}>((set) => ({
  user: null,
  isUserLoaded: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  markUserLoaded: () => set({ isUserLoaded: true }),
}));
