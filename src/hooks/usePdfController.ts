import { useRef, ChangeEvent } from "react";
import { usePdfStore } from "@/store/pdfStore";
import { useCanvasStore } from "@/store/canvasStore";

/**
 * @hook usePdfController
 * @description PDF 파일 업로드, 제거, 캔버스 초기화를 관리하는 커스텀 훅
 * @returns PDF 파일 상태와 관련 핸들러 및 참조 객체
 */
export const usePdfController = () => {
  const { file, setFile } = usePdfStore();
  const { fabricCanvasRef } = useCanvasStore();
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) {
      setFile(pdfFile);
      e.target.value = ""; // 동일 파일 재선택 가능하도록 초기화
    }
  };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
    if (fabricCanvasRef) {
      fabricCanvasRef.clear();
      fabricCanvasRef.renderAll();
    }
  };

  return { file, pdfInputRef, handlePDFChange, handlePDFUpload, handlePDFRemove };
};
