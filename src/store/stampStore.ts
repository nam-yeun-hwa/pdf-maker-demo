import { create } from "zustand";

interface StampState {
  stamps: string[];
  addStamps: (newStamps: string[]) => void;
  removeStamp: (index: number) => void;
  clearStamps: () => void;
}

export const useStampStore = create<StampState>((set) => ({
  stamps: [], // 도장 이미지 URL 배열
  addStamps: (newStamps) =>
    set((state) => {
      const remainingSlots = 5 - state.stamps.length;
      if (state.stamps.length + newStamps.length > 5) {
        return {
          stamps: [...state.stamps, ...newStamps.slice(0, remainingSlots)],
        };
      }
      return { stamps: [...state.stamps, ...newStamps] };
    }),
  removeStamp: (removeIdx) =>
    set((state) => ({
      stamps: state.stamps.filter((_, i) => i !== removeIdx),
    })),
  clearStamps: () => set({ stamps: [] }),
}));
