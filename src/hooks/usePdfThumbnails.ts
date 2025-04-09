import { useState, useEffect } from "react";
import { usePdfStore } from "@/store/pdfStore";
import { useSelectedPdfStore } from "@/store/selectedPdfStore";
import { generatePdfThumbnails, Thumbnail } from "@/utils/pdfUtils";

/**
 * PDF 파일에서 썸네일을 생성하고 상태를 관리하는 커스텀 훅
 * @param {number} timeoutMs - PDF 로드 타임아웃 (밀리초)
 * @returns {{
 *   thumbnails: Thumbnail[],
 *   loading: boolean,
 *   error: string | null,
 *   handleImageClick: (thumbnailUrl: string) => void
 * }}
 */
export const usePdfThumbnails = (timeoutMs: number) => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { file } = usePdfStore();
  const { setImgPath } = useSelectedPdfStore();

  const generateThumbnails = async (pdfFile: File) => {
    setLoading(true);
    setError(null);

    try {
      const thumbnailList = await generatePdfThumbnails(pdfFile, timeoutMs);
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

  return { thumbnails, loading, error, handleImageClick };
};
