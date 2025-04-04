import React, { useState, ChangeEvent } from "react";
import Stamp from "./layout/Stamp";

const StampUploader: React.FC = () => {
  const [stampsView, setStampsView] = useState<string[]>([]);

  // 파일 업로드 핸들러
  const handleStampUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newStamps = Array.from(files)
        .filter((file) => file.type === "image/png") // PNG만 허용
        .map((file) => URL.createObjectURL(file)); // URL로 변환

      // 최대 5개 제한
      const remainingSlots = 5 - stampsView.length;
      if (stampsView.length + newStamps.length > 5) {
        alert(`최대 5개의 도장 이미지만 업로드할 수 있습니다. ${remainingSlots}개 더 업로드 가능합니다.`);
        setStampsView([...stampsView, ...newStamps.slice(0, remainingSlots)]);
      } else {
        setStampsView([...stampsView, ...newStamps]);
      }
    }
  };

  /**
   * @function removeStamp
   * @param removeIdx
   * @description 해당 이미지 삭제하기
   */
  const removeViewStamp = (removeIdx: number) => {
    setStampsView(stampsView.filter((_, i) => i !== removeIdx));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>도장 이미지 업로드 (최대 5개)</h2>

      {/* 파일 입력 필드 */}
      <input
        type="file"
        accept="image/png" // PNG만 허용
        multiple // 여러 파일 선택 가능
        onChange={handleStampUpload}
        disabled={stampsView.length >= 5} // 5개 이상이면 비활성화
      />

      {/* 업로드된 도장 이미지 미리보기 */}
      {stampsView.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>업로드된 도장 이미지 ({stampsView.length}/5):</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {stampsView.map((stampUrl, index) => (
              <Stamp index={index} stampUrl={stampUrl} removeStampHandler={removeViewStamp} />
            ))}
          </div>
        </div>
      )}

      {/* 안내 메시지 */}
      {stampsView.length >= 5 && <p style={{ color: "red" }}>최대 5개에 도달했습니다. 더 이상 업로드할 수 없습니다.</p>}
    </div>
  );
};

export default StampUploader;
