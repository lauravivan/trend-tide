/* eslint-disable react/prop-types */
import DialogBox from "UIElements/DialogBox";
import FormButton from "UIElements/FormButton";
import ButtonLink from "UIElements/ButtonLink";
import Input from "UIElements/Input";
import useInput from "hooks/useInput";
import { Link } from "react-router-dom";
import useForm from "hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth({
  cardTitle,
  btnText,
  btnBackHref = "/account/signin",
  hasUserName = false,
  hasPassConfirmed = false,
  isSignIn = false,
  action,
  redirectPath = "/account/signin",
  method = "POST",
}) {
  const {
    inputResponse,
    validateEmail,
    validatePassword,
    validateUserName,
    validatePasswords,
  } = useInput();

  const { formResponse, handleFormRequest } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [formHasBeenSubmitted, setFormHasBeenSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate(redirectPath);
    };

    if (formResponse.message) {
      setIsLoading(false);
    }

    if (formResponse.isFormValid && formResponse.message) {
      setTimeout(redirect, 1500);
    }

    if (formHasBeenSubmitted && !formResponse.message) {
      setIsLoading(true);
    }
  }, [
    formResponse.message,
    formHasBeenSubmitted,
    redirectPath,
    navigate,
    formResponse.isFormValid,
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormHasBeenSubmitted(true);
    const data = {};
    let isFormValid = true;

    if (inputResponse.email.isValid && inputResponse.pass.isValid) {
      data["email"] = inputResponse.email.value;
      data["password"] = inputResponse.pass.value;

      if (hasUserName && inputResponse.username.isValid) {
        data["username"] = inputResponse.username.value;
      }

      if (hasPassConfirmed && inputResponse.confirmedPass.isValid) {
        data["passwordConfirmed"] = inputResponse.confirmedPass.value;
      }
    } else {
      isFormValid = false;
    }

    handleFormRequest(method, action, true, isFormValid, data);
  };

  return (
    <>
      <header className="flex items-center gap-x-4 mb-10">
        <h3 className="text-lg">{cardTitle}</h3>
        <DialogBox
          message={
            <ul className="leading-7 font-bold">
              {hasUserName && (
                <li>
                  <span className="text-pastel-purple">Username:</span>{" "}
                  <span className="text-pastel-creme">
                    Can contain symbols (%,$,#,*), digits and letters, having
                    between 5 and 15 characters, with at least 3 non-capital
                    letters
                  </span>
                </li>
              )}
              <li>
                <span className="text-pastel-orange">Email:</span>{" "}
                <span className="text-pastel-creme">
                  Must contain @ and at least one .
                </span>
              </li>
              <li>
                <span className="text-pastel-green">Password:</span>{" "}
                <span className="text-pastel-creme">
                  Must contain between 9 and 40 characteres having at least one
                  symbol, one capital letter, one digit and one non-capital
                  letter
                </span>
              </li>
            </ul>
          }
        />
      </header>
      <main className="mb-4">
        <form
          method={method}
          className="flex flex-col gap-y-3"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          {hasUserName && (
            <Input
              type="text"
              placeholder="Your username"
              id="auth-username"
              name="username"
              onChange={(e) => {
                validateUserName(e.target.value);
              }}
              className={inputResponse.username.state}
              maxLength={50}
            />
          )}
          <Input
            type="text"
            placeholder="Your e-mail"
            id="auth-email"
            name="email"
            onChange={(e) => {
              validateEmail(e.target.value);
            }}
            className={inputResponse.email.state}
            maxLength={50}
          />
          <Input
            type="password"
            placeholder="Your password"
            id="auth-pass"
            name="password"
            onChange={(e) => {
              if (hasPassConfirmed) {
                validatePasswords(
                  e.target.value,
                  inputResponse.confirmedPass.value
                );
              } else {
                validatePassword(e.target.value);
              }
            }}
            className={inputResponse.pass.state}
            maxLength={50}
          />
          {hasPassConfirmed && (
            <>
              <Input
                type="password"
                placeholder="Confirm your password"
                id="auth-pass-conf"
                name="passwordConfirmed"
                onChange={(e) => {
                  validatePasswords(inputResponse.pass.value, e.target.value);
                }}
                className={inputResponse.confirmedPass.state}
                maxLength={50}
              />
              <small>{inputResponse.confirmedPass.message}</small>
            </>
          )}

          {isSignIn && (
            <div className="flex flex-col gap-x-2">
              {" "}
              <span>
                Don&apos;t you have an account?{" "}
                <Link className="underline inline" to={"/account/signup"}>
                  Create here{" "}
                </Link>{" "}
              </span>{" "}
              <span>
                Did you forget your password?{" "}
                <Link className="underline inline" to={"/account/recoverpass"}>
                  Recover here{" "}
                </Link>{" "}
              </span>{" "}
            </div>
          )}
          {formResponse.message && (
            <div className={`bg-black text-white w-full rounded-lg py-2 px-3`}>
              <span>{formResponse.message}</span>
            </div>
          )}
          <div className="flex gap-x-4 mt-1">
            <ButtonLink
              className="bg-light text-black"
              href={btnBackHref}
              text="Go back"
            />
            <FormButton
              type="submit"
              text={btnText}
              isLoading={isLoading}
              className="w-full"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Auth;
