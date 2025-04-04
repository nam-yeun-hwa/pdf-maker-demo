import * as fabric from "fabric";
import { useEffect, useRef } from "react";

import "@/assets/css/B.css";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import { useStampStore } from "@/store/stampStore";

const PdfSelectViewer = () => {
  const { imgPath } = useSelectedPdfStore();
  const { setfabricCanvasRef } = useStampStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current && containerRef.current) {
      console.log("canvasRef.current.offsetWidth:", canvasRef.current.offsetWidth);
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        backgroundColor: "#f0f0f0",
      });
    } else if (!canvasRef.current) {
      console.error("Canvas element is not available");
    }

    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas && imgPath && containerRef.current) {
      setfabricCanvasRef(fabricCanvas);
      fabricCanvas.clear();

      if (!imgPath.startsWith("data:image/")) {
        console.error("Invalid imageUrl format:", imgPath);
        return;
      }

      const FABRIC_CANVAS_WIDTH = containerRef.current?.offsetWidth - 20;
      const imgElement = new Image();
      imgElement.src = imgPath;
      imgElement.onload = () => {
        const fabricImg = new fabric.FabricImage(imgElement);

        fabricImg.scaleToWidth(FABRIC_CANVAS_WIDTH);
        fabricImg.set({
          left: 10,
          top: 10,
          selectable: false, // 선택 불가능 (마우스로 드래그/선택 불가)
          lockMovementX: true, // X축 이동 잠금
          lockMovementY: true, // Y축 이동 잠금
          lockRotation: true, // 회전 잠금
          lockScalingX: true, // X축 크기 조정 잠금
          lockScalingY: true, // Y축 크기 조정 잠금
          hasControls: false, // 컨트롤 핸들 비활성화
          hasBorders: false, // 테두리 비활성화
        });
        // console.log(fabricImg);
        fabricCanvas.add(fabricImg);
        // fabricCanvas.setWidth(FABRIC_CANVAS_WIDTH);
        fabricCanvas.setHeight(imgElement.height * 1.6);
        fabricCanvas.renderAll();
      };
      imgElement.onerror = (err) => {
        console.error("Image load failed:", err);
      };
    } else {
      console.log("Fabric canvas or imageUrl missing:", { fabricCanvas, imgPath });
    }
  }, [imgPath]);

  return (
    <div
      ref={containerRef}
      className="B"
      style={{ backgroundColor: "blue", display: "flex", alignItems: "flex-start", overflow: "scroll" }}
    >
      <div>
        <canvas ref={canvasRef} />

        {/* <button type="button" onClick={handlePDFDownload}>
          PDF 다운로드
        </button> */}
      </div>
    </div>
  );
};

export default PdfSelectViewer;
