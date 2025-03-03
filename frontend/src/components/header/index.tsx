import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";

import { fetchProjectsCount } from "../../api/projects";
import { fetchServiceOrdersCount } from "../../api/service-orders";
import logoutSVG from "../../assets/images/logout.svg";
import nlcLogo from "../../assets/images/nlc-logo.png";
import { useAuthStore } from "../../stores/auth.store";
import { LocalStorageManager } from "../../utils/local-storage-manager";
import { QuantityBadge } from "../quantity-badge";
import { AppName, Container, MenuContainer, MenuItem } from "./styles";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const clearToken = useAuthStore((state) => state.clearToken);

  const { data: projectsCount } = useQuery({
    queryKey: ["projects-count"],
    queryFn: fetchProjectsCount,
  });

  const { data: serviceOrdersCount } = useQuery({
    queryKey: ["service-orders-count"],
    queryFn: fetchServiceOrdersCount,
  });
  const handleLogout = () => {
    clearToken();
    LocalStorageManager.remove("token");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <Container>
      <div className="flex items-center gap-6">
        <img
          src={nlcLogo}
          alt="Purple Arrow - NoLimit Creatives Logo"
          height={24}
          width={24}
        />
        <AppName>Service Order Management</AppName>
      </div>
      <MenuContainer>
        <MenuItem selected={pathname === "/"} to="/">
          Projects
          <QuantityBadge quantity={projectsCount?.count ?? 0} />
        </MenuItem>
        <MenuItem
          selected={pathname === "/service-orders"}
          to="/service-orders"
        >
          Service Orders
          <QuantityBadge quantity={serviceOrdersCount?.count ?? 0} />
        </MenuItem>
      </MenuContainer>
      <div className="flex flex-1 justify-end">
        <button type="button" onClick={handleLogout}>
          <img src={logoutSVG} />
        </button>
      </div>
    </Container>
  );
};
