import { PropsWithChildren } from "react";
import { Container } from "./styles";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};
