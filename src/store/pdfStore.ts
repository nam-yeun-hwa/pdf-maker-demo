import { create } from "zustand";

/**
 * @interface PdfFileState
 * PDF 파일 상태를 관리하기 위한 Zustand 스토어의 상태 인터페이스입니다.
 *
 * @property {File | null} file - 업로드된 PDF 파일 객체
 *   - File 타입의 PDF 파일을 저장하며, null일 경우 파일이 없음을 의미
 * @property {(file: File | null) => void} setFile - PDF 파일 설정 함수
 *   - 업로드된 PDF 파일을 상태에 저장하거나 제거
 */
interface PdfFileState {
  file: File | null;
  setFile: (file: File | null) => void;
}

/**
 * PDF 파일 상태를 관리하는 Zustand 스토어입니다.
 * - 업로드된 PDF 파일(`file`)을 저장하고 업데이트
 * - 파일 설정 및 제거를 위한 메서드 제공
 *
 * @example
 * const { file, setFile } = usePdfStore();
 * setFile(new File([""], "example.pdf", { type: "application/pdf" }));
 *
 * @returns {PdfFileState} PDF 파일 상태와 설정 함수를 포함한 스토어 객체
 */
export const usePdfStore = create<PdfFileState>((set) => ({
  file: null, // 초기값: PDF 파일 없음
  setFile: (file: File | null) => set({ file }), // PDF 파일 상태 업데이트
}));
