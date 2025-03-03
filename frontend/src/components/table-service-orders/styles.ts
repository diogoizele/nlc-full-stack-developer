import styled from "styled-components";

export const InfoBadge = styled.span<{ name: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.info};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  line-height: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.secondary};

    &::after {
      content: attr(name);
      margin-top: 0.4rem;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.info};
      box-shadow: ${({ theme }) => theme.shadows.default};
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: normal;
      white-space: nowrap;
      font-weight: 500;
      z-index: 10;
    }
  }
`;
