/* eslint-disable react/prop-types */
import FormButton from "UIElements/FormButton";
import { useState, useEffect, useRef } from "react";
import useInput from "hooks/useInput";
import useForm from "hooks/useForm";
import IconModel from "@/shared/icons/IconModel";
import { sendRequest, getApiUrl } from "util/request";

const EditableInput = ({
  inputName,
  inputValue,
  inputType,
  formAction,
  inputMaxLength,
}) => {
  const { inputResponse, validateUserName, validateEmail, validatePassword } =
    useInput();
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  const handleInputOnChange = () => {
    setEditMode(true);
    const i = inputRef.current;

    if (!i) return;

    if (i.name === "username") {
      validateUserName(i.value);
    }

    if (i.name === "email") {
      validateEmail(i.value);
    }

    if (i.name === "password") {
      validatePassword(i.value);
    }

    const iRes = inputResponse[i.name];

    const valid = ["valid", "text-green"];
    const invalid = ["invalid", "text-red"];

    if (iRes.isValid) {
      i.classList.add(...valid);
      i.classList.remove(...invalid);
    } else {
      i.classList.add(...invalid);
      i.classList.remove(...valid);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (inputRef.current.className.includes("valid")) {
      const res = await sendRequest({
        method: "PATCH",
        url: getApiUrl() + formAction,
        resource: {
          [inputRef.current.name]: inputRef.current.value,
        },
      });

      if (res.ok) {
        setEditMode(false);
      }
    }
  };

  if (!editMode) {
    const valid = ["valid", "text-green"];
    const invalid = ["invalid", "text-red"];

    if (inputRef.current) {
      inputRef.current.classList.remove(...valid, ...invalid);
    }
  }

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
              className="text-sm bg-dark outline-none flex-1"
              placeholder={
                inputType === "password" ? "................." : inputValue
              }
              name={inputName}
              id={inputName}
              onChange={handleInputOnChange}
              autoComplete="off"
              ref={inputRef}
              maxLength={inputMaxLength}
            />
            {editMode &&
              inputRef.current &&
              inputRef.current.className.includes("invalid") && (
                <IconModel className="text-red flex-1">close</IconModel>
              )}
            {editMode &&
              inputRef.current &&
              inputRef.current.className.includes("valid") &&
              !inputRef.current.className.includes("invalid") && (
                <IconModel className="text-green flex-1">done</IconModel>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditableInput;
