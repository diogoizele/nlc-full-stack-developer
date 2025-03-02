import styled from "styled-components";

export const Container = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.default};
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.secondary};

  max-width: 400px;
  height: 250px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem;

  transition: all 0.2s ease-out;

  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

export const Id = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.info};
  font-style: italic;
  font-weight: bold;
`;

export const AttachedItemsText = styled.p`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.info};
  font-weight: 500;
`;

export const Name = styled.strong`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;
