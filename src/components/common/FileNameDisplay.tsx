/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "@/styles/FileNameDisplayStyles";

/**
 * @interface FileNameDisplayProps
 * 파일 이름을 표시하는 컴포넌트의 속성(props)을 정의합니다.
 *
 * @property {React.ReactNode} [children] - 컴포넌트 내부에 표시할 내용
 *   - 텍스트, 아이콘, 또는 다른 React 요소를 포함할 수 있음
 *   - 선택적 속성으로, 생략 가능
 * @property {() => void} onClick - 클릭 시 실행되는 함수
 *   - 매개변수 없이 호출되며, 클릭 이벤트를 처리함
 */
interface FileNameDisplayProps {
  children?: React.ReactNode;
  noFileMessage?: string;
  onClick: () => void;
}

/**
 * 선택된 파일 이름을 표시하거나 파일이 없을 경우 메시지를 보여주는 컴포넌트입니다.
 * 파일 이름이 있을 경우 제거 버튼("X")을 제공합니다.
 *
 * @param {FileNameDisplayProps} props - 컴포넌트 속성
 * @param {React.ReactNode} [props.children] - 표시할 파일 이름 또는 내용
 *   - 생략 시 "No file selected" 메시지 출력
 * @param {() => void} props.onClick - 파일 제거 버튼 클릭 시 실행되는 함수
 *   - 파일을 제거하거나 상태를 업데이트하는 로직에 사용
 * @returns {JSX.Element} 파일 이름 또는 "No file selected" 메시지를 포함한 컨테이너
 */
const FileNameDisplay: React.FC<FileNameDisplayProps> = ({ children, noFileMessage = "No file selected", onClick }) => {
  if (!children) {
    return <S.NoFileStyles>{noFileMessage}</S.NoFileStyles>;
  }
  return (
    <S.Container>
      📄 파일명: <strong>{children}</strong>
      <S.RemoveButton type="button" className="pdfFileRemove" onClick={onClick}>
        X
      </S.RemoveButton>
    </S.Container>
  );
};

export default FileNameDisplay;
