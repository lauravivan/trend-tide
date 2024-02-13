/* eslint-disable react/prop-types */
import DialogBox from "components/DialogBox";
import { Button, ButtonWithLink } from "components/Button";
import Input from "components/Input";
import useInput from "hooks/useInput";
import { Link } from "react-router-dom";
import useForm from "hooks/useForm";

function Auth({
  cardTitle,
  dialogMsg,
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

  const { formResponse, handleFormRequest } = useForm(
    method,
    action,
    redirectPath
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

    handleFormRequest(isFormValid, data);
  };

  return (
    <>
      <header className="flex items-center gap-x-4 mb-10">
        <h3 className="text-lg">{cardTitle}</h3>
        <DialogBox message={dialogMsg} />
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
            <ButtonWithLink
              type="button"
              className="bg-light text-black"
              href={btnBackHref}
              text="Go back"
            />
            <Button
              type="submit"
              className="bg-black text-white"
              text={btnText}
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Auth;
