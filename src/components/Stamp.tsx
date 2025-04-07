import { useEffect } from "react";
import * as fabric from "fabric";
import styled from "@emotion/styled";
import { useCanvasStore } from "@/store/canvasStore";

interface StampType {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

/**
 *@function Stamp
 *@description 스탬프 ITEM 컴포넌트입니다. 중복으로 도장을 찍을수 있고 찍힌 도장에 마우스 오버 마우스 아웃에 따라 도장을 삭제 할수 있는 버튼이 화면에 나타나거나 없어집니다.
 */
const Stamp: React.FC<StampType> = ({ index, stampUrl, removeStampHandler }) => {
  const { fabricCanvasRef } = useCanvasStore();

  const addStamp = () => {
    if (!fabricCanvasRef) return;

    const imgElement = new Image();
    imgElement.src = stampUrl;
    imgElement.onload = () => {
      const img = new fabric.FabricImage(imgElement);
      img.scaleToWidth(100);
      img.set({
        left: 0,
        top: 0,
      });

      const deleteButton = new fabric.Rect({
        width: 30,
        height: 30,
        fill: "#ff4d4d",
        originX: "center",
        originY: "center",
        hoverCursor: "pointer",
        scaleX: 1, // 스케일 보정 제거 (고정 크기)
        scaleY: 1, // 스케일 보정 제거 (고정 크기)
        opacity: 0, // Initially hidden
      });

      const deleteText = new fabric.Text("X", {
        fontSize: 16,
        fill: "white",
        originX: "center",
        originY: "center",
        evented: false, // 마우스 이벤트 비활성화
        scaleX: 1, // 스케일 보정 제거 (고정 크기)
        scaleY: 1, // 스케일 보정 제거 (고정 크기)
        opacity: 0, // Initially hidden
      });

      const imgWidth = img.getScaledWidth();
      deleteButton.set({
        left: imgWidth / 2 - 10,
        top: -img.getScaledHeight() / 2 + 10,
      });
      deleteText.set({
        left: imgWidth / 2 - 10,
        top: -img.getScaledHeight() / 2 + 10,
      });

      deleteButton.on("mouseover", () => {
        deleteButton.set({ fill: "#cc0000" });
        fabricCanvasRef.renderAll();
      });
      deleteButton.on("mouseout", () => {
        deleteButton.set({ fill: "#ff4d4d" });
        fabricCanvasRef.renderAll();
      });

      const group = new fabric.Group([img, deleteButton, deleteText], {
        left: 0,
        top: 0,
        selectable: true,
        subTargetCheck: true, // 하위 객체 클릭 감지 활성화
      });

      group.on("mousedown", (e) => {
        if (e.subTargets && e.subTargets.includes(deleteButton)) {
          fabricCanvasRef.remove(group);
          fabricCanvasRef.renderAll();
        }
      });

      // 그룹에 마우스 오버 시 deleteButton과 deleteText 표시
      group.on("mouseover", () => {
        deleteButton.set({ opacity: 1 });
        deleteText.set({ opacity: 1 });
        fabricCanvasRef.renderAll();
      });

      // 그룹에서 마우스 아웃 시 deleteButton과 deleteText 숨김
      group.on("mouseout", () => {
        deleteButton.set({ opacity: 0 });
        deleteText.set({ opacity: 0 });
        fabricCanvasRef.renderAll();
      });

      fabricCanvasRef.add(group);
      fabricCanvasRef.renderAll();
    };

    imgElement.onerror = (err) => {
      console.error("Image load failed:", err);
    };
  };

  const handleClick = () => {
    addStamp();
  };

  // 선택된 도장 삭제
  const handleDeleteSelected = () => {
    if (!fabricCanvasRef) return;

    const activeObject = fabricCanvasRef.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.remove(activeObject);
      fabricCanvasRef.discardActiveObject();
      fabricCanvasRef.renderAll();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        handleDeleteSelected();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <StampContainer>
      <StampImage src={stampUrl} alt={`Stamp ${index}`} onClick={handleClick} />
      <RemoveButton
        onClick={(e) => {
          e.stopPropagation();
          removeStampHandler(index);
        }}
      >
        삭제
      </RemoveButton>
    </StampContainer>
  );
};

export default Stamp;

const StampContainer = styled.div`
  position: relative;
  margin: 10px;
  text-align: center;
  border: "1px solid gray";
  padding: 5px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const StampImage = styled.img`
  max-width: 80px;
  height: auto;
`;
