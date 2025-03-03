import { Controller } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchAllProjects } from "../../api/projects";
import { SERVICE_ORDER_CATEGORY_OPTIONS } from "../../config/constants";
import { required } from "../../utils/form-rules";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Modal } from "../modal";
import { Select } from "../select";
import { TextArea } from "../text-area";
import { ModalServiceOrderFormProps } from "./types";

export const ModalServiceOrderForm = ({
  isOpen,
  control,
  errors,
  title,
  cancelButtonText,
  submitButtonText,
  defaultValues,

  onClose,
  onSubmit,
}: ModalServiceOrderFormProps) => {
  console.log(defaultValues);

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchAllProjects(),
    enabled: isOpen,
  });

  const projectOptions = useMemo(
    () =>
      data?.map((project) => ({
        label: createProjectLabel(project.id, project.name),
        value: project.id,
      })),
    [data]
  );

  function createProjectLabel(id?: number, name?: string) {
    if (!id || !name) return "";

    return `#${id} - ${name}`;
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          rules={required("Name")}
          defaultValue={defaultValues?.name}
          render={({ field }) => (
            <Input
              defaultValue={defaultValues?.name}
              label="Name"
              placeholder="Enter service order name..."
              error={errors.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={required("Category")}
          defaultValue={defaultValues?.category}
          render={({ field }) => (
            <Select
              defaultOption={defaultValues?.category}
              label="Category"
              options={SERVICE_ORDER_CATEGORY_OPTIONS}
              error={errors.category?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={required("Description")}
          defaultValue={defaultValues?.description}
          render={({ field }) => (
            <TextArea
              defaultValue={defaultValues?.description}
              label="Description"
              placeholder="Enter service order description..."
              error={errors.description?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="projectId"
          rules={required("Project")}
          defaultValue={Number(defaultValues?.project.id)}
          render={({ field }) => (
            <Select
              defaultOption={createProjectLabel(
                defaultValues?.project.id,
                defaultValues?.project.name
              )}
              label="Project"
              options={projectOptions ?? []}
              error={errors.projectId?.message}
              {...field}
            />
          )}
        />

        <div className="flex justify-end">
          <Controller
            control={control}
            name="isApproved"
            defaultValue={defaultValues?.isApproved}
            render={({ field }) => (
              <Checkbox
                align="right"
                label="Approved"
                defaultValue={!!defaultValues?.isApproved}
                onClick={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex gap-4 justify-end mt-8">
          <Button
            fullWidth={false}
            type="button"
            variant="text"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button type="submit" fullWidth={false}>
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
