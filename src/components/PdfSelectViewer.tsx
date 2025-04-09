import { useFabricCanvas } from "@/hooks/useFabricCanvas";
import * as S from "@/styles/PdfSelectViewerStyles";
/**
 * @interface PdfSelectViewerProps
 * `PdfSelectViewer` 컴포넌트가 받을 수 있는 속성(props)을 정의합니다.
 * 캔버스의 여백과 높이 비율을 설정할 수 있습니다.
 *
 * @property {number} [canvasMargin=20] - 캔버스와 컨테이너 간의 여백 (픽셀 단위)
 *   - 선택적 속성으로, 기본값은 20입니다.
 *   - 캔버스 너비 계산 시 사용됩니다.
 * @property {number} [canvasHeightRatio=1.4] - 캔버스 높이 비율 (너비 대비)
 *   - 선택적 속성으로, 기본값은 1.4입니다.
 *   - 캔버스 높이를 너비에 비례하여 설정합니다.
 */
interface PdfSelectViewerProps {
  canvasMargin?: number;
  canvasHeightRatio?: number;
}
/**
 * 선택된 PDF 이미지를 캔버스에 표시하고, 스탬프와 함께 다운로드할 수 있도록 준비하는 뷰어 컴포넌트입니다.
 * PDF 이미지는 크기 조정 및 고정된 위치에 렌더링되며, 스크롤 가능한 컨테이너에 표시됩니다.
 */
const PdfSelectViewer: React.FC<PdfSelectViewerProps> = ({ canvasMargin = 20, canvasHeightRatio = 1.4 }) => {
  const { containerRef, canvasRef } = useFabricCanvas(canvasMargin, canvasHeightRatio);

  return (
    <S.Container ref={containerRef}>
      <S.ScrollView>
        <S.Canvas ref={canvasRef} />
      </S.ScrollView>
    </S.Container>
  );
};

export default PdfSelectViewer;
