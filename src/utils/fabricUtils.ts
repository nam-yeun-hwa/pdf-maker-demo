import * as fabric from "fabric";

/**
 * Fabric.js 캔버스를 초기화하고 설정하는 유틸리티 함수
 * @param {HTMLCanvasElement} canvasElement - 캔버스 DOM 요소
 * @param {number} width - 캔버스 너비
 * @param {number} height - 캔버스 높이
 * @param {string} [backgroundColor="#f0f0f0"] - 캔버스 배경색
 * @returns {fabric.Canvas} 초기화된 Fabric.js 캔버스 인스턴스
 */
export const initializeFabricCanvas = (
  canvasElement: HTMLCanvasElement,
  width: number,
  height: number,
  backgroundColor: string = "#f0f0f0"
): fabric.Canvas => {
  return new fabric.Canvas(canvasElement, {
    width,
    height,
    backgroundColor,
  });
};

/**
 * Fabric.js 캔버스에서 이미지를 로드하고 고정된 상태로 추가하는 함수
 * @param {string} imageUrl - 로드할 이미지의 Base64 URL
 * @param {fabric.Canvas} canvas - Fabric.js 캔버스 인스턴스
 * @param {number} canvasWidth - 캔버스 너비 (이미지 크기 조정 기준)
 * @param {{ left?: number, top?: number }} [position] - 이미지 위치 (기본값: { left: 10, top: 10 })
 */
export const loadImageToCanvas = (
  imageUrl: string,
  canvas: fabric.Canvas,
  canvasWidth: number,
  position: { left?: number; top?: number } = { left: 10, top: 10 }
) => {
  const imgElement = new Image();
  imgElement.src = imageUrl;

  imgElement.onload = () => {
    const fabricImg = new fabric.FabricImage(imgElement);
    fabricImg.scaleToWidth(canvasWidth);
    fabricImg.set({
      left: position.left,
      top: position.top,
      selectable: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      hasControls: false,
      hasBorders: false,
    });

    canvas.add(fabricImg);
    canvas.renderAll();
  };

  imgElement.onerror = (err) => {
    console.error("Failed to load image:", { error: err, imageUrl });
  };
};
