import { createPortal } from "react-dom";

import { IoClose } from "react-icons/io5";

import { useEffect } from "react";
import { CloseButton, Container, Overlay } from "./styles";
import { ModalProps } from "./types";

export const Modal = ({
  children,
  isOpen,
  closeOnOverlayClick,
  title,
  onClose,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const handlePressEscape = (event: DocumentEventMap["keydown"]) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlePressEscape);

    return () => {
      document.removeEventListener("keydown", handlePressEscape);
    };
  }, []);

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Container>
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-3xl">{title}</h2>
            <CloseButton onClick={onClose}>
              <IoClose size={32} />
            </CloseButton>
          </div>
        )}
        {children}
      </Container>
    </Overlay>,
    document.body
  );
};
