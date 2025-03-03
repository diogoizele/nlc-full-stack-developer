import styled from "styled-components";

import { alpha } from "../../utils/alpha";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectField = styled.div<{ error: string; focused: boolean }>`
  border: 1px solid ${({ theme }) => alpha(theme.colors.text, 0.2)};

  border-radius: 0.5rem;
  width: 100%;
  height: 48px;

  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  border-color: ${({ theme, error, focused }) => {
    if (focused) {
      return error ? theme.colors.danger : theme.colors.primary;
    }
    return alpha(theme.colors.text, 0.2);
  }};

  box-shadow: ${({ theme, error, focused }) => {
    if (!focused) {
      return "none";
    }

    if (focused) {
      return `0 0 0 1px ${error ? theme.colors.danger : theme.colors.primary}`;
    }
    return `0 0 0 1px ${alpha(theme.colors.text, 0.2)}`;
  }};
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  margin: 0 -1rem;
  top: calc(100% - 0.3rem);
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => alpha(theme.colors.text, 0.2)};
  border-radius: 0.5rem;
  z-index: 1;
  margin-top: 0.5rem;
  max-height: 200px;

  overflow-y: auto;
`;

export const Option = styled.option`
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  }
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => alpha(theme.colors.text, 0.3)};
`;
