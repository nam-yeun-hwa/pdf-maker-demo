import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";

import "@/assets/css/B.css";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";

const SelectedPdfCanvas = () => {
  const { imgPath } = useSelectedPdfStore();

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
      // console.log("Attempting to load image from:", imgPath);
      fabricCanvas.clear();

      if (!imgPath.startsWith("data:image/")) {
        console.error("Invalid imageUrl format:", imgPath);
        return;
      }

      const FABRIC_CANVAS_WIDTH = containerRef.current?.offsetWidth - 20;

      const imgElement = new Image();
      imgElement.src = imgPath;
      imgElement.onload = () => {
        console.log("HTML Image loaded successfully");
        const fabricImg = new fabric.FabricImage(imgElement);
        console.log("Fabric Image created:", fabricImg);
        fabricImg.scaleToWidth(FABRIC_CANVAS_WIDTH);
        fabricImg.set({ left: 10, top: 10 });
        fabricCanvas.add(fabricImg);
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
    <div ref={containerRef} className="B" style={{ backgroundColor: "blue" }}>
      <div>
        <canvas ref={canvasRef} />

        {/* <button type="button" onClick={handlePDFDownload}>
          PDF 다운로드
        </button> */}
      </div>
    </div>
  );
};

export default SelectedPdfCanvas;
