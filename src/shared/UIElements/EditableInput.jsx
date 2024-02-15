/* eslint-disable react/prop-types */
import FormButton from "UIElements/FormButton";
import Input from "UIElements/Input";
import { useState } from "react";
import useInput from "hooks/useInput";

const EditableInput = ({ inputName, inputValue, inputType, formAction }) => {
  const { inputResponse, validateUserName, validateEmail, validatePassword } =
    useInput();
  const [editMode, setEditMode] = useState(false);

  const edit = () => {
    setEditMode(true);
  };

  const quitEditting = () => {
    setEditMode(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        {!editMode && (
          <button type="button" onClick={edit} className="flex flex-col">
            <small className="uppercase">{inputName}</small>
            {inputType === "password" ? ".............." : inputValue}
          </button>
        )}
        {editMode && (
          <>
            <Input
              type={inputType}
              className={`text-dark ${
                inputName === "username"
                  ? inputResponse.username.state
                  : inputName === "email"
                  ? inputResponse.email.state
                  : inputName === "password"
                  ? inputResponse.pass.state
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
            />
            <div className="flex justify-end gap-x-4 mt-3">
              <button
                type="button"
                className="bg-light text-dark font-semibold w-1/5 rounded flex items-center justify-center py-3 hover:opacity-85 text-xs"
                onClick={quitEditting}
              >
                Quit
              </button>
              <FormButton className="w-1/5 text-xs" text="Save" />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditableInput;
