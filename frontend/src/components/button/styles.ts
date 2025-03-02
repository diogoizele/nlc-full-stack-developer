import styled from "styled-components";

import { alpha } from "../../utils/alpha";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  padding: 0 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case "outlined":
      case "text":
        return "transparent";
      case "filled":
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case "outlined":
      case "text":
        return theme.colors.primary;
      default:
      case "filled":
        return theme.colors.white;
    }
  }};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  height: ${({ height }) => height}px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: ${({ theme, variant }) => {
      switch (variant) {
        case "text":
          return "transparent";
        case "outlined":
          return alpha(theme.colors.primary, 0.1);
        case "filled":
        default:
          return alpha(theme.colors.primary, 0.9);
      }
    }};
    color: ${({ theme, variant }) => {
      switch (variant) {
        case "outlined":
        case "text":
          return alpha(theme.colors.primary, 0.8);
        default:
        case "filled":
          return theme.colors.white;
      }
    }};
  }

  &:disabled {
    background-color: ${({ theme, variant }) => {
      switch (variant) {
        case "text":
          return "transparent";
        case "outlined":
          return alpha(theme.colors.primary, 0.1);
        case "filled":
        default:
          return alpha(theme.colors.primary, 0.5);
      }
    }};
  }

  &:active {
    background-color: ${({ theme, variant }) => {
      switch (variant) {
        case "text":
          return "transparent";
        case "outlined":
          return alpha(theme.colors.primary, 0.2);
        case "filled":
        default:
          return alpha(theme.colors.primary, 0.8);
      }
    }};
  }
`;
