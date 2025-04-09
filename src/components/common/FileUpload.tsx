import React, { ReactNode, RefObject } from "react";
import Button, { ButtonProps } from "@/components/common/Button";

/**
 * @interface FileUploadProps
 * 파일 업로드 기능을 제공하는 컴포넌트의 속성(props)을 정의합니다.
 * ButtonProps를 확장하여 버튼 관련 속성을 포함합니다.
 *
 * @extends ButtonProps
 * @property {RefObject<HTMLInputElement | null>} InputRef - 파일 입력 요소에 대한 참조
 *   - input 요소를 제어하거나 값에 접근하기 위해 사용
 *   - 필수 속성
 * @property {ReactNode} children - 버튼 내부에 표시할 내용
 *   - 텍스트, 아이콘 등으로 버튼의 레이블을 지정
 *   - 필수 속성
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - 파일 선택 시 실행되는 이벤트 핸들러
 *   - 파일 입력값이 변경될 때 호출됨
 *   - 선택적 속성
 * * @property {string} accept - 파일에 허용하는 타입 지정
 *   - 선택적 속성
 */
interface FileUploadProps extends ButtonProps {
  InputRef: RefObject<HTMLInputElement | null>;
  children: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

/**
 * @component FileUpload
 * 숨겨진 파일 입력 요소와 버튼을 결합하여 파일 업로드 기능을 제공하는 컴포넌트입니다.
 * 버튼 클릭 시 파일 선택 창이 열리며, 선택된 파일은 onChange 핸들러로 처리됩니다.
 *
 * @param {Object} props - FileUploadProps 타입의 속성 객체
 * @param {RefObject<HTMLInputElement | null>} props.InputRef - 파일 입력 요소에 대한 참조
 *   - input 요소에 접근하거나 제어하기 위해 사용
 * @param {ReactNode} props.children - 버튼에 표시할 내용
 *   - 예: "파일 업로드" 텍스트나 아이콘
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - 파일 선택 시 호출되는 함수
 *   - 선택된 파일 정보를 처리 (예: 파일 이름 추출, 업로드 로직)
 * @param {ButtonProps} props.buttonProps - Button 컴포넌트로 전달되는 추가 속성
 *   - type, variant, size, disabled 등 ButtonProps에서 상속된 속성
 *   - 자세한 내용은 ButtonProps 참조
 * @param {accept}
 */
const FileUpload: React.FC<FileUploadProps> = ({ InputRef, onChange, children, accept, ...buttonProps }) => {
  return (
    <>
      <input ref={InputRef} type="file" onChange={onChange} accept={accept} style={{ display: "none" }} />
      <Button {...buttonProps}>{children}</Button>
    </>
  );
};

export default FileUpload;
