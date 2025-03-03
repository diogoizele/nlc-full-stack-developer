import { Project } from "../../types/Project.types";
import { ServiceOrder } from "../../types/ServiceOrder.types";

export interface GetAllProjectsResponse extends Project {
  serviceOrdersIds: number[];
}

export interface GetProjectDetailsResponse extends Project {
  serviceOrders: ServiceOrder[];
}

export interface ProjectsCountResponse {
  count: number;
}

export interface CreateProjectsPayload {
  name: string;
  description: string;
}
