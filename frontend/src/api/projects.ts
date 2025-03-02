import { Project } from "../types/Project.types";
import { apiClient } from "./base/client";
import {
  CreateProjectsPayload,
  GetAllProjectsResponse,
  ProjectsCountResponse,
} from "./interfaces/projects";

export const fetchAllProjects = async (query?: string | null) => {
  const { data } = await apiClient.get<GetAllProjectsResponse[]>("/projects", {
    params: { query },
  });

  return data;
};

export const fetchProjectsCount = async () => {
  const { data } = await apiClient.get<ProjectsCountResponse>(
    "/projects/count"
  );

  return data;
};

export const createProject = async (payload: CreateProjectsPayload) => {
  const { data } = await apiClient.post<Project>("/projects", payload);

  return data;
};
