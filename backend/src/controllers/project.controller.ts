import type { FastifyReply, FastifyRequest } from "fastify";

import ProjectService from "../services/project.service";
import type { CreateProjectRequest } from "./requests/create-project-request.types";
import type { GetAllProjectsRequest } from "./requests/get-all-projects-request.types";

class ProjectController {
  async getAllProjects(
    request: FastifyRequest<{ Querystring: GetAllProjectsRequest }>,
    reply: FastifyReply
  ) {
    const { query } = request.query;

    const response = await ProjectService.getAllProjects({ query });

    return reply.code(200).send(response);
  }

  async getProjectById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const response = await ProjectService.getProjectById(Number(id));

    return reply.code(200).send(response);
  }

  async createProject(
    request: FastifyRequest<{ Body: CreateProjectRequest }>,
    reply: FastifyReply
  ) {
    const response = await ProjectService.createProject(request.body);

    return reply.code(201).send(response);
  }

  async updateProject(
    request: FastifyRequest<{
      Params: { id: string };
      Body: CreateProjectRequest;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const response = await ProjectService.updateProject(
      Number(id),
      request.body
    );

    return reply.code(200).send(response);
  }

  async deleteProject(
    request: FastifyRequest<{ Params: { id: string } }>,

    reply: FastifyReply
  ) {
    const { id } = request.params;

    await ProjectService.delete(Number(id));

    return reply.code(204).send();
  }
}

export default new ProjectController(); // Singleton pattern
