import React, { ReactNode, RefObject } from "react";
import Button, { ButtonProps } from "@/components/common/Button";

interface FileUploadProps extends ButtonProps {
  InputRef: RefObject<HTMLInputElement | null>;
  children: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ InputRef, onChange, children, ...buttonProps }) => {
  return (
    <div className="pdfUpload">
      <input ref={InputRef} type="file" onChange={onChange} style={{ display: "none" }} />
      <Button {...buttonProps}>{children}</Button>
    </div>
  );
};

export default FileUpload;
