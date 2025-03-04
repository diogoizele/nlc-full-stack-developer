import { ServiceOrder } from "../types/ServiceOrder.types";
import { apiClient } from "./base/client";
import {
  CreateServiceOrderPayload,
  GetAllServiceOrdersResponse,
  ServiceOrdersCountResponse,
  UpdateServiceOrder,
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

export const fetchServiceOrderById = async (id: number) => {
  const response = await apiClient.get<GetAllServiceOrdersResponse>(
    `/service-orders/${id}`
  );

  return response.data;
};

export const fetchServiceOrdersCount = async () => {
  const response = await apiClient.get<ServiceOrdersCountResponse>(
    "/service-orders/count"
  );

  return response.data;
};

export const createServiceOrder = async (
  payload: CreateServiceOrderPayload
) => {
  const response = await apiClient.post<ServiceOrder>("/service-orders", {
    ...payload,
    projectId: Number(payload.projectId),
  });

  return response.data;
};

export const updateServiceOrder = async ({
  id,
  payload,
}: UpdateServiceOrder) => {
  const { data } = await apiClient.put<ServiceOrder>(
    `/service-orders/${id}`,
    payload
  );

  return data;
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

export const deleteServiceOrder = async (id: number) => {
  await apiClient.delete(`/service-orders/${id}`);
};
