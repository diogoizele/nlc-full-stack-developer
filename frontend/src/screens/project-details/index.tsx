import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { LuArrowLeft } from "react-icons/lu";
import { RiEditFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";

import { queryClient } from "../../api/base/client";
import {
  deleteProject,
  fetchProjectsById,
  updateProject,
} from "../../api/projects";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { ModalProjectForm } from "../../components/modal-project-form";
import { PageContainer } from "../../components/page-container";
import { TableServiceOrders } from "../../components/table-service-orders";
import { useAppStore } from "../../stores/app.store";
import { ProjectFormData } from "../projects";
import { AttachedServiceOrdersText, Name } from "./styles";

export const ProjectDetailsScreen = () => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

  const { projectId } = useParams() as { projectId: string };
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProjectFormData>();

  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ["project-details"],
    queryFn: () => fetchProjectsById(projectId),
  });

  const mutationDeleteProject = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      queryClient.refetchQueries({ queryKey: ["projects-count"] });

      setIsEditingModalOpen(false);
      reset();
      setIsLoading(false);
      toast.success(`Project with id #${projectId} deleted successfully`);
      navigate(-1);
    },
    onError: () => {
      setIsEditingModalOpen(false);
      toast.error(
        "An error occurred to delete project. Please try again later"
      );
      setIsLoading(false);
    },
  });

  const mutationUpdateProject = useMutation({
    mutationFn: (data: ProjectFormData) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["project-details"] });

      setIsEditingModalOpen(false);
      reset();
      setIsLoading(false);
      toast.success(`Project with id #${projectId} updated successfully`);
    },
    onError: () => {
      setIsEditingModalOpen(false);
      toast.error(
        "An error occurred to update project. Please try again later"
      );
      setIsLoading(false);
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    setIsLoading(true);
    mutationUpdateProject.mutate(data);
  };

  const handleAskForDeleteProject = () => {
    setIsDeletingModalOpen(true);
  };

  const handleDeleteProject = () => {
    setIsLoading(true);
    mutationDeleteProject.mutate(projectId);
  };

  if (isFetching) {
    setIsLoading(true);
    return null;
  }

  if (isFetched || isError) {
    setIsLoading(false);
  }

  return (
    <PageContainer>
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto overflow-x-hidden p-8">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)}>
            <LuArrowLeft size={32} />
          </button>
          <h2 className="font-bold text-2xl italic">Project #{projectId}</h2>
          <Name>{data?.name}</Name>
        </div>
        <div className="flex items-center justify-between font-medium">
          <p>{data?.description}</p>
          <div className="flex gap-4">
            <Button
              mode="danger"
              variant="outlined"
              icon={<FaTrash />}
              onClick={handleAskForDeleteProject}
            >
              Delete
            </Button>
            <Button
              icon={<RiEditFill size={24} />}
              onClick={() => setIsEditingModalOpen(true)}
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <AttachedServiceOrdersText>
            Attached Service Orders
          </AttachedServiceOrdersText>
          <div className="pt-6 flex-1 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-secondary scrollbar-w-1 scrollbar-thumb-rounded scrollbar-track-rounded">
            <TableServiceOrders data={data?.serviceOrders} />
          </div>
        </div>
      </div>
      <ModalProjectForm
        isOpen={isEditingModalOpen}
        title="Edit project"
        cancelButtonText="Cancel"
        submitButtonText="Confirm update"
        control={control}
        errors={errors}
        defaultValues={{
          description: data?.description!!,
          name: data?.name!!,
        }}
        onClose={() => setIsEditingModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
      />
      <Modal
        isOpen={isDeletingModalOpen}
        onClose={() => setIsDeletingModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl text-danger">
            Delete Project Confirmation
          </h2>
          <p className="font-mediu ">
            Are you sure you want to delete this{" "}
            <span className="font-semibold">project?</span> This action{" "}
            <span className="text-danger font-bold">cannot</span> be undone.
          </p>
          <div className="flex gap-4 justify-end">
            <Button
              fullWidth={false}
              mode="normal"
              variant="text"
              onClick={() => setIsDeletingModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              mode="danger"
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};
