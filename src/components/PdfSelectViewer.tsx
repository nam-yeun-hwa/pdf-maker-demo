import * as fabric from "fabric";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import { useCanvasStore } from "@/store/canvasStore";

/**
 * @component PdfSelectViewer
 * 선택된 PDF 이미지를 캔버스에 표시하고, 스탬프와 함께 다운로드할 수 있도록 준비하는 뷰어 컴포넌트입니다.
 * PDF 이미지는 크기 조정 및 고정된 위치에 렌더링되며, 스크롤 가능한 컨테이너에 표시됩니다.
 */
const PdfSelectViewer = () => {
  const { imgPath } = useSelectedPdfStore();
  const { setfabricCanvasRef, setCanvasRef } = useCanvasStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // 캔버스 크기 조정에 사용할 상수
  const CANVAS_MARGIN = 20; // 캔버스와 컨테이너 간의 여백
  const CANVAS_HEIGHT_RATIO = 1.4; // 캔버스 높이를 너비 대비 1.4배로 설정

  /**
   * 캔버스에 PDF 이미지를 로드하고 설정하는 함수
   * @param {string} imageUrl - 로드할 PDF 이미지의 Base64 URL
   * @param {fabric.Canvas} canvas - Fabric.js 캔버스 인스턴스
   * @param {number} canvasWidth - 캔버스 너비
   */
  const loadPdfImage = (imageUrl: string, canvas: fabric.Canvas, canvasWidth: number) => {
    const imgElement = new Image();
    imgElement.src = imageUrl;

    imgElement.onload = () => {
      const fabricImg = new fabric.FabricImage(imgElement);

      // PDF 이미지를 캔버스에 맞게 크기 조정 및 고정
      fabricImg.scaleToWidth(canvasWidth);
      fabricImg.set({
        left: 10, // 좌측 여백
        top: 10, // 상단 여백
        selectable: false, // 드래그/선택 불가
        lockMovementX: true, // X축 이동 잠금
        lockMovementY: true, // Y축 이동 잠금
        lockRotation: true, // 회전 잠금
        lockScalingX: true, // X축 크기 조정 잠금
        lockScalingY: true, // Y축 크기 조정 잠금
        hasControls: false, // 컨트롤 핸들 비활성화
        hasBorders: false, // 테두리 비활성화
      });

      canvas.add(fabricImg);
      canvas.setHeight(canvasWidth * CANVAS_HEIGHT_RATIO); // 높이 비율 적용
      canvas.renderAll();
    };

    imgElement.onerror = (err) => {
      console.error("Failed to load PDF image:", { error: err, imageUrl });
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvasElement = canvasRef.current;

    // 캔버스 초기화
    if (canvasElement && !fabricCanvasRef.current && container) {
      fabricCanvasRef.current = new fabric.Canvas(canvasElement, {
        width: container.offsetWidth,
        height: container.offsetHeight,
        backgroundColor: "#f0f0f0", // 캔버스 배경색
      });
      setCanvasRef(canvasElement);
      setfabricCanvasRef(fabricCanvasRef.current);
    } else if (!canvasElement) {
      console.error("Canvas element is not mounted or available");
      return;
    }

    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas || !imgPath || !container) {
      console.log("Missing required elements:", { fabricCanvas, imgPath, container });
      return;
    }

    // 이미지 로드 전 캔버스 초기화
    fabricCanvas.clear();

    // Base64 이미지 형식 검증
    if (!imgPath.startsWith("data:image/")) {
      console.error("Invalid image format. Expected Base64 data URL:", imgPath);
      return;
    }

    // 캔버스 너비 계산 (여백 포함)
    const FABRIC_CANVAS_WIDTH = container.offsetWidth - CANVAS_MARGIN;
    loadPdfImage(imgPath, fabricCanvas, FABRIC_CANVAS_WIDTH);

    // 의존성: imgPath 변경 시 캔버스 재렌더링
  }, [imgPath, setCanvasRef, setfabricCanvasRef]);

  return (
    <Container ref={containerRef} className="B">
      <ScrollView>
        <Canvas ref={canvasRef} />
      </ScrollView>
    </Container>
  );
};

export default PdfSelectViewer;

/**
 * 컨테이너 스타일: 캔버스를 감싸는 외부 박스
 */
const Container = styled.div`
  position: relative;
  display: flex;
  flex: 4; /* 부모 컨테이너에서 4배 비율 차지 */
  height: 100%;
  align-items: flex-start;
  background: #e9e9e9; /* 회색 배경으로 시각적 구분 */
  border-radius: 8px; /* 둥근 모서리 */
`;

/**
 * 스크롤 뷰: 캔버스가 길어질 경우 세로 스크롤 활성화
 */
const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll; /* 세로 스크롤 가능 */
`;

/**
 * 캔버스 스타일: PDF 이미지와 스탬프가 렌더링되는 영역
 */
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
