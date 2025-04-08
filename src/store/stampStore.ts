import { create } from "zustand";
import { Canvas as FabricCanvas } from "fabric";

/**
 * @interface StampState
 * 스탬프와 캔버스 상태를 관리하기 위한 Zustand 스토어의 상태 인터페이스입니다.
 *
 * @property {string[]} stamps - 업로드된 스탬프 이미지 URL 배열
 *   - 각 요소는 스탬프 이미지의 Base64 데이터 URL 또는 파일 경로
 * @property {(newStamps: string[]) => void} addStamps - 새로운 스탬프 추가 함수
 *   - 최대 5개 제한을 적용하며, 기존 스탬프에 새 스탬프를 추가
 * @property {(index: number) => void} removeStamp - 특정 스탬프 제거 함수
 *   - 주어진 인덱스의 스탬프를 배열에서 제거
 * @property {() => void} clearStamps - 모든 스탬프 초기화 함수
 *   - 스탬프 배열을 빈 배열로 설정
 * @property {FabricCanvas | null} fabricCanvasRef - Fabric.js 캔버스 인스턴스
 *   - 캔버스 객체를 저장하며, null일 경우 초기화되지 않음을 의미
 * @property {(canvas: FabricCanvas | null) => void} setfabricCanvasRef - Fabric.js 캔버스 설정 함수
 *   - 캔버스 인스턴스를 상태에 저장
 */
interface StampState {
  stamps: string[];
  addStamps: (newStamps: string[]) => void;
  removeStamp: (index: number) => void;
  clearStamps: () => void;
  fabricCanvasRef: FabricCanvas | null;
  setfabricCanvasRef: (canvas: FabricCanvas | null) => void;
}

/**
 * @function useStampStore
 * 스탬프 이미지와 캔버스 상태를 관리하는 Zustand 스토어입니다.
 * - 스탬프 이미지 URL 배열(`stamps`)을 저장하고 최대 5개로 제한
 * - 스탬프 추가, 제거, 초기화 및 캔버스 설정을 위한 메서드 제공
 *
 * @example
 * const { addStamps, stamps, setfabricCanvasRef } = useStampStore();
 * addStamps(["data:image/png;base64,..."]);
 * setfabricCanvasRef(new FabricCanvas(canvasElement));
 *
 * @returns {StampState} 스탬프와 캔버스 상태 및 관리 함수를 포함한 스토어 객체
 */
export const useStampStore = create<StampState>((set) => ({
  stamps: [], // 초기값: 업로드된 스탬프 없음
  addStamps: (newStamps) =>
    set((state) => {
      const MAX_STAMPS = 5; // 최대 스탬프 개수 제한
      const remainingSlots = MAX_STAMPS - state.stamps.length;

      if (state.stamps.length >= MAX_STAMPS) {
        return state; // 최대 개수 초과 시 변경 없음
      }

      // 남은 슬롯에 맞게 새 스탬프 추가
      const stampsToAdd = newStamps.slice(0, remainingSlots);
      return { stamps: [...state.stamps, ...stampsToAdd] };
    }),
  removeStamp: (removeIdx) =>
    set((state) => ({
      stamps: state.stamps.filter((_, i) => i !== removeIdx), // 인덱스에 해당하는 스탬프 제거
    })),
  clearStamps: () => set({ stamps: [] }), // 모든 스탬프 초기화
  fabricCanvasRef: null, // 초기값: 캔버스 인스턴스 없음
  setfabricCanvasRef: (fabricCanvasRef: FabricCanvas | null) => set({ fabricCanvasRef }), // Fabric.js 캔버스 업데이트
}));
