import { Project } from "../../types/Project.types";
import { ServiceOrder } from "../../types/ServiceOrder.types";

export interface GetAllServiceOrdersResponse extends ServiceOrder {
  project: Project;
}

export interface CreateServiceOrderPayload {
  name: string;
  category: string;
  description: string | null;
  isApproved: boolean;
  projectId: number;
}

export interface UpdateServiceOrder {
  id: number;
  payload: Omit<ServiceOrder, "id" | "createdDate" | "updatedDate">;
}

export interface UpdateServiceOrderStatus {
  id: number;
  status: boolean;
}

export interface ServiceOrdersCountResponse {
  count: number;
}
