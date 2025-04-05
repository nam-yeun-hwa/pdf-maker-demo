import { useRef } from "react";
import { usePdfStore } from "@/store/pdfStore";

import "@/assets/css/A.css";
import StampUploader from "@/components/StampUploader";

import FileNameDisplay from "./common/FileNameDisplay";
import FileUpload from "@/components/common/FileUpload";
import Button from "./common/Button";

const StampController = () => {
  const { file, setFile } = usePdfStore();

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
  };

  return (
    <div className="A">
      <div className="top">
        <>
          <FileUpload InputRef={pdfInputRef} onChange={handlePDFChange} onClick={handlePDFUpload}>
            PDF 업로드
          </FileUpload>
          <FileNameDisplay onClick={handlePDFRemove}>{file?.name}</FileNameDisplay>
          <Button onClick={handlePDFRemove}>PDF 삭제</Button>
          <Button onClick={handlePDFRemove}>PDF 다운로드</Button>
        </>
        <>
          <StampUploader />
        </>
      </div>
    </div>
  );
};

export default StampController;
