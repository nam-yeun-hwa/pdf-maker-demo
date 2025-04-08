import Stamp from "@/components/Stamp";
import FileUpload from "@/components/common/FileUpload";
import * as S from "@/styles/StampUploaderStyles";
import { useFileUploader } from "@/hooks/useFileUploader";

const StampUploader: React.FC = () => {
  const MAX_STAMPS = 5;
  const ALLOWED_FILE_TYPE = "image/png";
  const {
    files: stampsView,
    handleUpload,
    removeFile,
    triggerUpload,
    inputRef,
  } = useFileUploader(ALLOWED_FILE_TYPE, MAX_STAMPS);

  return (
    <S.Container>
      <FileUpload
        size="small"
        disabled={stampsView.length >= MAX_STAMPS}
        InputRef={inputRef}
        onChange={handleUpload}
        onClick={triggerUpload}
      >
        도장 업로드
      </FileUpload>

      {stampsView.length > 0 && (
        <S.PreviewSection>
          <S.Subtitle>
            업로드된 도장 이미지 ({stampsView.length}/{MAX_STAMPS})
          </S.Subtitle>
          <S.Subtitle color="red">- 도장 사진을 누르시면 도장이 찍힙니다.</S.Subtitle>
          <S.StampGrid>
            {stampsView.map((stampUrl, index) => (
              <Stamp key={index} index={index} stampUrl={stampUrl} removeStampHandler={removeFile} />
            ))}
          </S.StampGrid>
        </S.PreviewSection>
      )}

      {stampsView.length >= MAX_STAMPS && (
        <S.WarningText>{`최대 ${MAX_STAMPS}개로 더 이상 업로드할 수 없습니다.`}</S.WarningText>
      )}
    </S.Container>
  );
};

export default StampUploader;
