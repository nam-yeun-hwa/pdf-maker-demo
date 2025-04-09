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
