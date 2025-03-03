import styled from "styled-components";

export const Name = styled.strong`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AttachedServiceOrdersText = styled.strong`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.info};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
