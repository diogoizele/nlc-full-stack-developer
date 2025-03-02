import { db } from "../config/database";

import type { CreateServiceOrderRequest } from "../controllers/requests/create-service-order-request.types";
import type { ServiceOrder } from "../models/ServiceOrder";
import type { BaseRepositoryInterface } from "../types/base-repository-interface.types";

class ServiceOrderRepository implements BaseRepositoryInterface<ServiceOrder> {
  database = db.serviceOrder;

  async create(data: CreateServiceOrderRequest) {
    return await this.database.create({ data });
  }

  async findById(id: number) {
    return await this.database.findUnique({
      where: { id: id },
      include: { project: true },
    });
  }

  async findAll() {
    return await this.database.findMany({
      include: { project: true },
    });
  }

  async update(id: number, data: CreateServiceOrderRequest) {
    return await this.database.update({ where: { id: id }, data });
  }

  async delete(id: number) {
    return await this.database.delete({ where: { id: id } });
  }

  async count() {
    return await this.database.count();
  }
}

export default new ServiceOrderRepository();
