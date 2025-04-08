import { create } from "zustand";

/**
 * @interface PdfPathState
 * 선택된 PDF 페이지의 이미지 경로를 관리하기 위한 Zustand 스토어의 상태 인터페이스입니다.
 *
 * @property {string} imgPath - 선택된 PDF 페이지의 이미지 경로
 *   - Base64 데이터 URL 또는 이미지 파일 경로를 저장하며, 빈 문자열일 경우 선택되지 않음을 의미
 * @property {(path: string) => void} setImgPath - 이미지 경로 설정 함수
 *   - 선택된 PDF 페이지의 이미지 경로를 상태에 저장
 */
interface PdfPathState {
  imgPath: string;
  setImgPath: (path: string) => void;
}

/**
 * @function useSelectedPdfStore
 * 선택된 PDF 페이지의 이미지 경로를 관리하는 Zustand 스토어입니다.
 * - 선택된 페이지의 이미지 경로(`imgPath`)를 저장하고 업데이트
 * - 경로 설정을 위한 메서드 제공
 *
 * @example
 * const { imgPath, setImgPath } = useSelectedPdfStore();
 * setImgPath("data:image/png;base64,...");
 *
 * @returns {PdfPathType} 이미지 경로 상태와 설정 함수를 포함한 스토어 객체
 */
export const useSelectedPdfStore = create<PdfPathState>((set) => ({
  imgPath: "", // 초기값: 선택된 이미지 경로 없음 (빈 문자열)
  setImgPath: (imgPath: string) => set({ imgPath }), // 이미지 경로 상태 업데이트
}));
