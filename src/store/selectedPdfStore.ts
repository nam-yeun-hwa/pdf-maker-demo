import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PdfPathType {
  imgPath: string;
  setImgPath: (path: string) => void;
}

export const useSelectedPdfStore = create<PdfPathType>()(
  devtools((set) => ({
    imgPath: "",
    setImgPath: (imgPath: string) => set({ imgPath }),
  }))
);
