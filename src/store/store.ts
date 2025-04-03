import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  file: File | null;
  setFile: (file: File | null) => void;
}

// devtools를 적용한 스토어 생성
export const useStore = create<Store>()(
  devtools((set) => ({
    file: null,
    setFile: (file: File | null) => set({ file }),
  }))
);
