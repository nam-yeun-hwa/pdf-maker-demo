import * as fabric from "fabric";
import { useEffect, useRef } from "react";

import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import { useCanvasStore } from "@/store/canvasStore";

import styled from "@emotion/styled";

/**
 * @function PdfSelectViewer
 * @description 개별 PDF의 이미지를 클릭했을때 화면에 보이도록 합니다. 화면에 보이는 PDF와 도장이 다운로드 됩니다.
 */
const PdfSelectViewer = () => {
  const { imgPath } = useSelectedPdfStore();
  const { setfabricCanvasRef, setCanvasRef } = useCanvasStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current && containerRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        backgroundColor: "#f0f0f0",
      });
      setCanvasRef(canvasRef.current);
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
        fabricCanvas.add(fabricImg);
        fabricCanvas.setHeight(FABRIC_CANVAS_WIDTH * 1.4);
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
    <Container ref={containerRef} className="B">
      <ScrollView>
        <Canvas ref={canvasRef} />
      </ScrollView>
    </Container>
  );
};

export default PdfSelectViewer;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 4;
  height: 100%;
  align-items: flex-start;

  background: #e9e9e9;
  border-radius: 8px;
`;

const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
