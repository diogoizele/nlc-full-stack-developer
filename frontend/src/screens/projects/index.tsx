import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import { useDebounce } from "@uidotdev/usehooks";
import { createProject } from "../../api/projects";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { ModalProjectForm } from "../../components/modal-project-form";
import { PageContainer } from "../../components/page-container";
import { ProjectList } from "../../components/project-list";
import { useAppStore } from "../../stores/app.store";

export type ProjectFormData = {
  name: string;
  description: string;
};

export const ProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedFilter = useDebounce(searchQuery, 500);

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<ProjectFormData>();

  const queryClient = useQueryClient();
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const mutationCreateProject = useMutation({
    mutationFn: createProject,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.removeQueries({ queryKey: ["projects"], exact: false });
      queryClient.refetchQueries({ queryKey: ["projects"] });
      queryClient.refetchQueries({ queryKey: ["projects-count"] });

      setIsModalOpen(false);
      reset();
      setIsLoading(false);
      toast.success(`New projects with id #${id} created successfully`);
    },
    onError: () => {
      setIsModalOpen(false);
      toast.error(
        "An error occurred to create project. Please try again later"
      );
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    setIsLoading(true);
    mutationCreateProject.mutate(data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    clearErrors();
    reset();
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 overflow-y-auto p-8 flex-1">
        <h2 className="font-bold text-2xl">Projects</h2>
        <div className="flex items-center justify-between">
          <div className="w-1/2 max-w-prose">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onTextChange={setSearchQuery}
            />
          </div>

          <Button icon={<FaPlus />} fullWidth={false} onClick={handleOpenModal}>
            Add New
          </Button>
        </div>
        <ProjectList searchQuery={debouncedFilter} />
      </div>
      <ModalProjectForm
        isOpen={isModalOpen}
        title="Create new project"
        cancelButtonText="Cancel"
        submitButtonText="Create project"
        control={control}
        errors={errors}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
      />
    </PageContainer>
  );
};
