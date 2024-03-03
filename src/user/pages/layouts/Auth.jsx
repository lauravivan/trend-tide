/* eslint-disable react/prop-types */
import Input from "UIElements/Input";
import useInput from "hooks/useInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "UIElements/Icon";
import Modal from "UIElements/Modal";
import useModal from "hooks/useModal";
import Button from "UIElements/Button";
import { sendRequest, getApiUrl } from "util/request";
import Loading from "UIElements/Loading";
import { useAuthContext } from "context/authContext";
import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "util/validator";

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

  const [requestRes, setRequestRes] = useState(null);

  const { openModal, closed, closeModal } = useModal();

  const [waitingResponse, setWaitingResponse] = useState(false);

  const { signIn } = useAuthContext();

  const navigate = useNavigate();

  const redirect = () => {
    navigate(redirectPath);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {};

    if (inputResponse.email.isValid && inputResponse.password.isValid) {
      data["email"] = inputResponse.email.value;
      data["password"] = inputResponse.password.value;

      if (hasUserName && inputResponse.username.isValid) {
        data["username"] = inputResponse.username.value;
      }

      if (hasPassConfirmed && inputResponse.confirmedPassword.isValid) {
        data["passwordConfirmed"] = inputResponse.confirmedPassword.value;
      }

      try {
        setWaitingResponse(true);
        const res = await sendRequest({
          method: method,
          url: getApiUrl() + action,
          resource: data,
        });

        if (res) {
          setWaitingResponse(false);
        }

        const resJSON = await res.json();

        if (res.ok) {
          setRequestRes({
            ok: true,
            message: resJSON.message,
          });

          if (resJSON.token) {
            signIn(resJSON.token, resJSON.uid);
          }

          setTimeout(redirect, 1000);
        } else {
          setRequestRes({
            ok: false,
            message: resJSON.message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <header className="flex items-center gap-x-4 mb-10">
        <h3 className="text-lg">{cardTitle}</h3>
        <button className="flex" onClick={openModal}>
          <Icon fontSize="30px">info</Icon>
        </button>
        <Modal isClosed={closed}>
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
                symbol, one capital letter, one digit and one non-capital letter
              </span>
            </li>
          </ul>
          <Button onClick={closeModal} className="bg-light text-dark mt-3">
            Close
          </Button>
        </Modal>
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
            <div>
              <Input
                type="text"
                placeholder="Your username"
                id="auth-username"
                name="username"
                onChange={(e) => {
                  validateUserName(e.target.value);
                }}
                className={inputResponse.username.formState}
                maxLength={USERNAME_MAX_LENGTH}
              />
              <small>{inputResponse.username.invalidMsg}</small>
            </div>
          )}
          <div>
            <Input
              type="text"
              placeholder="Your e-mail"
              id="auth-email"
              name="email"
              onChange={(e) => {
                validateEmail(e.target.value);
              }}
              className={inputResponse.email.formState}
              maxLength={EMAIL_MAX_LENGTH}
            />
            <small>{inputResponse.email.invalidMsg}</small>
          </div>
          <div>
            <Input
              type="password"
              placeholder="Your password"
              id="auth-pass"
              name="password"
              onChange={(e) => {
                if (hasPassConfirmed) {
                  validatePasswords(
                    e.target.value,
                    inputResponse.confirmedPassword.value
                  );
                } else {
                  validatePassword(e.target.value);
                }
              }}
              className={inputResponse.password.formState}
              maxLength={PASSWORD_MAX_LENGTH}
            />
            <small>{inputResponse.password.invalidMsg}</small>
          </div>
          {hasPassConfirmed && (
            <div>
              <Input
                type="password"
                placeholder="Confirm your password"
                id="auth-pass-conf"
                name="passwordConfirmed"
                onChange={(e) => {
                  validatePasswords(
                    inputResponse.password.value,
                    e.target.value
                  );
                }}
                className={inputResponse.confirmedPassword.formState}
                maxLength={PASSWORD_MAX_LENGTH}
              />
              <small>{inputResponse.confirmedPassword.invalidMsg}</small>
            </div>
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
          {requestRes && (
            <div className={`bg-black text-white w-full rounded-lg py-2 px-3`}>
              <span>{requestRes.message}</span>
            </div>
          )}
          {waitingResponse && (
            <div className={`bg-black text-white w-full rounded-lg py-2 px-3`}>
              <Loading />
            </div>
          )}
          <div className="flex gap-x-4 mt-1">
            <Link className="w-full" to={btnBackHref}>
              <Button className="bg-light text-black">Go back</Button>
            </Link>
            <Button type="submit" className="w-full bg-black">
              {btnText}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Auth;
