import { ModalProps } from "../modal/types";

export interface ModalConfirmDeleteProps
  extends Pick<ModalProps, "isOpen" | "onClose" | "children"> {
  title: string;

  submitButtonText?: string;
  cancelButtonText?: string;

  onConfirm: () => void;
}
