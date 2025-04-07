import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PdfFileType {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const usePdfStore = create<PdfFileType>()(
  devtools((set) => ({
    file: null,
    setFile: (file: File | null) => set({ file }),
  }))
);
