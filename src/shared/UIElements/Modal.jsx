/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";

const Modal = ({ isClosed, children }) => {
  return createPortal(
    <dialog
      open={!isClosed}
      className="text-white bg-black z-50 absolute inset-0 rounded-lg py-4 px-6 transition-width ease-in-out duration-1000 w-[95%] h-[95%] md:w-[50%]"
    >
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
