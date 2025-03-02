import styled from "styled-components";
import { alpha } from "../../utils/alpha";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => alpha(theme.colors.black, 0.8)};

  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  padding: 2rem;
  width: 40rem;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.info};

  transition: all 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    transform: scale(1.1);
  }
`;
