import type { CreateServiceOrderRequest } from "../controllers/requests/create-service-order-request.types";
import type { GetAllServiceOrdersRequest } from "../controllers/requests/get-all-service-orders-request.types";
import { HttpError } from "../errors/http-error";
import ServiceOrderRepository from "../repositories/service-order.repository";

class ServiceOrderService {
  async getAllServiceOrders({ query }: GetAllServiceOrdersRequest) {
    if (query) {
      const filteredResponse = (
        await ServiceOrderRepository.findAllByNameOrDescriptionOrCategoryOrProject(
          query
        )
      ).map(this.extractProjectId);

      return filteredResponse;
    }

    const serviceOrders = (await ServiceOrderRepository.findAll()).map(
      this.extractProjectId
    );

    return serviceOrders;
  }

  async getServiceOrderById(id: number) {
    const serviceOrder = await ServiceOrderRepository.findById(id);

    if (!serviceOrder) {
      throw HttpError.NOT_FOUND("ServiceOrder not found");
    }

    return this.extractProjectId(serviceOrder);
  }

  async createServiceOrder(payload: CreateServiceOrderRequest) {
    this.createServiceOrderBodyValidator(payload);

    return await ServiceOrderRepository.create(payload);
  }

  async updateServiceOrder(id: number, payload: CreateServiceOrderRequest) {
    this.createServiceOrderBodyValidator(payload);

    const existentServiceOrder = await ServiceOrderRepository.findById(id);

    if (!existentServiceOrder) {
      throw HttpError.NOT_FOUND("Service Order not found");
    }

    return await ServiceOrderRepository.update(id, payload);
  }

  async updateServiceOrderStatus(id: number, isApproved: boolean) {
    const existentServiceOrder = await ServiceOrderRepository.findById(id);

    if (!existentServiceOrder) {
      throw HttpError.NOT_FOUND("Service Order not found");
    }

    const { id: _, project, ...rest } = existentServiceOrder;

    return await ServiceOrderRepository.update(id, {
      ...rest,
      isApproved,
      updatedDate: new Date(),
    });
  }

  async delete(id: number) {
    await ServiceOrderRepository.delete(id);
  }

  async getServiceOrdersCount() {
    const count = await ServiceOrderRepository.count();

    return { count };
  }

  private createServiceOrderBodyValidator(body: CreateServiceOrderRequest) {
    const { name, category, createdDate, isApproved, projectId, updatedDate } =
      body;

    if (!name) {
      throw HttpError.BAD_REQUEST("Name is required");
    }

    if (!category) {
      throw HttpError.BAD_REQUEST("Category is required");
    }

    if (!createdDate) {
      throw HttpError.BAD_REQUEST("Created Date is required");
    }

    if (!projectId) {
      throw HttpError.BAD_REQUEST("Project Id is required");
    }

    if (!updatedDate) {
      throw HttpError.BAD_REQUEST("Updated Date is required");
    }
  }

  private extractProjectId({ projectId, ...rest }: { projectId: number }) {
    return rest;
  }
}

export default new ServiceOrderService();
