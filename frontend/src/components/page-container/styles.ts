import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  height: 100%;
  box-shadow: ${({ theme }) => theme.shadows.default};

  border-radius: 1rem;
`;
