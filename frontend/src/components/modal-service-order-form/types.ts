import { Control, FieldErrors } from "react-hook-form";
import { GetAllServiceOrdersResponse } from "../../api/interfaces/service-orders";
import { ServiceOrderFormData } from "../../screens/service-orders";
import { ModalProps } from "../modal/types";

export interface ModalServiceOrderFormProps
  extends Pick<ModalProps, "isOpen" | "onClose"> {
  title: string;
  control: Control<ServiceOrderFormData>;
  errors: FieldErrors<ServiceOrderFormData>;

  submitButtonText: string;
  cancelButtonText: string;

  defaultValues?: Partial<Omit<GetAllServiceOrdersResponse, "project">> & {
    project: Partial<GetAllServiceOrdersResponse["project"]>;
  };

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
