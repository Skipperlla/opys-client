import React, { memo, ReactNode } from "react";
import { Modal } from "@mui/material";

interface IMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}
const MaterialModal = ({ isOpen, onClose, children }: IMaterialModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};
// aria-labelledby="modal-modal-title"
// aria-describedby="modal-modal-description"
export default memo(MaterialModal);
