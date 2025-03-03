import { NavLink } from "react-router";
import styled from "styled-components";

export const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  display: flex;
  gap: 3rem;
  align-items: center;
  height: 5rem;
  padding: 0 2rem;
  border-radius: 1rem;

  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MenuContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  height: 2.3rem;
  min-width: 340px;

  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.white};
`;

export const MenuItem = styled(NavLink)<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "transparent"};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.primary};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.3rem;
  font-weight: ${({ selected }) => (selected ? "bold" : 600)};

  transition: all 0.2s ease-out;

  gap: 0.5rem;
`;
