import React from "react";
import { usePdfThumbnails } from "@/hooks/usePdfThumbnails";
import * as S from "@/styles/PdfThumbnailViewerStyles";

/**
 * @component PdfThumbnailViewer
 * 업로드된 PDF 파일의 모든 페이지를 썸네일로 생성하여 리스트 형태로 표시하는 컴포넌트입니다.
 *
 * @param {PdfThumbnailViewerProps} props - 컴포넌트 속성
 * @returns {JSX.Element} PDF 썸네일 리스트 또는 로딩/에러 메시지를 포함한 컨테이너
 */
interface PdfThumbnailViewerProps {
  timeoutMs?: number;
  thumbnailScale?: number;
}

/**
 * @component PdfThumbnailViewer
 * 업로드된 PDF 파일의 모든 페이지를 썸네일로 생성하여 리스트 형태로 표시하는 컴포넌트입니다.
 * 각 썸네일을 클릭하면 선택된 페이지의 이미지가 `selectedPdfStore`에 저장됩니다.
 *
 * @returns {JSX.Element} PDF 썸네일 리스트 또는 로딩/에러 메시지를 포함한 컨테이너
 */
const PdfThumbnailViewer: React.FC<PdfThumbnailViewerProps> = ({ timeoutMs = 10000, thumbnailScale = 1 }) => {
  const { thumbnails, loading, error, handleImageClick } = usePdfThumbnails(timeoutMs, thumbnailScale);

  if (loading) {
    return (
      <S.Container>
        <S.ErrorMsg>썸네일 생성 중...</S.ErrorMsg>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.ErrorMsg color="#e74c3c">{error}</S.ErrorMsg>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ThumbnailContainer>
        {thumbnails.length === 0 ? (
          <S.ErrorMsg>썸네일이 없습니다.</S.ErrorMsg>
        ) : (
          <S.ThumbnailGrid>
            {thumbnails.map((thumbnail) => (
              <S.ThumbnailImage key={thumbnail.pageNum} onClick={() => handleImageClick(thumbnail.url)}>
                <img src={thumbnail.url} alt={`Page ${thumbnail.pageNum}`} />
                <p>페이지 {thumbnail.pageNum}</p>
              </S.ThumbnailImage>
            ))}
          </S.ThumbnailGrid>
        )}
      </S.ThumbnailContainer>
    </S.Container>
  );
};

export default PdfThumbnailViewer;
