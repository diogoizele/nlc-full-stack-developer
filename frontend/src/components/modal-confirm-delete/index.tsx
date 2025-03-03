import { Button } from "../button";
import { Modal } from "../modal";
import { ModalConfirmDeleteProps } from "./types";

export const ModalConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  cancelButtonText = "Cancel",
  submitButtonText = "Delete",
  title,
  children,
}: ModalConfirmDeleteProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-danger">{title}</h2>
        {children}
        <div className="flex gap-4 justify-end">
          <Button
            fullWidth={false}
            mode="normal"
            variant="text"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button fullWidth={false} mode="danger" onClick={onConfirm}>
            {submitButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
