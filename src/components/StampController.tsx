import { usePdfController } from "@/hooks/usePdfController";
import { useCanvasStore } from "@/store/canvasStore";
import { downloadPDF } from "@/utils/fabricUtils";
import StampUploader from "@/components/StampUploader";
import FileNameDisplay from "./common/FileNameDisplay";
import FileUpload from "@/components/common/FileUpload";
import Button from "./common/Button";
import * as S from "@/styles/StampControllerStyles";

/**
 * PDF 업로드, 스탬프 관리, 다운로드 기능을 제어하는 패널 컴포넌트입니다.
 * - PDF 파일 업로드 및 삭제
 * - 캔버스에 렌더링된 PDF와 스탬프를 PNG로 다운로드
 * - 스탬프 업로드 UI 제공
 */
const StampController = () => {
  const { file, pdfInputRef, handlePDFChange, handlePDFUpload, handlePDFRemove } = usePdfController();
  const { fabricCanvasRef } = useCanvasStore();

  const handleDownload = () => {
    if (fabricCanvasRef) {
      downloadPDF(fabricCanvasRef);
    }
  };

  return (
    <S.Container>
      <S.Section>
        <FileUpload
          InputRef={pdfInputRef}
          onChange={handlePDFChange}
          onClick={handlePDFUpload}
          accept=".pdf,application/pdf"
        >
          PDF 업로드
        </FileUpload>
        {/* 업로드된 pdf 파일 표시 */}
        <FileNameDisplay onClick={handlePDFRemove}>{file?.name}</FileNameDisplay>
        <Button onClick={handlePDFRemove}>PDF 삭제</Button>
        <Button onClick={handleDownload}>PDF 다운로드</Button>
      </S.Section>
      <S.Section>
        {/* 도장업로더 */}
        <StampUploader />
      </S.Section>
    </S.Container>
  );
};

export default StampController;
