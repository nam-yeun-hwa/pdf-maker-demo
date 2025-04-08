import { useRef } from "react";
import { usePdfStore } from "@/store/pdfStore";
import StampUploader from "@/components/StampUploader";
import FileNameDisplay from "./common/FileNameDisplay";
import FileUpload from "@/components/common/FileUpload";
import Button from "./common/Button";
import { useCanvasStore } from "@/store/canvasStore";
import styled from "@emotion/styled";

/**
 * @component StampController
 * PDF 업로드, 스탬프 관리, 다운로드 기능을 제어하는 패널 컴포넌트입니다.
 * - PDF 파일 업로드 및 삭제
 * - 캔버스에 렌더링된 PDF와 스탬프를 PNG로 다운로드
 * - 스탬프 업로드 UI 제공
 */
const StampController = () => {
  const { file, setFile } = usePdfStore();
  const { fabricCanvasRef } = useCanvasStore();

  const pdfInputRef = useRef<HTMLInputElement>(null);

  /**
   * PDF 파일 선택 시 상태 업데이트
   * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력 이벤트
   */
  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) {
      setFile(pdfFile);
      e.target.value = ""; // 동일 파일 재선택 가능하도록 초기화
    }
  };

  // PDF 업로드 버튼 클릭 시 파일 입력 트리거
  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  // PDF 파일 제거 및 캔버스 초기화
  const handlePDFRemove = () => {
    setFile(null);
    if (fabricCanvasRef) {
      fabricCanvasRef.clear();
      fabricCanvasRef.renderAll();
    }
  };

  /**
   * 캔버스 내용을 PNG로 다운로드
   */
  const handleDownload = () => {
    if (!fabricCanvasRef) {
      console.warn("Canvas is not initialized");
      return;
    }

    const dataURL = fabricCanvasRef.toDataURL({
      format: "png",
      quality: 1.0, // 최고 품질
      multiplier: 1, // 기본 해상도
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "pdf-image.png"; // 다운로드 파일명
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Section>
        <FileUpload InputRef={pdfInputRef} onChange={handlePDFChange} onClick={handlePDFUpload}>
          PDF 업로드
        </FileUpload>
        {file && <FileNameDisplay onClick={handlePDFRemove}>{file.name}</FileNameDisplay>}
        <Button onClick={handlePDFRemove}>PDF 삭제</Button>
        <Button onClick={handleDownload}>PDF 다운로드</Button>
      </Section>
      <Section>
        <StampUploader />
      </Section>
    </Container>
  );
};

export default StampController;

/**
 * 컨테이너 스타일: 전체 패널 레이아웃
 */
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #e9e9e9; /* 회색 배경으로 구분 */
  flex: 0 0 284px; /* 고정 너비 284px */
  overflow: scroll; /* 내용이 길어질 경우 스크롤 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 12px; /* 내부 여백 */
  gap: 10px; /* 섹션 간 간격 */
`;

/**
 * 섹션 스타일: PDF와 스탬프 영역 구분
 */
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 요소 간 간격 */
`;
