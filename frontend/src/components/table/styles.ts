import styled from "styled-components";
import { alpha } from "../../utils/alpha";
import { TableCellProps, TableProps, TableRowProps } from "./types";

export const TableStyled = styled.table<TableProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: ${({ width }) => width};
  height: 100%;
`;

export const TableHeadStyled = styled.thead`
  display: flex;
  gap: 1rem;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.info};
`;

export const TableBodyStyled = styled.tbody`
  display: flex;
  flex-direction: column;
`;

export const TableRowStyled = styled.tr<TableRowProps>`
  display: flex;

  width: 100%;
  gap: 2rem;
  padding: 0.5rem;
  transition: all 0.2s ease-out;

  cursor: ${({ hover }) => (hover ? "pointer" : "default")};

  &:hover {
    background: ${({ hover, theme }) =>
      hover
        ? `linear-gradient(90deg, 
            transparent 0%, 
            ${alpha(theme.colors.secondary, 0.7)} 50%, 
            transparent 100%)`
        : "transparent"};
  }
`;

export const TableCellStyled = styled.td<TableCellProps>`
  display: flex;
  gap: 1rem;

  color: ${({ color, theme }) => color || theme.colors.info};

  flex: ${({ flex }) => flex};
  width: ${({ width }) => width};

  text-align: ${({ align }) => align};

  justify-content: ${({ align }) => {
    switch (align) {
      case "center":
        return "center";
      case "right":
        return "flex-end";
      default:
        return "flex-start";
    }
  }};
`;
