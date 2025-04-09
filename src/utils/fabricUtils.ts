import * as fabric from "fabric";
import jsPDF from "jspdf"; // PDF 생성용

/**
 * @function initializeFabricCanvas
 * @description Fabric.js 캔버스를 초기화하고 설정하는 유틸리티 함수
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
 * @function loadImageToCanvas
 * @description Fabric.js 캔버스에서 이미지를 로드하고 고정된 상태로 추가하는 함수
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
  // 기존 이미지 URL 목록 확인
  const existingImages = canvas.getObjects().map((obj) => obj.get("data")); // 'data' 속성에 URL 저장 가정

  // 이미지가 이미 존재하는 경우 추가하지 않음
  if (existingImages.includes(imageUrl)) {
    console.log("Image already exists in canvas:", imageUrl);
    return;
  }

  const imgElement = new Image();
  imgElement.src = imageUrl;

  imgElement.onload = () => {
    const fabricImg = new fabric.FabricImage(imgElement);
    fabricImg.scaleToWidth(canvasWidth);
    const offset = 10; // 이미지 간 간격
    const topCount = canvas.getObjects().filter((obj) => obj.get("id") === "pdf").length;
    const newLeft = position.left ?? 10;
    const newTop = offset + topCount * fabricImg.getScaledHeight();
    // console.log("newTop", newLeft, newTop);
    fabricImg.set({
      id: "pdf",
      left: newLeft,
      top: newTop,
      selectable: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      hasControls: false,
      hasBorders: false,
      data: imageUrl, // 이미지 URL을 객체에 저장하여 중복 확인 가능
    });

    // 기존 객체 유지 확인
    console.log("Current objects before adding:", canvas.getObjects());

    // 새 이미지 추가
    canvas.add(fabricImg);

    // 추가 후 객체 확인
    console.log("Current objects after adding:", canvas.getObjects());

    // 캔버스 높이 조정
    const pdfLength = canvas.getObjects().filter((obj) => obj.get("id") === "pdf").length;
    if (pdfLength === 1) {
      canvas.setHeight(fabricImg.getScaledHeight() + offset);
    } else {
      const totalHeight = pdfLength * fabricImg.getScaledHeight() + offset;
      canvas.setHeight(totalHeight);
    }

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
    img.set({ id: "stamp", left: 0, top: 0 });

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
 * @function removeSelectedObject
 * @description 캔버스에서 선택된 객체를 제거합니다.
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
 * @function downloadPDF
 * @description
 * Fabric.js 캔버스를 PDF 파일로 변환하여 다운로드합니다.
 * 캔버스 높이가 A4 페이지 높이를 초과할 경우 다중 페이지로 나눠 생성합니다.
 *
 * @param {fabric.Canvas | null} canvas - PDF로 변환할 Fabric.js 캔버스 객체
 * @returns {void} - 반환값 없음. PDF 파일을 생성하고 다운로드합니다.
 * @throws {Error} - 캔버스가 null일 경우 콘솔에 오류 메시지를 출력합니다.
 */
export const downloadPDF = (canvas: fabric.Canvas | null) => {
  if (!canvas) {
    console.error("Canvas is not available");
    return;
  }

  // fabric.Canvas에서 HTMLCanvasElement 추출
  const htmlCanvas = canvas.getElement() as HTMLCanvasElement;
  const imgData = htmlCanvas.toDataURL("image/png"); // 캔버스를 PNG 이미지로 변환

  const pdf = new jsPDF("p", "mm", "a4"); // A4 크기의 PDF 생성
  const pdfWidth = pdf.internal.pageSize.getWidth(); // PDF 페이지 너비 (mm)
  const pdfHeight = pdf.internal.pageSize.getHeight(); // PDF 페이지 높이 (mm, 약 297mm)

  // fabric.Canvas의 논리적 너비와 높이
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  // 캔버스 비율을 PDF에 맞춤
  const aspectRatio = canvasHeight / canvasWidth;
  const width = pdfWidth; // PDF 너비 기준
  const totalHeight = width * aspectRatio; // 캔버스의 전체 높이 (mm 단위로 변환)

  // 단일 페이지로 충분한 경우
  if (totalHeight <= pdfHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, width, totalHeight);
  } else {
    // 다중 페이지 처리
    let heightLeft = totalHeight;
    let position = 0;
    const pageHeightInCanvas = (pdfHeight / totalHeight) * canvasHeight; // 한 페이지에 해당하는 캔버스 높이

    while (heightLeft > 0) {
      // 현재 페이지에 그릴 이미지 영역 설정
      // const clipHeight = Math.min(pdfHeight, heightLeft);
      pdf.addImage(imgData, "PNG", 0, position, width, totalHeight, undefined, undefined, {
        clip: {
          x: 0,
          y: -position * (canvasHeight / totalHeight), // 캔버스 내 위치 조정
          width: canvasWidth,
          height: pageHeightInCanvas,
        },
      } as any);

      heightLeft -= pdfHeight;
      position -= pdfHeight;

      // 남은 높이가 있으면 새 페이지 추가
      if (heightLeft > 0) {
        pdf.addPage();
      }
    }
  }

  pdf.save("canvas.pdf");
};
