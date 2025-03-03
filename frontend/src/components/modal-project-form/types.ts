import { Control, FieldErrors } from "react-hook-form";

import { ProjectFormData } from "../../screens/projects";
import { ModalProps } from "../modal/types";

export interface ModalProjectFormProps
  extends Pick<ModalProps, "isOpen" | "onClose"> {
  title: string;
  control: Control<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;

  submitButtonText: string;
  cancelButtonText: string;

  defaultValues?: ProjectFormData;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
