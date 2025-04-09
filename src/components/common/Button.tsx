import React, { MouseEvent } from "react";
import { useButtonHandler } from "@/hooks/useButtonHandler";
import { StyledButton } from "@/styles/ButtonStyles";

/**
 * @interface ButtonProps
 * 버튼 컴포넌트의 속성(props)을 정의합니다.
 * @property {"button" | "submit" | "reset"} [type="button"] - 버튼의 HTML 타입 속성
 * @property {"primary" | "secondary" | "danger" | "outline"} [variant="primary"] - 버튼의 시각적 스타일
 * @property {"small" | "medium" | "large"} [size="medium"] - 버튼의 크기
 * @property {(e: MouseEvent<HTMLButtonElement>) => void} [onClick] - 클릭 이벤트 핸들러
 * @property {boolean} [disabled=false] - 버튼 비활성화 여부
 * @property {React.ReactNode} children - 버튼 내부에 표시할 내용
 * @property {string} [className] - 추가적인 CSS 스타일을 위한 클래스 이름
 * @property {[key: string]: any} [...rest] - 추가적인 HTML 버튼 속성
 */
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * 재사용 가능한 버튼 컴포넌트로, 다양한 스타일, 크기, 상태를 지원합니다.
 *
 * @param {ButtonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 스타일링된 버튼 요소
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
  const handleClick = useButtonHandler(onClick, disabled);

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
