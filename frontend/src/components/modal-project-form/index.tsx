import { Controller } from "react-hook-form";
import { Button } from "../button";
import { Input } from "../input";
import { Modal } from "../modal";
import { TextArea } from "../text-area";
import { ModalProjectFormProps } from "./types";

export const ModalProjectForm = ({
  isOpen,
  control,
  errors,
  title,
  cancelButtonText,
  submitButtonText,
  defaultValues,
  onClose,
  onSubmit,
}: ModalProjectFormProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "* Name is required",
          }}
          defaultValue={defaultValues?.name}
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
          defaultValue={defaultValues?.description}
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
