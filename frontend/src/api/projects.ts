import { apiClient } from "./base/client";
import { ProjectsResponse } from "./interfaces/projects";

export const fetchAllProjects = async (query?: string | null) => {
  const { data } = await apiClient.get<ProjectsResponse[]>("/projects", {
    params: { query },
  });

  return data;
};
