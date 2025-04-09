import { useEffect } from "react";
import * as fabric from "fabric";
import { removeSelectedObject } from "@/utils/fabricUtils";

/**
 * 캔버스에서 키보드 이벤트를 통해 객체를 제어하는 커스텀 훅
 * @param {fabric.Canvas | null} canvas - Fabric.js 캔버스 인스턴스
 */
export const useCanvasControls = (canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        removeSelectedObject(canvas);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);
};
