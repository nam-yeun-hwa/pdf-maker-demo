import { ButtonProps } from "@/components/common/Button";

export const getPadding = (size?: ButtonProps["size"]) => {
  switch (size) {
    case "small":
      return "4px 8px";
    case "large":
      return "12px 24px";
    default:
      return "8px 16px";
  }
};

export const getFontSize = (size?: ButtonProps["size"]) => {
  switch (size) {
    case "small":
      return "14px";
    case "large":
      return "18px";
    default:
      return "16px";
  }
};

export const getBackgroundColor = (variant?: ButtonProps["variant"], disabled?: boolean) => {
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
};
