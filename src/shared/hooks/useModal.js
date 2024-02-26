import { useState } from "react";

const useModal = () => {
  const [closed, setClosed] = useState(true);

  const closeModal = () => {
    setClosed(true);
  };

  const openModal = () => {
    setClosed(false);
  };

  return {
    closed: closed,
    openModal,
    closeModal,
  };
};

export default useModal;
