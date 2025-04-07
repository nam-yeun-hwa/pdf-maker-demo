import React, { useState, ChangeEvent, useRef } from "react";
import styled from "@emotion/styled";
import Stamp from "@/components/Stamp";
import FileUpload from "@/components/common/FileUpload";

/**
 * @function StampUploader
 * @description 사용자가 이미지 파일(스탬프)을 업로드할 수 있는 간단한 UI를 제공합니다.
 * 업로드된 파일(스탬프)를 화면에 표시하며, 파일 선택 시 PDFViwer)에 스탬프가 표시됩니다. 스탬프는 중복이 되지 않으며 최대 5개까지 업로드가 가능합니다.
 */
const StampUploader: React.FC = () => {
  const [stampsView, setStampsView] = useState<string[]>([]);
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleStampUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newStamps = Array.from(files)
        .filter((file) => file.type === "image/png")
        .map((file) => URL.createObjectURL(file));

      setStampsView([...stampsView, ...newStamps]);
    }
  };

  const onClickHandler = () => {
    stampInputRef.current?.click();
  };

  const removeViewStamp = (removeIdx: number) => {
    setStampsView(stampsView.filter((_, i) => i !== removeIdx));
  };

  return (
    <Container>
      <FileUpload
        size="small"
        disabled={stampsView.length >= 5}
        InputRef={stampInputRef}
        onChange={handleStampUpload}
        onClick={onClickHandler}
      >
        도장업로드
      </FileUpload>

      {stampsView.length > 0 && (
        <PreviewSection>
          <Subtitle>업로드된 도장 이미지 ({stampsView.length}/5)</Subtitle>
          <Subtitle color="red"> - 도장 사진을 누르시면 도장이 찍힙니다.</Subtitle>
          <StampGrid>
            {stampsView.map((stampUrl, index) => (
              <Stamp key={index} index={index} stampUrl={stampUrl} removeStampHandler={removeViewStamp} />
            ))}
          </StampGrid>
        </PreviewSection>
      )}

      {stampsView.length >= 5 && <WarningText>{`최대 5개로 더 이상 업로드할 수 없습니다.`}</WarningText>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PreviewSection = styled.div`
  margin-top: 20px;
`;

const Subtitle = styled.h3<{ color?: string }>`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
  color: ${(props) => props.color || "#555"};
`;

const StampGrid = styled.div`
  max-width: 220px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const WarningText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: blue;
  letter-spacing: -0.4px;
`;

export default StampUploader;
