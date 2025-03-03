import { db } from "../config/database";
import type { CreateServiceOrderEntity } from "../controllers/requests/create-service-order-request.types";

import type { ServiceOrder } from "../models/ServiceOrder";
import type { BaseRepositoryInterface } from "../types/base-repository-interface.types";

class ServiceOrderRepository implements BaseRepositoryInterface<ServiceOrder> {
  database = db.serviceOrder;

  async create(data: CreateServiceOrderEntity) {
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

  async findAllByNameOrDescriptionOrCategoryOrProject(query: string) {
    return await this.database.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            category: {
              contains: query,
            },
          },
          {
            project: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
      include: { project: true },
    });
  }

  async update(id: number, data: Omit<ServiceOrder, "id">) {
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
