import React, { MouseEvent } from "react";
import styled from "@emotion/styled";

/**
 * @interface ButtonProps
 * 버튼 컴포넌트의 속성(props)을 정의합니다.
 *
 * @property {"button" | "submit" | "reset"} [type="button"] - 버튼의 HTML 타입 속성
 *   - "button": 일반 버튼 (기본값)
 *   - "submit": 폼 제출 버튼
 *   - "reset": 폼 초기화 버튼
 * @property {"primary" | "secondary" | "danger" | "outline"} [variant="primary"] - 버튼의 시각적 스타일
 *   - "primary": 기본 스타일, 파란색 배경 (기본값)
 *   - "secondary": 보조 스타일, 회색 배경
 *   - "danger": 위험 경고 스타일, 빨간색 배경
 *   - "outline": 외곽선만 있는 스타일, 투명 배경에 파란 테두리
 * @property {"small" | "medium" | "large"} [size="medium"] - 버튼의 크기
 *   - "small": 작은 버튼 (패딩: 4px 8px, 글꼴: 14px)
 *   - "medium": 중간 버튼 (패딩: 8px 16px, 글꼴: 16px, 기본값)
 *   - "large": 큰 버튼 (패딩: 12px 24px, 글꼴: 18px)
 * @property {(e: MouseEvent<HTMLButtonElement>) => void} [onClick] - 클릭 이벤트 핸들러
 *   - 버튼 클릭 시 실행되는 함수, MouseEvent를 매개변수로 받음
 *   - 선택적 속성
 * @property {boolean} [disabled=false] - 버튼 비활성화 여부
 *   - true: 버튼 비활성화 (회색 배경, 클릭 불가)
 *   - false: 버튼 활성화 (기본값)
 * @property {React.ReactNode} children - 버튼 내부에 표시할 내용
 *   - 텍스트, 아이콘, 또는 다른 React 요소를 포함
 *   - 필수 속성
 * @property {string} [className] - 추가적인 CSS 스타일을 위한 클래스 이름
 *   - styled-components와 함께 사용자 정의 스타일 적용 가능
 *   - 선택적 속성
 * @property {[key: string]: any} [...rest] - 추가적인 HTML 버튼 속성
 *   - 예: id, aria-label, data-* 등 임의의 속성 허용
 *   - 인덱스 시그니처로 정의
 */
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // 추가적인 HTML 속성을 위한 인덱스 시그니처
}

/**
 * @component Button
 * 재사용 가능한 버튼 컴포넌트로, 다양한 스타일, 크기, 상태를 지원합니다.
 *
 * @param {Object} param0 - 버튼의 속성(props)을 정의하는 객체
 * @param {"button" | "submit" | "reset"} [param0.type="button"] - 버튼의 HTML 타입 속성
 *   - "button": 일반 버튼 (기본값)
 *   - "submit": 폼 제출 버튼
 *   - "reset": 폼 초기화 버튼
 * @param {"primary" | "secondary" | "danger" | "outline"} [param0.variant="primary"] - 버튼의 시각적 스타일
 *   - "primary": 기본 스타일, 파란색 배경 (기본값)
 *   - "secondary": 보조 스타일, 회색 배경
 *   - "danger": 위험 경고 스타일, 빨간색 배경
 *   - "outline": 외곽선만 있는 스타일, 투명 배경에 파란 테두리
 * @param {"small" | "medium" | "large"} [param0.size="medium"] - 버튼의 크기
 *   - "small": 작은 버튼 (패딩: 4px 8px, 글꼴: 14px)
 *   - "medium": 중간 버튼 (패딩: 8px 16px, 글꼴: 16px, 기본값)
 *   - "large": 큰 버튼 (패딩: 12px 24px, 글꼴: 18px)
 * @param {(e: MouseEvent<HTMLButtonElement>) => void} [param0.onClick] - 버튼 클릭 시 실행되는 이벤트 핸들러
 *   - 비활성화 상태가 아닌 경우에만 호출됨
 * @param {boolean} [param0.disabled=false] - 버튼 비활성화 여부
 *   - true: 버튼 비활성화 (회색 배경, 클릭 불가)
 *   - false: 버튼 활성화 (기본값)
 * @param {React.ReactNode} param0.children - 버튼 안에 표시할 내용
 *   - 텍스트, 아이콘, 다른 React 컴포넌트 등을 포함 가능
 * @param {string} [param0.className=""] - 추가적인 CSS 스타일을 위한 클래스 이름
 *   - styled-components와 함께 사용자 정의 스타일 적용 가능
 * @param {Object} [param0.rest] - 추가적인 HTML 버튼 속성
 *   - 예: id="myButton", aria-label="클릭하세요" 등
 *
 */
const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  children,
  className = "",
  ...rest
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  width: -webkit-fill-available;
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "4px 8px";
      case "large":
        return "12px 24px";
      default:
        return "8px 16px";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  }};
  border-radius: 4px;
  border: ${({ variant }) => (variant === "outline" ? "1px solid #007bff" : "none")};
  background-color: ${({ variant, disabled }) => {
    if (disabled) return "rgba(0, 0, 0, 0.65)";
    switch (variant) {
      case "primary":
        return "#007bff";
      case "secondary":
        return "#6c757d";
      case "danger":
        return "#dc3545";
      case "outline":
        return "transparent";
      default:
        return "#007bff";
    }
  }};
  color: ${({ variant }) => {
    if (variant === "outline") return "#007bff";
    return "white";
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};

  &:hover {
    ${({ disabled, variant }) =>
      !disabled &&
      `
      background-color: ${
        variant === "primary"
          ? "#0056b3"
          : variant === "secondary"
          ? "#545b62"
          : variant === "danger"
          ? "#b02a37"
          : variant === "outline"
          ? "#007bff"
          : "#0056b3"
      };
      ${variant === "outline" ? "color: white;" : ""}
    `}
  }
`;
