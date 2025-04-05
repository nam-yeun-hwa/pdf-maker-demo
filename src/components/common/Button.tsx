import React, { MouseEvent } from "react";
import styled from "@emotion/styled";

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
