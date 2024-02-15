/* eslint-disable react/prop-types */
import { VisibilityIcon, VisibilityOffIcon } from "icons/Icon";
import { useState } from "react";

const Input = ({
  type,
  id,
  className,
  placeholder,
  name,
  onChange,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [coverPass, setCoverPass] = useState("password");

  const changeToHide = () => {
    setShowPassword(false);
    setCoverPass("password");
  };

  const changeToVisible = () => {
    setShowPassword(true);
    setCoverPass("text");
  };

  if (type === "password") {
    return (
      <div className={`flex rounded-lg ${className}`}>
        <input
          type={coverPass}
          placeholder={placeholder}
          className={`rounded-md px-2 py-3 outline-none w-full ${className}`}
          maxLength={maxLength}
          autoComplete="off"
          onChange={onChange}
          id={id}
          name={name}
        />
        <div className={`flex items-center mr-3`}>
          <button
            type="button"
            className={`flex ${showPassword ? "" : "hidden"}`}
            onClick={changeToHide}
          >
            <VisibilityIcon />
          </button>
          <button
            type="button"
            className={`flex ${showPassword ? "hidden" : ""}`}
            onClick={changeToVisible}
          >
            <VisibilityOffIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`rounded-md px-2 py-3 outline-none w-full ${className}`}
      maxLength={maxLength}
      autoComplete="off"
      onChange={onChange}
      id={id}
      name={name}
    />
  );
};

export default Input;
