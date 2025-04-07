import { usePdfStore } from "@/store/pdfStore";
import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PageViewport } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import styled from "@emotion/styled";
// pdfjs worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc; // 로컬 경로 설정

// 썸네일 객체의 타입 정의
interface Thumbnail {
  pageNum: number;
  url: string;
}

/**
 * @function PdfThumbnailViewer
 * @description 업로드한 PDF파일의 모든 페이지를 화면에 로드하여 리스트로 보여줍니다.
 */
const PdfThumbnailViewer: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { file } = usePdfStore();
  const { setImgPath } = useSelectedPdfStore();

  useEffect(() => {
    const generateThumbnails = async () => {
      if (!file) {
        setError("PDF 파일이 제공되지 않았습니다.");
        return;
      } else {
        setError("");
      }

      setLoading(true);
      try {
        const pdfUrl = URL.createObjectURL(file);

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
        });

        // Promise에 타임아웃 추가
        const pdfPromise = Promise.race([
          loadingTask.promise,
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("PDF 로드 타임아웃")), 10000)),
        ]);

        const pdf = (await pdfPromise) as pdfjsLib.PDFDocumentProxy;

        const numPages: number = pdf.numPages;
        const thumbnailList: Thumbnail[] = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page: pdfjsLib.PDFPageProxy = await pdf.getPage(pageNum);

          const viewport: PageViewport = page.getViewport({ scale: 1 });

          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas context를 가져올 수 없습니다.");
          }

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;
          console.log(`Page ${pageNum} rendered`);

          const thumbnailUrl: string = canvas.toDataURL("image/png");
          thumbnailList.push({
            pageNum,
            url: thumbnailUrl,
          });
        }

        setThumbnails(thumbnailList);
        console.log("Thumbnails generated:", thumbnailList);
        URL.revokeObjectURL(pdfUrl);
      } catch (err) {
        setError("PDF 처리 중 오류가 발생했습니다: " + (err instanceof Error ? err.message : String(err)));
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };

    generateThumbnails();
  }, [file]);

  const handleImageClick = async (thumbnailUrl: string) => {
    if (thumbnailUrl) {
      setImgPath(thumbnailUrl);
    }
  };

  if (loading)
    return (
      <Container>
        <ErrorMsg>썸네일 생성 중...</ErrorMsg>
      </Container>
    );
  if (error)
    return (
      <Container>
        <ErrorMsg>{error}</ErrorMsg>
      </Container>
    );

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

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  background: #e9e9e9;
  overflow: hidden;
  border-radius: 8px;
  padding: 12px;
`;

const ThumbnailContainer = styled.div`
  height: 100%;
`;

const ThumbnailGrid = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ThumbnailImage = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const ErrorMsg = styled.h3<{ color?: string }>`
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  color: ${(props) => props.color || "#555"};
`;
