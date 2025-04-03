import { usePdfStore } from "@/store/pdfStore";
import "@/assets/css/C.css";
import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PageViewport } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
// pdfjs worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc; // 로컬 경로 설정

// 썸네일 객체의 타입 정의
interface Thumbnail {
  pageNum: number;
  url: string;
}

const PdfThumbnailViewer: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null); // 클릭한 이미지 저장

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

          const viewport: PageViewport = page.getViewport({ scale: 0.5 });

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

  if (loading) return <div>썸네일 생성 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="C">
      <div className="thumbnail-container">
        <h2>PDF 페이지 썸네일</h2>
        {thumbnails.length === 0 ? (
          <p>썸네일이 없습니다.</p>
        ) : (
          <div className="thumbnail-grid">
            {thumbnails.map((thumbnail) => (
              <div key={thumbnail.pageNum} className="thumbnail-item" onClick={() => handleImageClick(thumbnail.url)}>
                <img src={thumbnail.url} alt={`Page ${thumbnail.pageNum}`} className="thumbnail-image" />
                <p>페이지 {thumbnail.pageNum}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfThumbnailViewer;

// 기존 백업 파일
// const PdfThumbnailViewer = () => {
//   const { file } = useStore();
//   const [fileImage, setFileImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (!file) return;

//     (async () => {
//       setFileImage((await getImageByFile(file)) ?? "");
//     })();
//   }, [file]);

//   return (
//     <div className="C">
//       <div className="top">
//         {fileImage && (
//           <div>
//             <div className="image">
//               <img src={fileImage} />
//             </div>
//             <div className="imageIndex">1</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PdfThumbnailViewer;
