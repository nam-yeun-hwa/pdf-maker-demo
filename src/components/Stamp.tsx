import { useEffect } from "react";
import * as fabric from "fabric";
import styled from "@emotion/styled";
import { useCanvasStore } from "@/store/canvasStore";

interface StampType {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

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

      img.on("mousedblclick", () => {
        fabricCanvasRef.remove(img); // 더블클릭 시 이미지 삭제
        fabricCanvasRef.renderAll(); // 캔버스 갱신
      });

      fabricCanvasRef.add(img);
      // setStamps((prev) => [...prev, group]);
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
