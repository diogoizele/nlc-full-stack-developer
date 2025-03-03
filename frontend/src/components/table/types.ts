import { PropsWithChildren } from "react";

export interface TableProps extends PropsWithChildren {
  width: string;
}

export interface TableRowProps extends PropsWithChildren {
  hover?: boolean;

  onClick?: () => void;
}

export interface TableCellProps extends PropsWithChildren {
  width: string;
  flex?: number;
  color?: string;
  align?: "left" | "center" | "right";
}
