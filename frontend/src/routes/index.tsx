import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { Redirect } from "../components/redirect";
import { HomeScreen } from "../screens/home";
import { LoginScreen } from "../screens/login";
import { ProjectDetailsScreen } from "../screens/project-details";
import { ProjectsScreen } from "../screens/projects";
import { ServiceOrdersScreen } from "../screens/service-orders";
import { useAuthStore } from "../stores/auth.store";
import { LocalStorageManager } from "../utils/local-storage-manager";

export const Router = () => {
  const updateToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const localStorageToken = LocalStorageManager.get("token");
    if (localStorageToken) {
      updateToken(localStorageToken);
    }
  }, []);

  if (token) {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route index element={<ProjectsScreen />} />
          <Route
            path="projects/:projectId"
            element={<ProjectDetailsScreen />}
          />
          <Route path="service-orders" element={<ServiceOrdersScreen />} />
        </Route>
        <Route path="*" element={<div>Not found...</div>} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route index element={<LoginScreen />} />
      <Route path="*" element={<Redirect />} />
    </Routes>
  );
};
