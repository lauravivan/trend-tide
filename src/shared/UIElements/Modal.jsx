/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ content }) => {
  const [closed, setClosed] = useState(false);

  const closeModal = () => {
    setClosed(true);
  };

  return createPortal(
    <dialog
      open={!closed}
      className="text-white bg-black z-50 absolute inset-0 w-[30%] h-[20%] rounded-lg py-4 px-6 transition-width ease-in-out duration-1000"
    >
      <div className="flex flex-col gap-y-4">
        <div>{content}</div>
        <div className="text-center">
          <button className="bg-light text-dark py-1 px-2" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
