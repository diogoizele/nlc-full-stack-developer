import { GetAllServiceOrdersResponse } from "../../api/interfaces/service-orders";
import { ServiceOrder } from "../../types/ServiceOrder.types";

export interface TableServiceOrdersProps {
  data?: ServiceOrder[] | GetAllServiceOrdersResponse[];
  showProjectInfo?: boolean;
}
