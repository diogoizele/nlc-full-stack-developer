import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";

import { useNavigate } from "react-router";
import { fetchAllProjects } from "../../api/projects";
import { useAppStore } from "../../stores/app.store";
import { EmptyList } from "../empty-list";
import { ProjectCardItem } from "../project-card-item";
import { ProjectListProps } from "./types";

const ProjectListWithoutMemo = ({ searchQuery }: ProjectListProps) => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setProjectsQuantity = useAppStore((state) => state.setProjectsQuantity);

  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["projects", searchQuery],
    queryFn: () => fetchAllProjects(searchQuery),
    gcTime: 0,
  });

  useEffect(() => {
    setProjectsQuantity(data?.length || 0);
  }, [data]);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  return (
    <div className="flex flex-wrap gap-8 mt-4 flex-1">
      {data?.length === 0 && <EmptyList title="No projects found" />}

      {data?.map((project) => (
        <ProjectCardItem
          onClick={() => navigate(`/projects/${project.id}`)}
          key={project.id}
          id={project.id}
          name={project.name}
          serviceOrdersIds={project.serviceOrdersIds}
          description={project.description}
        />
      ))}
    </div>
  );
};

export const ProjectList = memo(ProjectListWithoutMemo);
