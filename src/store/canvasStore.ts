import { create } from "zustand";
import { Canvas as FabricCanvas } from "fabric";

interface StampState {
  fabricCanvasRef: FabricCanvas | null; // canvas 자체를 저장
  setfabricCanvasRef: (canvas: FabricCanvas | null) => void; // canvas 설정
  canvasRef: HTMLCanvasElement | null;
  setCanvasRef: (canvasRef: HTMLCanvasElement | null) => void;
}

export const useCanvasStore = create<StampState>((set) => ({
  fabricCanvasRef: null,
  setfabricCanvasRef: (fabricCanvasRef: FabricCanvas | null) => set({ fabricCanvasRef }),
  canvasRef: null,
  setCanvasRef: (canvasRef: HTMLCanvasElement | null) => set({ canvasRef }),
}));
