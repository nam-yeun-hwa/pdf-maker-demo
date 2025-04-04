import { useRef } from "react";
import { usePdfStore } from "@/store/pdfStore";

import "@/assets/css/A.css";
import StampUploader from "@/components/StampUploader";

const StampController = () => {
  const { file, setFile } = usePdfStore();

  // const stampInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    setFile(pdfFile!);
    e.target.value = "";
  };

  // const handleStampUpload = () => {
  //   stampInputRef.current?.click();
  // };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
  };

  const handleStampDraw = async () => {};

  return (
    <div className="A">
      <div className="top">
        <div>
          {/* pdf 업로드 버튼 : s */}
          <div className="pdfUpload">
            <input ref={pdfInputRef} type="file" onChange={handlePDFChange} style={{ display: "none" }} />
            <button type="button" onClick={handlePDFUpload}>
              PDF 업로드
            </button>
          </div>
          {/* pdf 업로드 버튼 : e */}
          {/* pdfFile 정보 : s */}
          <div className="pdfFile">
            {!!file?.name && (
              <>
                📄 파일명: <strong>{file?.name}</strong>
                <button type="button" className="pdfFileRemove" onClick={handlePDFRemove}>
                  X
                </button>
              </>
            )}
          </div>
          {/* pdfFile 정보 : e */}
        </div>
        <StampUploader />
      </div>

      <div className="bottom">
        <button type="button" onClick={handleStampDraw}>
          도장 찍기
        </button>
      </div>
    </div>
  );
};

export default StampController;
