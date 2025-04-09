import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc; // PDF.js 워커 로컬 경로 설정

/**
 * PDF 페이지의 썸네일을 나타내는 객체의 인터페이스입니다.
 * @interface Thumbnail
 * @property {number} pageNum - 썸네일이 나타내는 PDF 페이지 번호 (1부터 시작)
 * @property {string} url - 썸네일 이미지의 데이터 URL (예: "data:image/png;base64,...")
 */
export interface Thumbnail {
  pageNum: number;
  url: string;
}

/**
 * @function generatePdfThumbnails
 * @description PDF 파일에서 썸네일을 생성하는 유틸리티 함수
 * @param {File} pdfFile - 업로드된 PDF 파일 객체
 * @param {number} scale - 썸네일 렌더링 스케일 (기본값: 1)
 * @param {number} timeoutMs - PDF 로드 타임아웃 시간 (기본값: 10000ms)
 * @returns {Promise<Thumbnail[]>} 생성된 썸네일 리스트
 * @throws {Error} PDF 처리 중 오류 발생 시
 */
export const generatePdfThumbnails = async (
  pdfFile: File,
  scale: number = 1,
  timeoutMs: number = 10000
): Promise<Thumbnail[]> => {
  const pdfUrl = URL.createObjectURL(pdfFile);
  const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });

  try {
    // 타임아웃과 함께 PDF 로드
    const pdfPromise = Promise.race([
      loadingTask.promise,
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("PDF 로드 타임아웃")), timeoutMs)),
    ]);

    const pdf = (await pdfPromise) as pdfjsLib.PDFDocumentProxy;
    const numPages = pdf.numPages;
    const thumbnailList: Thumbnail[] = [];

    // 각 페이지 썸네일 생성
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      // 목표 DPI 설정 (300 DPI)
      const DPI = 300;
      const BASE_DPI = 72; // PDF 기본 DPI
      const scale = DPI / BASE_DPI; // 약 4.1667 (300 DPI로 스케일링)

      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(`페이지 ${pageNum}: Canvas context를 가져올 수 없습니다.`);
      }

      // 고해상도 캔버스 설정
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 캔버스 품질 개선
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high"; // 브라우저 지원 시 고품질 렌더링

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // PNG로 고해상도 이미지 생성
      const thumbnailUrl = canvas.toDataURL("image/png");

      thumbnailList.push({ pageNum, url: thumbnailUrl });
    }

    return thumbnailList;
  } finally {
    URL.revokeObjectURL(pdfUrl); // 메모리 누수 방지
  }
};
