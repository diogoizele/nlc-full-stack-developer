import { Project } from "../types/Project.types";
import { apiClient } from "./base/client";
import {
  CreateProjectsPayload,
  GetAllProjectsResponse,
  GetProjectDetailsResponse,
  ProjectsCountResponse,
} from "./interfaces/projects";

export const fetchAllProjects = async (query?: string | null) => {
  const response = await apiClient.get<GetAllProjectsResponse[]>("/projects", {
    params: { query },
  });

  return response.data;
};

export const fetchProjectsById = async (id: string) => {
  const response = await apiClient.get<GetProjectDetailsResponse>(
    `/projects/${id}`
  );

  return response.data;
};

export const fetchProjectsCount = async () => {
  const response = await apiClient.get<ProjectsCountResponse>(
    "/projects/count"
  );

  return response.data;
};

export const createProject = async (payload: CreateProjectsPayload) => {
  const response = await apiClient.post<Project>("/projects", payload);

  return response.data;
};

export const updateProject = async (
  id: string,
  payload: CreateProjectsPayload
) => {
  const response = await apiClient.put<Project>(`/projects/${id}`, payload);

  return response.data;
};

export const deleteProject = async (id: string) => {
  await apiClient.delete(`/projects/${id}`);
};
