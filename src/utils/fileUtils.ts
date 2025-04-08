/**
 * 파일 목록에서 허용된 형식의 파일을 필터링하고 Blob URL을 생성하는 유틸리티 함수
 * @param {FileList} files - 업로드된 파일 목록
 * @param {string} allowedType - 허용된 파일 MIME 타입 (예: "image/png")
 * @param {number} maxCount - 최대 허용 파일 개수
 * @param {string[]} currentItems - 현재 존재하는 항목 목록
 * @returns {string[]} 생성된 Blob URL 배열
 */
export const processUploadedFiles = (
  files: FileList,
  allowedType: string,
  maxCount: number,
  currentItems: string[]
): string[] => {
  const remainingSlots = maxCount - currentItems.length;
  if (!files || remainingSlots <= 0) return [];

  const newItems = Array.from(files)
    .filter((file) => file.type === allowedType)
    .map((file) => URL.createObjectURL(file))
    .slice(0, remainingSlots);

  return newItems;
};
