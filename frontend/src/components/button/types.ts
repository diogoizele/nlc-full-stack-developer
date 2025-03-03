import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text";
  mode?: "primary" | "danger" | "normal";

  fullWidth?: boolean;
  height?: number;
  icon?: React.ReactNode;
}
