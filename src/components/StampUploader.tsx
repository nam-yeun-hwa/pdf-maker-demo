import React, { useState, ChangeEvent, useRef } from "react";
import styled from "@emotion/styled";
import Stamp from "@/components/Stamp";
import FileUpload from "./common/FileUpload";

const StampUploader: React.FC = () => {
  const [stampsView, setStampsView] = useState<string[]>([]);
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleStampUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newStamps = Array.from(files)
        .filter((file) => file.type === "image/png")
        .map((file) => URL.createObjectURL(file));

      const remainingSlots = 5 - stampsView.length;
      if (stampsView.length + newStamps.length > 5) {
        alert(`최대 5개의 도장 이미지만 업로드할 수 있습니다. ${remainingSlots}개 더 업로드 가능합니다.`);
        setStampsView([...stampsView, ...newStamps.slice(0, remainingSlots)]);
      } else {
        setStampsView([...stampsView, ...newStamps]);
      }
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
          <Subtitle color="red">도장 사진을 누르시면 도장이 찍힙니다.</Subtitle>
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
