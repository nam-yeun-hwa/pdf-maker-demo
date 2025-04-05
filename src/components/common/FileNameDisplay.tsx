/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface FileNameDisplayProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const FileNameDisplay: React.FC<FileNameDisplayProps> = ({ children, onClick }) => {
  const fileStyles = css({
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    maxWidth: "300px",
    "& strong": {
      color: "#2c3e50",
      fontWeight: 600,
    },
  });

  const noFileStyles = css({
    padding: "16px",
    color: "#7f8c8d",
    fontStyle: "italic",
  });

  if (!children) {
    return <div css={noFileStyles}>No file selected</div>;
  }

  return (
    <div css={fileStyles}>
      📄 파일명: <strong>{children}</strong>{" "}
      <button type="button" className="pdfFileRemove" onClick={onClick}>
        X
      </button>
    </div>
  );
};

export default FileNameDisplay;
