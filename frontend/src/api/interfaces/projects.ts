import { Project } from "../../types/Project.types";

export interface GetAllProjectsResponse extends Project {
  serviceOrdersIds: number[];
}

export interface ProjectsCountResponse {
  count: number;
}

export interface CreateProjectsPayload {
  name: string;
  description: string;
}
