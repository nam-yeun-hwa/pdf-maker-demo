/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

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
  onClick: () => void;
}
/**
 * @component FileNameDisplay
 * 선택된 파일 이름을 표시하거나 파일이 없을 경우 메시지를 보여주는 컴포넌트입니다.
 * 파일 이름이 있을 경우 제거 버튼("X")을 제공합니다.
 *
 * @param {Object} props - FileNameDisplayProps 타입의 속성 객체
 * @param {React.ReactNode} [props.children] - 표시할 파일 이름 또는 내용
 *   - 생략 시 "No file selected" 메시지 출력
 * @param {() => void} props.onClick - 파일 제거 버튼 클릭 시 실행되는 함수
 *   - 파일을 제거하거나 상태를 업데이트하는 로직에 사용
 *
 */
const FileNameDisplay: React.FC<FileNameDisplayProps> = ({ children, onClick }) => {
  if (!children) {
    return <NoFileStyles>No file selected</NoFileStyles>;
  }

  return (
    <Container>
      📄 파일명: <strong>{children}</strong>{" "}
      <button type="button" className="pdfFileRemove" onClick={onClick}>
        X
      </button>
    </Container>
  );
};

export default FileNameDisplay;

const Container = styled.div`
  padding: "16px";
  border: "1px solid #e0e0e0";
  border-radius: "4px";
  max-width: "300px";
  strong : {
    color: "#2c3e50";
    font-weight: 600;
  }
`;

const NoFileStyles = styled.div`
  padding: "16px";
  color: "#7f8c8d";
  font-style: "italic";
`;
