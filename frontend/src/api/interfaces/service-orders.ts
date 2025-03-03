import { Project } from "../../types/Project.types";
import { ServiceOrder } from "../../types/ServiceOrder.types";

export interface GetAllServiceOrdersResponse extends ServiceOrder {
  project: Project;
}

export interface UpdateServiceOrderStatus {
  id: string;
  status: boolean;
}

export interface ServiceOrdersCountResponse {
  count: number;
}
