import styled from "styled-components";

import { alpha } from "../../utils/alpha";
import { TextAreaProps } from "./types";

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextAreaStyled = styled.textarea<TextAreaProps>`
  border: 1px solid ${({ theme }) => alpha(theme.colors.text, 0.2)};
  padding: 0.8rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 116px;

  resize: none;
  &::placeholder {
    color: ${({ theme }) => alpha(theme.colors.text, 0.3)};
  }

  &:focus {
    outline-color: ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => alpha(theme.colors.text, 0.1)};
    cursor: default;
  }

  &::selection {
    background-color: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
  }
`;
