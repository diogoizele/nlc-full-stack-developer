import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import { createProject } from "../../api/projects";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { PageContainer } from "../../components/page-container";
import { ProjectList } from "../../components/project-list";
import { TextArea } from "../../components/text-area";
import { useAppStore } from "../../stores/app.store";

type FormData = {
  name: string;
  description: string;
};

export const ProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<FormData>();

  const queryClient = useQueryClient();
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: ({ id }) => {
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

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    clearErrors();
    reset();
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 overflow-y-auto p-8">
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

        <ProjectList searchQuery={searchQuery} />
      </div>
      <Modal
        title="Create new project"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "* Name is required",
            }}
            render={({ field }) => (
              <Input
                label="Name"
                placeholder="Enter project name.."
                error={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: "* Description is required" }}
            render={({ field }) => (
              <TextArea
                label="Description"
                placeholder="Project Description"
                error={errors.description?.message}
                {...field}
              />
            )}
          />
          <div className="flex gap-4 justify-end">
            <Button
              fullWidth={false}
              type="button"
              variant="text"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth={false}>
              Add Project
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};
