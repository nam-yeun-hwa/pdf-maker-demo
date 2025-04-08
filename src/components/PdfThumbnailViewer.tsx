import React, { useState, useEffect } from "react";
import { usePdfStore } from "@/store/pdfStore";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import styled from "@emotion/styled";
import { generatePdfThumbnails, Thumbnail } from "@/utils/pdfUtils";

const PdfThumbnailViewer: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { file } = usePdfStore();
  const { setImgPath } = useSelectedPdfStore();

  const TIMEOUT_MS = 10000; // PDF 로드 타임아웃 (10초)
  const THUMBNAIL_SCALE = 1; // 썸네일 렌더링 기본 스케일

  const generateThumbnails = async (pdfFile: File) => {
    setLoading(true);
    setError(null);

    try {
      const thumbnailList = await generatePdfThumbnails(pdfFile, THUMBNAIL_SCALE, TIMEOUT_MS);
      setThumbnails(thumbnailList);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`PDF 처리 중 오류 발생: ${errorMsg}`);
      console.error("Thumbnail generation failed:", { error: err, file });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!file) {
      setError("PDF 파일이 제공되지 않았습니다.");
      setThumbnails([]);
      return;
    }
    generateThumbnails(file);
  }, [file]);

  const handleImageClick = (thumbnailUrl: string) => {
    if (thumbnailUrl) {
      setImgPath(thumbnailUrl);
    }
  };

  if (loading) {
    return (
      <Container>
        <ErrorMsg>썸네일 생성 중...</ErrorMsg>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMsg color="#e74c3c">{error}</ErrorMsg>
      </Container>
    );
  }

  return (
    <Container>
      <ThumbnailContainer>
        {thumbnails.length === 0 ? (
          <ErrorMsg>썸네일이 없습니다.</ErrorMsg>
        ) : (
          <ThumbnailGrid>
            {thumbnails.map((thumbnail) => (
              <ThumbnailImage key={thumbnail.pageNum} onClick={() => handleImageClick(thumbnail.url)}>
                <img src={thumbnail.url} alt={`Page ${thumbnail.pageNum}`} className="thumbnail-image" />
                <p>페이지 {thumbnail.pageNum}</p>
              </ThumbnailImage>
            ))}
          </ThumbnailGrid>
        )}
      </ThumbnailContainer>
    </Container>
  );
};

export default PdfThumbnailViewer;

/**
 * 컨테이너 스타일: 썸네일 뷰어의 외부 박스
 */
const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1; /* 부모에서 1배 비율 차지 */
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 320px; /* 최소 너비 고정 */
  max-width: 320px; /* 최대 너비 제한 */
  background: #e9e9e9; /* 회색 배경으로 구분 */
  overflow: hidden;
  border-radius: 8px; /* 둥근 모서리 */
  padding: 12px; /* 내부 여백 */
`;

/**
 * 썸네일 컨테이너: 썸네일 리스트를 감싸는 영역
 */
const ThumbnailContainer = styled.div`
  height: 100%;
`;

/**
 * 썸네일 그리드: 스크롤 가능한 썸네일 리스트
 */
const ThumbnailGrid = styled.div`
  height: 100%;
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

/**
 * 썸네일 이미지: 개별 썸네일과 페이지 번호
 */
const ThumbnailImage = styled.div`
  img {
    width: 100%;
    height: auto; /* 비율 유지 */
  }
  p {
    margin: 4px 0; /* 페이지 번호 여백 */
    font-size: 12px;
    text-align: center;
  }
`;

/**
 * 에러 메시지 스타일: 로딩/에러 메시지 표시
 */
const ErrorMsg = styled.h3<{ color?: string }>`
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  color: ${(props) => props.color || "#555"}; /* 기본 회색, 커스텀 색상 가능 */
`;
