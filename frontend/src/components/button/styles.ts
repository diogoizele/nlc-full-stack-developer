import styled from "styled-components";

import { alpha } from "../../utils/alpha";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  padding: 0 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  height: ${({ height }) => height}px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: ${({ theme }) => alpha(theme.colors.primary, 0.8)};
  }

  &:disabled {
    background-color: ${({ theme }) => alpha(theme.colors.primary, 0.5)};
    cursor: not-allowed;
  }

  &:active {
    background-color: ${({ theme }) => alpha(theme.colors.primary, 0.9)};
  }
`;
