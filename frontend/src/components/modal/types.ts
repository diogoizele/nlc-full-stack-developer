export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;

  title?: string;
  closeOnOverlayClick?: boolean;

  onClose: () => void;
}
