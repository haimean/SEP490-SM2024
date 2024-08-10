import { useState } from "react";
import DialogAccept from "../components/common/DialogAccept";

const useDialogConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");

  const openDialog = (title, onConfirm) => {
    setDialogTitle(title);
    setConfirmCallback(() => onConfirm);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setConfirmCallback(null);
  };

  const handleAccept = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    setIsOpen(false);
  };

  const DialogComponent = () => (
    <>
      <DialogAccept
        open={isOpen}
        handleClose={handleClose}
        title={dialogTitle}
        handleAccept={handleAccept}
      />
    </>
  );

  return { openDialog, DialogComponent };
};

export default useDialogConfirm;
