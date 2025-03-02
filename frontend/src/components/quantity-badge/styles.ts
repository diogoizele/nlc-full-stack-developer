import styled from "styled-components";

export const Container = styled.span`
  background-color: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  height: 23px;
  width: 25px;
  font-size: 0.75rem;
  line-height: normal;

  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
