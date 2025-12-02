import { useState } from "react";

export function useDialog(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return {
    open: isOpen,
    openDialog,
    closeDialog,
    onOpenChange: setIsOpen,
  };
}