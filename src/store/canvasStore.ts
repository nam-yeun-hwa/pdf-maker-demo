import { create } from "zustand";
import { Canvas as FabricCanvas } from "fabric";

/**
 * @interface StampState
 * 캔버스 상태를 관리하기 위한 Zustand 스토어의 상태 인터페이스입니다.
 *
 * @property {FabricCanvas | null} fabricCanvasRef - Fabric.js 캔버스 인스턴스
 *   - 캔버스 객체를 저장하며, null일 경우 초기화되지 않음을 의미
 * @property {(canvas: FabricCanvas | null) => void} setfabricCanvasRef - Fabric.js 캔버스 설정 함수
 *   - 캔버스 인스턴스를 상태에 저장
 * @property {HTMLCanvasElement | null} canvasRef - HTML 캔버스 요소에 대한 참조
 *   - DOM 요소로서의 캔버스를 저장하며, null일 경우 초기화되지 않음을 의미
 * @property {(canvasRef: HTMLCanvasElement | null) => void} setCanvasRef - HTML 캔버스 요소 설정 함수
 *   - 캔버스 DOM 요소를 상태에 저장
 */
interface StampState {
  fabricCanvasRef: FabricCanvas | null;
  setfabricCanvasRef: (canvas: FabricCanvas | null) => void;
  canvasRef: HTMLCanvasElement | null;
  setCanvasRef: (canvasRef: HTMLCanvasElement | null) => void;
}

/**
 * @function useCanvasStore
 * 캔버스와 관련된 상태를 관리하는 Zustand 스토어입니다.
 * - Fabric.js 캔버스 인스턴스(`fabricCanvasRef`)와 HTML 캔버스 요소(`canvasRef`)를 저장
 * - 캔버스 설정 및 업데이트를 위한 메서드 제공
 *
 * @example
 * const { fabricCanvasRef, setfabricCanvasRef } = useCanvasStore();
 * setfabricCanvasRef(new FabricCanvas(canvasElement));
 *
 * @returns {StampState} 캔버스 상태와 설정 함수를 포함한 스토어 객체
 */
export const useCanvasStore = create<StampState>((set) => ({
  fabricCanvasRef: null, // 초기값: 캔버스 인스턴스 없음
  setfabricCanvasRef: (fabricCanvasRef: FabricCanvas | null) => set({ fabricCanvasRef }), // Fabric.js 캔버스 업데이트
  canvasRef: null, // 초기값: HTML 캔버스 요소 없음
  setCanvasRef: (canvasRef: HTMLCanvasElement | null) => set({ canvasRef }), // HTML 캔버스 요소 업데이트
}));
