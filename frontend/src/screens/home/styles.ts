import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  height: 100vh;

  max-width: 100%;
  width: 1550px;

  @media (max-width: 768px) {
    width: auto;
    max-width: auto;
  }
`;
