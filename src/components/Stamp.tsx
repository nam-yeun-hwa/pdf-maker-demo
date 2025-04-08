import { useEffect } from "react";
import * as fabric from "fabric";
import styled from "@emotion/styled";
import { useCanvasStore } from "@/store/canvasStore";

interface StampProps {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

/**
 * @component Stamp
 * 스탬프 아이템 컴포넌트로, 캔버스에 스탬프를 추가하고 관리합니다.
 * - 클릭 시 캔버스에 스탬프 추가
 * - 마우스 오버/아웃으로 캔버스 내 스탬프의 삭제 버튼 표시/숨김
 * - Delete 키로 선택된 스탬프 제거
 * - "삭제" 버튼으로 스탬프 목록에서 제거
 *
 * @param {Object} props - StampProps 타입의 속성 객체
 * @param {number} props.index - 스탬프의 고유 인덱스
 *   - 목록에서 스탬프를 식별하며, "삭제" 버튼 클릭 시 removeStampHandler에 전달
 * @param {string} props.stampUrl - 스탬프 이미지의 URL
 *   - 캔버스에 추가되고, 미리보기 이미지로 표시
 * @param {(index: number) => void} props.removeStampHandler - 스탬프 제거 함수
 *   - "삭제" 버튼 클릭 시 호출되어 스탬프 목록에서 해당 인덱스의 스탬프 제거
 *
 * @returns {JSX.Element} 스탬프 미리보기 이미지와 "삭제" 버튼을 포함한 컨테이너
 */
const Stamp: React.FC<StampProps> = ({ index, stampUrl, removeStampHandler }) => {
  const { fabricCanvasRef } = useCanvasStore();

  // 상수 정의
  const STAMP_WIDTH = 100; // 스탬프 이미지 기본 너비
  const DELETE_BUTTON_SIZE = 30; // 삭제 버튼 크기 (너비/높이)

  /**
   * 캔버스에 스탬프를 추가하고 삭제 버튼을 포함한 그룹을 생성
   */
  const addStamp = () => {
    if (!fabricCanvasRef) return;

    const imgElement = new Image();
    imgElement.src = stampUrl;

    imgElement.onload = () => {
      const img = new fabric.FabricImage(imgElement);
      img.scaleToWidth(STAMP_WIDTH);
      img.set({ left: 0, top: 0 });

      // 삭제 버튼 (빨간 사각형)
      const deleteButton = new fabric.Rect({
        width: DELETE_BUTTON_SIZE,
        height: DELETE_BUTTON_SIZE,
        fill: "#ff4d4d",
        originX: "center",
        originY: "center",
        hoverCursor: "pointer",
        scaleX: 1,
        scaleY: 1,
        opacity: 0, // 초기에는 숨김
      });

      // 삭제 버튼 텍스트 ("X")
      const deleteText = new fabric.Text("X", {
        fontSize: 16,
        fill: "white",
        originX: "center",
        originY: "center",
        evented: false, // 마우스 이벤트 비활성화
        scaleX: 1,
        scaleY: 1,
        opacity: 0, // 초기에는 숨김
      });

      // 삭제 버튼 위치 설정
      const imgWidth = img.getScaledWidth();
      const imgHeight = img.getScaledHeight();
      deleteButton.set({
        left: imgWidth / 2 - 10,
        top: -imgHeight / 2 + 10,
      });
      deleteText.set({
        left: imgWidth / 2 - 10,
        top: -imgHeight / 2 + 10,
      });

      // 삭제 버튼 호버 효과
      deleteButton.on("mouseover", () => {
        deleteButton.set({ fill: "#cc0000" }); // 어두운 빨간색
        fabricCanvasRef.renderAll();
      });
      deleteButton.on("mouseout", () => {
        deleteButton.set({ fill: "#ff4d4d" }); // 원래 색상
        fabricCanvasRef.renderAll();
      });

      // 스탬프와 삭제 버튼을 그룹화
      const group = new fabric.Group([img, deleteButton, deleteText], {
        left: 0,
        top: 0,
        selectable: true, // 드래그 가능
        subTargetCheck: true, // 하위 객체 클릭 감지
      });

      // 삭제 버튼 클릭 시 그룹 제거
      group.on("mousedown", (e) => {
        if (e.subTargets?.includes(deleteButton)) {
          fabricCanvasRef.remove(group);
          fabricCanvasRef.renderAll();
        }
      });

      // 마우스 오버/아웃 시 삭제 버튼 표시/숨김
      group.on("mouseover", () => {
        deleteButton.set({ opacity: 1 });
        deleteText.set({ opacity: 1 });
        fabricCanvasRef.renderAll();
      });
      group.on("mouseout", () => {
        deleteButton.set({ opacity: 0 });
        deleteText.set({ opacity: 0 });
        fabricCanvasRef.renderAll();
      });

      fabricCanvasRef.add(group);
      fabricCanvasRef.renderAll();
    };

    imgElement.onerror = (err) => {
      console.error("Failed to load stamp image:", { error: err, stampUrl });
    };
  };

  // 스탬프 추가 핸들러
  const handleClick = () => {
    addStamp();
  };

  // 선택된 스탬프 삭제 (Delete 키)
  const handleDeleteSelected = () => {
    if (!fabricCanvasRef) return;

    const activeObject = fabricCanvasRef.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.remove(activeObject);
      fabricCanvasRef.discardActiveObject();
      fabricCanvasRef.renderAll();
    }
  };

  // Delete 키 이벤트 리스너 설정
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
  }, [fabricCanvasRef]); // 의존성 명확화

  return (
    <StampContainer>
      <StampImage src={stampUrl} alt={`Stamp ${index}`} onClick={handleClick} />
      <RemoveButton
        onClick={(e) => {
          e.stopPropagation(); // 이미지 클릭 이벤트와 중복 방지
          removeStampHandler(index);
        }}
      >
        삭제
      </RemoveButton>
    </StampContainer>
  );
};

export default Stamp;

/**
 * 컨테이너 스타일: 스탬프 미리보기와 버튼을 감싸는 박스
 */
const StampContainer = styled.div`
  position: relative;
  margin: 10px;
  text-align: center;
  border: 1px solid gray; /* 문자열 따옴표 제거 */
  padding: 5px;
  cursor: pointer;
`;

/**
 * 삭제 버튼 스타일: 스탬프 목록에서 제거
 */
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
    background-color: #cc0000; /* 호버 시 어두운 빨간색 */
  }
`;

/**
 * 스탬프 이미지 스타일: 미리보기 이미지
 */
const StampImage = styled.img`
  max-width: 80px;
  height: auto; /* 비율 유지 */
`;
