import { Project } from "../../types/Project.types";

export interface ProjectsResponse extends Project {
  serviceOrdersIds: number[];
}
