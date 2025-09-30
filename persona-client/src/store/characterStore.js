import { create } from 'zustand';

export const useCharacterStore = create((set) => ({
  character: null,
  setCharacter: (data) => set({ character: data })
}));
