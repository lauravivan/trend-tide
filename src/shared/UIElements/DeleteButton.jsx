/* eslint-disable react/prop-types */
import Modal from "UIElements/Modal";
import useModal from "hooks/useModal";
import Button from "UIElements/Button";
import IconModel from "@/shared/icons/IconModel";
import { forwardRef } from "react";

const DeleteButton = forwardRef(function DeleteButton(
  { children, className },
  delBtnRef
) {
  const { closed, closeModal, openModal } = useModal();

  return (
    <>
      <div
        className={`font-semibold rounded flex items-center justify-center py-3 hover:opacity-85 bg-black text-white bg-red text-sm ${className}`}
      >
        <button
          className="w-full flex items-center justify-center gap-x-1"
          onClick={openModal}
        >
          {children}
        </button>
      </div>
      <Modal isClosed={closed}>
        <div className="flex flex-col gap-y-10">
          <h3 className="flex items-center gap-x-2 text-xl text-red font-bold">
            Warning <IconModel>warning</IconModel>
          </h3>
          <p>
            If you proceed data will be deleted. Do you still want to continue?
          </p>
          <div className="flex gap-x-10">
            <Button className="bg-green" ref={delBtnRef}>
              Yes
            </Button>
            <Button className="bg-light text-dark" onClick={closeModal}>
              Forget it
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default DeleteButton;
