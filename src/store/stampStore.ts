import { create } from "zustand";
import { Canvas as FabricCanvas } from "fabric";

interface StampState {
  stamps: string[];
  addStamps: (newStamps: string[]) => void;
  removeStamp: (index: number) => void;
  clearStamps: () => void;
  fabricCanvasRef: FabricCanvas | null; // canvas 자체를 저장
  setfabricCanvasRef: (canvas: FabricCanvas | null) => void; // canvas 설정
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
  fabricCanvasRef: null,
  setfabricCanvasRef: (fabricCanvasRef: FabricCanvas | null) => set({ fabricCanvasRef }),
}));
