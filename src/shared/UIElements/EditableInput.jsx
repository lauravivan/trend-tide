/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Icon from "UIElements/Icon";
import useInput from "hooks/useInput";
import { sendRequest, getApiUrl } from "util/request";

const EditableInput = ({
  inputName,
  inputPlaceholder,
  inputType,
  inputMaxLength,
  formAction,
}) => {
  const [invalidMsg, setInvalidMsg] = useState("");
  const editableInputRef = useRef();
  const invalidClass = "text-red";
  const validClass = "text-green";
  const neutralClass = "text-white";

  const handleInputChange = async () => {
    const ref = editableInputRef.current;

    const res = await sendRequest({
      method: "PATCH",
      url: getApiUrl() + formAction,
      resource: {
        [ref.name]: ref.value,
      },
    });
    const resJSON = await res.json();

    if (res.ok) {
      setInvalidMsg("");
      handleValidation([neutralClass], [invalidClass, validClass]);
    } else {
      setInvalidMsg(resJSON.message);
      handleValidation([invalidClass], [validClass, neutralClass]);
    }
  };

  const handleValidation = (classesToAdd, classesToRemove) => {
    const ref = editableInputRef.current;

    ref.classList.add(...classesToAdd);
    ref.classList.remove(...classesToRemove);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col cursor-pointer">
        <small className="uppercase">{inputName}</small>
        <div className="flex flex-col">
          <div className="flex items-center">
            <input
              type={inputType}
              className={`text-sm bg-dark outline-none flex-1`}
              placeholder={
                inputType === "password"
                  ? "................."
                  : inputPlaceholder
              }
              name={inputName}
              id={inputName}
              autoComplete="off"
              maxLength={inputMaxLength}
              onChange={handleInputChange}
              ref={editableInputRef}
            />
            {invalidMsg && <Icon className="text-red flex-1">close</Icon>}
          </div>
          <small className="mt-1 text-red">{invalidMsg}</small>
          <div>
            {/* <input
              type={inputType}
              className={`text-sm bg-dark outline-none flex-1 ${className}`}
              placeholder={
                inputType === "password" ? "................." : inputValue
              }
              name={inputName}
              id={inputName}
              onChange={onChange}
              autoComplete="off"
              ref={editableInputRef}
              maxLength={inputMaxLength}
            /> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditableInput;
