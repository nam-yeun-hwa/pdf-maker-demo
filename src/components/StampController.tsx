import { useRef } from "react";
import { usePdfStore } from "@/store/pdfStore";
import StampUploader from "@/components/StampUploader";
import FileNameDisplay from "./common/FileNameDisplay";
import FileUpload from "@/components/common/FileUpload";
import Button from "./common/Button";
import { useCanvasStore } from "@/store/canvasStore";
import styled from "@emotion/styled";

/**
 * @function StampController
 * @description PDF를 업로드하고 스탬프를 로드하는 등의 여러 기능들를 컨트롤 하는 패널입니다.
 */
const StampController = () => {
  const { file, setFile } = usePdfStore();
  const { fabricCanvasRef } = useCanvasStore();

  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    setFile(pdfFile!);
    e.target.value = "";
  };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
    fabricCanvasRef?.clear();
  };

  const handleDownload = () => {
    if (!fabricCanvasRef) return;

    const dataURL = fabricCanvasRef.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "pdf-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <>
        <FileUpload InputRef={pdfInputRef} onChange={handlePDFChange} onClick={handlePDFUpload}>
          PDF 업로드
        </FileUpload>
        <FileNameDisplay onClick={handlePDFRemove}>{file?.name}</FileNameDisplay>
        <Button onClick={handlePDFRemove}>PDF 삭제</Button>
        <Button onClick={handleDownload}>PDF 다운로드</Button>
      </>
      <>
        <StampUploader />
      </>
    </Container>
  );
};

export default StampController;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #e9e9e9;
  flex: 0 0 284px;
  overflow: scroll;
  border-radius: 8px;
  padding: 12px;
  gap: 10px;
`;
