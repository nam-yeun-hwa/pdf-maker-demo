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

/**
 * 캔버스에 스탬프 이미지와 삭제 버튼을 포함한 그룹을 추가합니다.
 * @param {fabric.Canvas} canvas - Fabric.js 캔버스 인스턴스
 * @param {string} stampUrl - 스탬프 이미지의 URL
 * @param {number} stampWidth - 스탬프 이미지 너비
 * @param {number} deleteButtonSize - 삭제 버튼 크기 (너비/높이)
 */
export const addStampToCanvas = (
  canvas: fabric.Canvas,
  stampUrl: string,
  stampWidth: number,
  deleteButtonSize: number
) => {
  const imgElement = new Image();
  imgElement.src = stampUrl;

  imgElement.onload = () => {
    const img = new fabric.FabricImage(imgElement);
    img.scaleToWidth(stampWidth);
    img.set({ left: 0, top: 0 });

    const deleteButton = new fabric.Rect({
      width: deleteButtonSize,
      height: deleteButtonSize,
      fill: "#ff4d4d",
      originX: "center",
      originY: "center",
      hoverCursor: "pointer",
      opacity: 0,
    });

    const deleteText = new fabric.Text("X", {
      fontSize: 16,
      fill: "white",
      originX: "center",
      originY: "center",
      evented: false,
      opacity: 0,
    });

    const imgWidth = img.getScaledWidth();
    const imgHeight = img.getScaledHeight();
    deleteButton.set({ left: imgWidth / 2 - 10, top: -imgHeight / 2 + 10 });
    deleteText.set({ left: imgWidth / 2 - 10, top: -imgHeight / 2 + 10 });

    deleteButton.on("mouseover", () => {
      deleteButton.set({ fill: "#cc0000" });
      canvas.renderAll();
    });
    deleteButton.on("mouseout", () => {
      deleteButton.set({ fill: "#ff4d4d" });
      canvas.renderAll();
    });

    const group = new fabric.Group([img, deleteButton, deleteText], {
      left: 0,
      top: 0,
      selectable: true,
      subTargetCheck: true,
    });

    group.on("mousedown", (e) => {
      if (e.subTargets?.includes(deleteButton)) {
        canvas.remove(group);
        canvas.renderAll();
      }
    });

    group.on("mouseover", () => {
      deleteButton.set({ opacity: 1 });
      deleteText.set({ opacity: 1 });
      canvas.renderAll();
    });
    group.on("mouseout", () => {
      deleteButton.set({ opacity: 0 });
      deleteText.set({ opacity: 0 });
      canvas.renderAll();
    });

    canvas.add(group);
    canvas.renderAll();
  };

  imgElement.onerror = (err) => {
    console.error("Failed to load stamp image:", { error: err, stampUrl });
  };
};

/**
 * 캔버스에서 선택된 객체를 제거합니다.
 * @param {fabric.Canvas} canvas - Fabric.js 캔버스 인스턴스
 */
export const removeSelectedObject = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();
  }
};

/**
 * 캔버스 내용을 PNG 파일로 다운로드합니다.
 * @param {fabric.Canvas} canvas - Fabric.js 캔버스 인스턴스
 * @param {string} [fileName="pdf-image.png"] - 다운로드 파일명
 */
export const downloadCanvasAsPng = (canvas: fabric.Canvas, fileName: string = "pdf-image.png") => {
  if (!canvas) {
    console.warn("Canvas is not initialized");
    return;
  }

  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1.0,
    multiplier: 1,
  });

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
