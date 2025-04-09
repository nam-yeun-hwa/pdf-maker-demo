import Stamp from "@/components/Stamp";
import FileUpload from "@/components/common/FileUpload";
import * as S from "@/styles/StampUploaderStyles";
import { useFileUploader } from "@/hooks/useFileUploader";
import { useEffect, useState } from "react";

/**
 * @interface StampUploaderProps
 * `StampUploader` 컴포넌트가 받을 수 있는 속성(props)을 정의합니다.
 * 스탬프 업로드의 최대 개수와 허용된 파일 형식을 설정할 수 있습니다.
 *
 * @property {number} [maxStamps] - 업로드 가능한 스탬프 이미지의 최대 개수
 *   - 선택적 속성으로, 지정하지 않으면 기본값(예: 5)이 사용될 수 있습니다.
 *   - 예: `maxStamps=3`으로 설정 시 최대 3개의 스탬프만 업로드 가능.
 * @property {string} [allowedFileType] - 허용된 파일의 MIME 타입
 *   - 선택적 속성으로, 지정하지 않으면 기본값(예: "image/png")이 사용될 수 있습니다.
 *   - 예: `"image/jpeg"`로 설정 시 JPEG 파일만 업로드 가능.
 */
interface StampUploaderProps {
  maxStamps?: number;
  allowedFileType?: string;
}

/**
 * 사용자가 PNG 형식의 스탬프 이미지를 업로드하고 관리할 수 있는 UI를 제공하는 컴포넌트입니다.
 * - 최대 5개의 스탬프를 업로드할 수 있으며, 중복 업로드는 불가능합니다.
 * - 업로드된 스탬프는 미리보기로 표시되며, 클릭 시 캔버스에 추가됩니다.
 * - "삭제" 버튼을 통해 업로드된 스탬프를 목록에서 제거할 수 있습니다.
 * @param {StampUploaderProps} props - 컴포넌트 속성
 * @param {number} [props.maxStamps=5] - 최대 업로드 가능한 스탬프 개수
 * @param {string} [props.allowedFileType="image/png"] - 허용된 파일 MIME 타입
 *
 * @returns {JSX.Element} 스탬프 업로드 버튼, 미리보기 섹션, 경고 메시지를 포함한 컨테이너
 */

const StampUploader: React.FC<StampUploaderProps> = ({ maxStamps = 5, allowedFileType = "image/png" }) => {
  const [stampUrls, setStampUrls] = useState<string[]>([]);

  const {
    files: stampsView,
    handleUpload,
    removeFile,
    triggerUpload,
    inputRef,
  } = useFileUploader(allowedFileType, maxStamps);

  useEffect(() => {
    const urls = stampsView.map((stamp) => URL.createObjectURL(stamp));
    setStampUrls(urls);

    // cleanup: 컴포넌트 언마운트 또는 stampsView 변경 시 이전 URL 해제
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [stampsView]);

  return (
    <S.Container>
      <FileUpload
        size="small"
        disabled={stampsView.length >= maxStamps}
        InputRef={inputRef}
        accept={".png,image/png"}
        onChange={handleUpload}
        onClick={triggerUpload}
      >
        도장 업로드
      </FileUpload>

      {stampsView.length > 0 && (
        <S.PreviewSection>
          <S.Subtitle>
            업로드된 도장 이미지 ({stampsView.length}/{maxStamps})
          </S.Subtitle>
          <S.Subtitle color="red">- 도장 사진을 누르시면 도장이 찍힙니다.</S.Subtitle>
          <S.StampGrid>
            {stampUrls.map((url, index) => (
              <Stamp key={index} index={index} stampUrl={url} removeStampHandler={removeFile} />
            ))}
          </S.StampGrid>
        </S.PreviewSection>
      )}

      {stampsView.length >= maxStamps && (
        <S.WarningText>{`최대 ${maxStamps}개로 더 이상 업로드할 수 없습니다.`}</S.WarningText>
      )}
    </S.Container>
  );
};

export default StampUploader;
