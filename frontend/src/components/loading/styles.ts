import styled from "styled-components";
import { alpha } from "../../utils/alpha";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => alpha(theme.colors.background, 0.8)};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
`;

export const ActivityIndicator = styled.div`
  border: 0.5rem solid ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  border-top: 0.5rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
