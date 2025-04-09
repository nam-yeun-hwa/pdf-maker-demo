import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { initializeFabricCanvas, loadImageToCanvas } from "@/utils/fabricUtils";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import { useCanvasStore } from "@/store/canvasStore";

/**
 * Fabric.js 캔버스를 초기화하고 PDF 이미지를 로드하는 커스텀 훅
 * @param {number} canvasMargin - 캔버스와 컨테이너 간 여백
 * @param {number} heightRatio - 캔버스 높이 비율 (너비 기준)
 * @returns {{ containerRef: React.RefObject<HTMLDivElement>, canvasRef: React.RefObject<HTMLCanvasElement> }}
 */
export const useFabricCanvas = (canvasMargin: number, heightRatio: number) => {
  const { imgPath } = useSelectedPdfStore();
  const { setfabricCanvasRef, setCanvasRef } = useCanvasStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const container = containerRef.current; //컨테이너 넓이 참조
    const canvasElement = canvasRef.current; //캔버스 참조

    if (!container || !canvasElement) {
      console.error("Container or canvas element is not available");
      return;
    }

    // 캔버스 초기화
    if (!fabricCanvasRef.current) {
      const width = container.offsetWidth;
      fabricCanvasRef.current = initializeFabricCanvas(canvasElement, width, container.offsetHeight);
      setCanvasRef(canvasElement);
      setfabricCanvasRef(fabricCanvasRef.current);
      console.log("initializeFabricCanvas");
    }

    const fabricCanvas = fabricCanvasRef.current; //패브릭캔버스 참조
    if (!fabricCanvas || !imgPath) return;

    // fabricCanvas.clear();

    if (!imgPath.startsWith("data:image/")) {
      console.error("Invalid image format. Expected Base64 data URL:", imgPath);
      return;
    }

    const canvasWidth = container.offsetWidth - canvasMargin;
    loadImageToCanvas(imgPath, fabricCanvas, canvasWidth);
  }, [imgPath, canvasMargin, heightRatio, setCanvasRef, setfabricCanvasRef]);

  return { containerRef, canvasRef };
};
