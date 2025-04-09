import { useCanvasStore } from "@/store/canvasStore";
import { addStampToCanvas } from "@/utils/fabricUtils";
import { useCanvasControls } from "@/hooks/useCanvasControls";
import * as S from "@/styles/StampStyles";

/**
 * @interface StampProps
 * `Stamp` 컴포넌트가 받는 속성(props)을 정의합니다.
 * 스탬프의 고유 식별자, 이미지 URL, 제거 함수를 포함합니다.
 *
 * @property {number} index - 스탬프의 고유 인덱스
 *   - 스탬프 목록에서 해당 스탬프를 식별하며, 제거 시 사용됩니다.
 * @property {string} stampUrl - 스탬프 이미지의 URL
 *   - 캔버스에 추가되며, 미리보기 이미지로 표시됩니다.
 * @property {(index: number) => void} removeStampHandler - 스탬프 제거 함수
 *   - "삭제" 버튼 클릭 시 호출되어 스탬프 목록에서 해당 인덱스의 스탬프를 제거합니다.
 */
interface StampProps {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

/**
 * 스탬프 아이템 컴포넌트로, 캔버스에 스탬프를 추가하고 관리합니다.
 * - 클릭 시 캔버스에 스탬프 추가
 * - 마우스 오버/아웃으로 캔버스 내 스탬프의 삭제 버튼 표시/숨김
 * - Delete 키로 선택된 스탬프 제거
 * - "삭제" 버튼으로 스탬프 목록에서 제거
 *
 * @param {StampProps} props - 컴포넌트 속성
 */
const Stamp: React.FC<StampProps> = ({ index, stampUrl, removeStampHandler }) => {
  const { fabricCanvasRef } = useCanvasStore();

  const STAMP_WIDTH = 100;
  const DELETE_BUTTON_SIZE = 30;

  useCanvasControls(fabricCanvasRef);

  const handleClick = () => {
    if (fabricCanvasRef) {
      addStampToCanvas(fabricCanvasRef, stampUrl, STAMP_WIDTH, DELETE_BUTTON_SIZE);
    }
  };

  return (
    <S.StampContainer>
      <S.StampImage src={stampUrl} alt={`Stamp ${index}`} onClick={handleClick} />
      <S.RemoveButton
        onClick={(e) => {
          e.stopPropagation();
          removeStampHandler(index);
        }}
      >
        삭제
      </S.RemoveButton>
    </S.StampContainer>
  );
};

export default Stamp;
