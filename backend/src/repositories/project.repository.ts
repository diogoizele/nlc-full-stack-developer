import { db } from "../config/database";

import type { CreateProjectRequest } from "../controllers/requests/create-project-request.types";
import type { Project } from "../models/Project";
import type { BaseRepositoryInterface } from "../types/base-repository-interface.types";

class ProjectRepository implements BaseRepositoryInterface<Project> {
  database = db.project;

  async create(data: CreateProjectRequest) {
    return await this.database.create({ data });
  }

  async findById(id: number) {
    return await this.database.findUnique({
      where: { id },
      include: {
        serviceOrders: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.database.findMany({
      include: {
        serviceOrders: {
          select: {
            id: true, // https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#select-specific-fields-of-included-relations
          },
        },
      },
    });
  }

  async update(id: number, data: CreateProjectRequest) {
    return await this.database.update({ where: { id: id }, data });
  }

  async delete(id: number) {
    return await this.database.delete({ where: { id: id } });
  }
}

export default new ProjectRepository();
