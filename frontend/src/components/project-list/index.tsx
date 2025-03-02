import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { memo, useEffect } from "react";

import { fetchAllProjects } from "../../api/projects";
import { useAppStore } from "../../stores/app.store";
import { ProjectCardItem } from "../project-card-item";
import { ProjectListProps } from "./types";

const ProjectListWithoutMemo = ({ searchQuery }: ProjectListProps) => {
  const debouncedFilter = useDebounce(searchQuery, 500);

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setProjectsQuantity = useAppStore((state) => state.setProjectsQuantity);

  const { data, isPending, error, isError, isFetched } = useQuery({
    queryKey: ["projects", debouncedFilter],
    queryFn: () => fetchAllProjects(debouncedFilter),
  });

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPending, isFetched, isError]);

  if (isError) {
    return <>Error: {error?.message}</>;
  }

  useEffect(() => {
    setProjectsQuantity(data?.length || 0);
  }, [data]);

  return (
    <div className="flex flex-wrap gap-8 mt-4">
      {data?.map((project) => (
        <ProjectCardItem
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
