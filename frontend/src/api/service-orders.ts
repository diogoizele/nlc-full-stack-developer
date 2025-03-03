import { ServiceOrder } from "../types/ServiceOrder.types";
import { apiClient } from "./base/client";
import {
  GetAllServiceOrdersResponse,
  ServiceOrdersCountResponse,
  UpdateServiceOrderStatus,
} from "./interfaces/service-orders";

export const fetchAllServiceOrders = async (query?: string | null) => {
  const response = await apiClient.get<GetAllServiceOrdersResponse[]>(
    "/service-orders",
    {
      params: { query },
    }
  );

  return response.data;
};

export const fetchServiceOrdersCount = async () => {
  const response = await apiClient.get<ServiceOrdersCountResponse>(
    "/service-orders/count"
  );

  return response.data;
};

export const updateServiceOrderStatus = async ({
  id,
  status,
}: UpdateServiceOrderStatus) => {
  const { data } = await apiClient.patch<ServiceOrder>(
    `/service-orders/${id}/status`,
    { status }
  );

  return data;
};
