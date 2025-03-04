import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4rem 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.default};

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  align-items: center;

  width: 448px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem;
  }
`;

export const AppName = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  line-height: normal;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
`;
