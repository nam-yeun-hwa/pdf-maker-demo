import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PdfPathType {
  imgPath: string;
  setImgPath: (path: string) => void;
}

// devtools를 적용한 스토어 생성
export const useSelectedPdfStore = create<PdfPathType>()(
  devtools((set) => ({
    imgPath: "",
    setImgPath: (imgPath: string) => set({ imgPath }),
  }))
);
