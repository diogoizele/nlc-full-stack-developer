import styled from "styled-components";
import { alpha } from "../../utils/alpha";

export const Container = styled.div<{ checked: boolean }>`
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : "transparent"};
  border: 2px solid
    ${({ theme, checked }) =>
      checked ? theme.colors.primary : alpha(theme.colors.info, 0.5)};

  width: 24px;
  height: 24px;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
