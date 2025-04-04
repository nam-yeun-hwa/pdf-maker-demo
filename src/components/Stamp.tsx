import { useStampStore } from "@/store/stampStore";
import { useEffect, useState } from "react";
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
  // const [stamp, setStamps] = useState<fabric.Group[]>([]); // 도장 배열 관리
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 추적 (제한 없음, 표시용)

  const addStamp = () => {
    if (!fabricCanvasRef) return;

    const imgElement = new Image();
    imgElement.src = stampUrl;
    // imgElement.width = 100;
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
      });

      const deleteText = new fabric.Text("X", {
        fontSize: 16,
        fill: "white",
        originX: "center",
        originY: "center",
        evented: false, // 마우스 이벤트 비활성화
        scaleX: 1, // 스케일 보정 제거 (고정 크기)
        scaleY: 1, // 스케일 보정 제거 (고정 크기)
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

      const group = new fabric.Group([img, deleteButton, deleteText], {
        left: 100 + (clickCount % 10) * 20,
        top: 100 + Math.floor(clickCount / 10) * 20,
        selectable: true,
        subTargetCheck: true, // 하위 객체 클릭 감지 활성화
      });

      group.on("mousedown", (e) => {
        if (e.subTargets && e.subTargets.includes(deleteButton)) {
          fabricCanvasRef.remove(group);
          // setStamps((prev) => prev.filter((s) => s !== group));
          fabricCanvasRef.renderAll();
        }
      });
      deleteButton.on("mouseover", () => {
        deleteButton.set({ fill: "#cc0000" });
        fabricCanvasRef.renderAll();
      });
      deleteButton.on("mouseout", () => {
        deleteButton.set({ fill: "#ff4d4d" });
        fabricCanvasRef.renderAll();
      });

      fabricCanvasRef.add(group);
      // setStamps((prev) => [...prev, group]);
      setClickCount((prev) => prev + 1);
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
