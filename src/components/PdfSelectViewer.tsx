import { useFabricCanvas } from "@/hooks/useFabricCanvas";
import * as S from "@/styles/PdfSelectViewerStyles";

/**
 * @component PdfSelectViewer
 * 선택된 PDF 이미지를 캔버스에 표시하고, 스탬프와 함께 다운로드할 수 있도록 준비하는 뷰어 컴포넌트입니다.
 * PDF 이미지는 크기 조정 및 고정된 위치에 렌더링되며, 스크롤 가능한 컨테이너에 표시됩니다.
 */
const PdfSelectViewer = () => {
  const CANVAS_MARGIN = 20;
  const CANVAS_HEIGHT_RATIO = 1.4;

  const { containerRef, canvasRef } = useFabricCanvas(CANVAS_MARGIN, CANVAS_HEIGHT_RATIO);

  return (
    <S.Container ref={containerRef}>
      <S.ScrollView>
        <S.Canvas ref={canvasRef} />
      </S.ScrollView>
    </S.Container>
  );
};

export default PdfSelectViewer;
