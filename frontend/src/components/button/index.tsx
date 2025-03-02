import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const Button = ({
  children,
  height = 48,
  fullWidth = true,
  icon,
  variant = "filled",
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      fullWidth={fullWidth}
      height={height}
      {...props}
      variant={variant}
    >
      <div className="flex items-center justify-center gap-2">
        {children} {icon}
      </div>
    </StyledButton>
  );
};
