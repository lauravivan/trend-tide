/* eslint-disable react/prop-types */
import FormButton from "UIElements/FormButton";
import { useState, useEffect } from "react";
import useInput from "hooks/useInput";
import useForm from "hooks/useForm";

const EditableInput = ({ inputName, inputValue, inputType, formAction }) => {
  const { inputResponse, validateUserName, validateEmail, validatePassword } =
    useInput();
  const [editMode, setEditMode] = useState(false);
  const { formResponse, handleFormRequest } = useForm();

  useEffect(() => {
    if (formResponse.isFormValid) {
      setEditMode(false);
    }
  }, [formResponse.isFormValid]);

  const edit = () => {
    setEditMode(true);
  };

  const quitEditting = () => {
    setEditMode(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const input = e.target[0];
    const inputName = input.name;
    const inputValue = input.value;

    if (input.className.includes("true")) {
      await handleFormRequest("PATCH", formAction, true, true, {
        [inputName]: inputValue,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <div className="flex flex-col cursor-pointer">
          <small className="uppercase">{inputName}</small>
          <div className="flex">
            <input
              type={inputType}
              className={`text-sm bg-dark outline-none flex-1 ${
                inputName === "username"
                  ? inputResponse.username.isValid
                  : inputName === "email"
                  ? inputResponse.email.isValid
                  : inputName === "password"
                  ? inputResponse.pass.isValid
                  : ""
              }`}
              placeholder={
                inputType === "password" ? ".............." : inputValue
              }
              name={inputName}
              id={inputName}
              onChange={(e) => {
                if (inputName === "username") {
                  validateUserName(e.target.value);
                } else if (inputName === "email") {
                  validateEmail(e.target.value);
                } else if (inputName === "password") {
                  validatePassword(e.target.value);
                }
              }}
              onClick={edit}
              autoComplete="off"
            />
            {editMode && (
              <div className="flex gap-x-4 flex-1">
                <button
                  type="button"
                  className="bg-light w-full text-dark font-semibold rounded flex items-center justify-center hover:opacity-85 text-xs"
                  onClick={quitEditting}
                >
                  Quit
                </button>
                <FormButton className="w-full text-xs" text="Save" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditableInput;
