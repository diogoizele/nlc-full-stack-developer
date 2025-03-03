import { GetAllProjectsResponse } from "../../api/interfaces/projects";

export interface ProjectCartItemProps extends GetAllProjectsResponse {
  onClick: () => void;
}
