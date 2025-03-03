import { PropsWithChildren } from "react";
import {
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
  TableStyled,
} from "./styles";
import { TableCellProps, TableProps, TableRowProps } from "./types";

const Table = ({ children, ...props }: TableProps) => {
  return <TableStyled {...props}>{children}</TableStyled>;
};

const TableHead = ({ children }: PropsWithChildren) => {
  return <TableHeadStyled>{children}</TableHeadStyled>;
};

const TableBody = ({ children }: PropsWithChildren) => {
  return <TableBodyStyled>{children}</TableBodyStyled>;
};

const TableRow = ({ children, ...props }: TableRowProps) => {
  return <TableRowStyled {...props}>{children}</TableRowStyled>;
};

const TableCell = ({ children, align = "left", ...props }: TableCellProps) => {
  return (
    <TableCellStyled {...props} align={align}>
      {children}
    </TableCellStyled>
  );
};

Table.TableHead = TableHead;
Table.TableBody = TableBody;
Table.TableRow = TableRow;
Table.TableCell = TableCell;

export { Table };
