import { processUploadedFiles } from "@/utils/fileUtils";
import { useState, ChangeEvent, useRef } from "react";

/**
 * @hook useFileUploader
 * @description
 * 파일 업로드와 관련된 상태 및 이벤트를 관리하는 커스텀 훅입니다.
 * 업로드된 파일의 Blob URL 목록을 관리하며, 파일 추가, 제거, 업로드 트리거 기능을 제공합니다.
 *
 * @param {string} allowedType - 허용된 파일의 MIME 타입 (예: "image/png")
 * @param {number} maxCount - 최대 업로드 가능한 파일 개수
 * @returns {{
 *   files: string[],
 *   handleUpload: (event: ChangeEvent<HTMLInputElement>) => void,
 *   removeFile: (index: number) => void,
 *   triggerUpload: () => void,
 *   inputRef: React.RefObject<HTMLInputElement>
 * }} 파일 목록과 업로드 관련 핸들러 및 참조 객체를 포함한 객체
 */
export const useFileUploader = (allowedType: string, maxCount: number) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * @function handleUpload
   * @description 파일 입력 이벤트를 처리하여 새로운 파일을 추가합니다.
   * @param {ChangeEvent<HTMLInputElement>} event - 파일 입력 요소의 변경 이벤트
   */
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = processUploadedFiles(event.target.files!, allowedType, maxCount, files);
    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
    event.target.value = "";
  };

  /**
   * @function removeFile
   * @description 지정된 인덱스의 파일을 목록에서 제거합니다.
   * @param {number} index - 제거할 파일의 인덱스
   */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    // URL.revokeObjectURL(files[index]); // 필요 시 Blob URL 해제 (메모리 관리)
  };

  /**
   * @function triggerUpload
   * @description 파일 입력 요소를 프로그래밍 방식으로 클릭하여 업로드를 트리거합니다.
   */
  const triggerUpload = () => inputRef.current?.click();

  return { files, handleUpload, removeFile, triggerUpload, inputRef };
};
