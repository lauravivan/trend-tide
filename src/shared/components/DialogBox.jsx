import { InfoIcon } from "icons/Icon";
import { useVisibility } from "hooks/customHooks";
import { createPortal } from "react-dom";

/* eslint-disable react/prop-types */
function DialogBox({ message }) {
  const { visibilityState, changeVisibility } = useVisibility();

  return (
    <>
      <button className="flex" onClick={changeVisibility}>
        <InfoIcon fontSize="25px" />
      </button>
      {visibilityState &&
        createPortal(
          <dialog
            open={visibilityState}
            className="text-white bg-black z-50 absolute inset-0 w-[96%] md:w-6/12 rounded-lg py-4 px-6 transition-width ease-in-out duration-1000"
          >
            {message}
          </dialog>,
          document.body
        )}
    </>
  );
}

export default DialogBox;
