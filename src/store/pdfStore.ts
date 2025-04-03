import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PdfFileType {
  file: File | null;
  setFile: (file: File | null) => void;
}

// devtools를 적용한 스토어 생성
export const usePdfStore = create<PdfFileType>()(
  devtools((set) => ({
    file: null,
    setFile: (file: File | null) => set({ file }),
  }))
);
