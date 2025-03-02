import { Outlet } from "react-router";
import { Header } from "../../components/header";
import { Container } from "./styles";

export const HomeScreen = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};
