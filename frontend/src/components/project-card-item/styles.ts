import styled from "styled-components";

export const Container = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.default};
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.secondary};

  width: 400px;
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

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-right: 2rem;
  }
`;

export const AttachedItemsText = styled.p`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.info};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.875rem;

    gap: 0.25rem;
  }
`;

export const Name = styled.strong`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
