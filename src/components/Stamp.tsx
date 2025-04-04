import { useStampStore } from "@/store/stampStore";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import styled from "@emotion/styled";

interface StampType {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

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

const Stamp: React.FC<StampType> = ({ index, stampUrl, removeStampHandler }) => {
  const { fabricCanvasRef } = useStampStore();
  // const [isActive, setIsActive] = useState(false); // 자체적으로 isActive 상태 관리
  // const stampRef = useRef<fabric.Image | null>(null);
  const [stamp, setStamps] = useState<fabric.Image[]>([]); // 도장 배열 관리
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 추적 (제한 없음, 표시용)

  const addStamp = () => {
    if (!fabricCanvasRef) return;

    const imgElement = new Image();
    imgElement.src = stampUrl;
    imgElement.onload = () => {
      const fabricImg = new fabric.FabricImage(imgElement);
      fabricImg.set({
        left: 0,
        top: 0,
      });

      fabricCanvasRef.add(fabricImg);
      setStamps((prev) => [...prev, fabricImg]); // 도장 배열에 추가
      setClickCount((prev) => prev + 1); // 클릭 횟수 증가 (제한 없음)
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
          handleRemove();
        }}
      >
        삭제
      </RemoveButton>
    </StampContainer>
  );
};

export default Stamp;

// <div
// key={index}
// style={{ position: "relative", margin: "10px", textAlign: "center" }}
// onClick={() => setIsActive(!isActive)}
// >
// <img src={stampUrl} alt={`Stamp ${index + 1}`} style={{ maxWidth: "80px", height: "auto" }} />
// <button
// onClick={(e) => {
// 	e.stopPropagation();
// 	removeStampHandler(index);
// }}
// 	style={{ position: "absolute", bottom: "5px", right: "10px" }}
// >
// 	삭제
// </button>
// </div>
