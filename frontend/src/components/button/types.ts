import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined | text";

  fullWidth?: boolean;
  height?: number;
  icon?: React.ReactNode;
}
