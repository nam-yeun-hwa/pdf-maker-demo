import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";

// import { getImageByFile } from "../utils/utils";
import "@/assets/css/B.css";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const SelectedPdfCanvas = () => {
  const { imgPath } = useSelectedPdfStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      console.log("Initializing Fabric Canvas");
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 400,
        backgroundColor: "#f0f0f0",
      });
    } else if (!canvasRef.current) {
      console.error("Canvas element is not available");
    }

    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas && imgPath) {
      // console.log("Attempting to load image from:", imgPath);
      fabricCanvas.clear();

      if (!imgPath.startsWith("data:image/")) {
        console.error("Invalid imageUrl format:", imgPath);
        return;
      }

      const imgElement = new Image();
      imgElement.src = imgPath;
      imgElement.onload = () => {
        console.log("HTML Image loaded successfully");
        const fabricImg = new fabric.FabricImage(imgElement);
        console.log("Fabric Image created:", fabricImg);
        fabricImg.scaleToWidth(300);
        fabricImg.set({ left: 50, top: 50 });
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
    <div className="B" style={{ backgroundColor: "blue" }}>
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
