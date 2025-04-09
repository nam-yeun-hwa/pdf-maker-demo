/**
 * 업로드된 파일 목록을 처리하여 허용된 파일 유형과 최대 개수 제한에 따라 새로운 파일 배열을 반환합니다.
 * 기존 파일과 중복되지 않는 파일만 필터링하며, 남은 슬롯 수에 맞게 파일을 잘라냅니다.
 *
 * @param {FileList} fileList - 사용자가 업로드한 파일 목록
 * @param {string} allowedType - 허용된 파일 MIME 타입을 나타내는 정규 표현식 문자열 (예: 'image/*')
 * @param {number} maxCount - 허용된 최대 파일 개수
 * @param {File[]} currentFiles - 현재 존재하는 파일 배열
 * @returns {File[]} 필터링된 새로운 파일 배열
 */
export const processUploadedFiles = (
  fileList: FileList,
  allowedType: string,
  maxCount: number,
  currentFiles: File[]
): File[] => {
  const remainingSlots = maxCount - currentFiles.length;
  if (!fileList || remainingSlots <= 0) return [];

  const existingFileNames = new Set(currentFiles.map((file) => `${file.name}-${file.size}`));
  const newFiles = Array.from(fileList)
    .filter((file) => file.type.match(allowedType) && !existingFileNames.has(`${file.name}-${file.size}`))
    .slice(0, remainingSlots);

  return newFiles;
};
