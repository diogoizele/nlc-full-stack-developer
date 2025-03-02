import type { CreateProjectRequest } from "../controllers/requests/create-project-request.types";
import type { GetAllProjectsRequest } from "../controllers/requests/get-all-projects-request.types";
import { HttpError } from "../errors/http-error";
import ProjectRepository from "../repositories/project.repository";

class ProjectService {
  async getAllProjects({ query }: GetAllProjectsRequest) {
    if (query) {
      const filteredResponse = (
        await ProjectRepository.findAllByNameOrDescription(query)
      ).map(this.getServiceOrdersIdByProject);

      return filteredResponse;
    }

    const projects = (await ProjectRepository.findAll()).map(
      this.getServiceOrdersIdByProject
    );

    return projects;
  }

  async getProjectById(id: number) {
    const project = await ProjectRepository.findById(id);

    if (!project) {
      throw HttpError.NOT_FOUND("Project not found");
    }

    return project;
  }

  async createProject(payload: CreateProjectRequest) {
    this.createProjectBodyValidator(payload);

    return await ProjectRepository.create(payload);
  }

  async updateProject(id: number, payload: CreateProjectRequest) {
    this.createProjectBodyValidator(payload);

    const existentProject = await ProjectRepository.findById(id);

    if (!existentProject) {
      throw HttpError.NOT_FOUND("Project not found");
    }

    return await ProjectRepository.update(id, payload);
  }

  async delete(id: number) {
    await ProjectRepository.delete(id);
  }

  async getProjectsCount() {
    const count = await ProjectRepository.count();
    return { count };
  }

  private createProjectBodyValidator(body: CreateProjectRequest) {
    const { name } = body;

    if (!name) {
      throw HttpError.BAD_REQUEST("Name is required");
    }
  }

  private getServiceOrdersIdByProject({
    serviceOrders,
    ...rest
  }: {
    serviceOrders: { id: number }[];
  }) {
    return {
      ...rest,
      serviceOrdersIds: serviceOrders.map(({ id }) => id),
    };
  }
}

export default new ProjectService();
