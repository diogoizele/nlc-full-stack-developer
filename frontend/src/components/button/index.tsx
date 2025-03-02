import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const Button = ({
  children,
  height = 48,
  fullWidth = true,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton fullWidth={fullWidth} height={height} {...props}>
      <div className="flex items-center justify-center gap-2">
        {children} {icon}
      </div>
    </StyledButton>
  );
};
