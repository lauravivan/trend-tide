/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import Icon from "UIElements/Icon";

const EditableInput = forwardRef(function EditableInput(
  {
    inputLabel,
    inputName,
    inputPlaceholder,
    inputType,
    inputMaxLength,
    onChange,
    isValid,
    invalidMsg,
    className,
  },
  editableInputRef
) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex gap-x-20">
        <div className="flex flex-col">
          <small className="uppercase">{inputLabel}</small>
          <div className="flex">
            <input
              type={inputType}
              className={`text-sm bg-dark outline-none flex-1 ${className}`}
              placeholder={
                inputType === "password"
                  ? "................."
                  : inputPlaceholder
              }
              name={inputName}
              id={inputName}
              autoComplete="off"
              maxLength={inputMaxLength}
              onChange={onChange}
              ref={editableInputRef}
            />
            {!isValid &&
              editableInputRef.current &&
              editableInputRef.current.value.length !== 0 && (
                <Icon className="text-red flex-1">close</Icon>
              )}
          </div>
          <small className="text-red">{invalidMsg}</small>
        </div>
      </div>
    </form>
  );
});

export default EditableInput;
