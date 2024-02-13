import { useState } from "react";
import sendRequest from "util/request";
import { useAuthContext } from "context/authContext";
import { useNavigate } from "react-router-dom";

function useForm(method, action, redirectPath) {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const [res, setRes] = useState({
    message: "",
  });

  const redirect = () => {
    navigate(redirectPath);
  };

  const handleFormRequest = async (isFormValid = false, data = {}) => {
    if (isFormValid) {
      try {
        const reqRes = await sendRequest(
          method,
          // eslint-disable-next-line no-undef
          process.env.REACT_APP_BACKEND_URL + action,
          data,
          { "Content-Type": "application/json" }
        );

        if (reqRes.ok) {
          const success = await reqRes.json();

          if (success.token) {
            signIn(success.token, success.uid);
          }

          setRes({
            message: success.message,
          });

          setTimeout(redirect, 1500);
        } else {
          const fail = await reqRes.json();

          setRes({
            message: fail.message,
          });
        }
      } catch (err) {
        setRes({
          message: err.message,
        });
      }
    } else {
      setRes({
        message: "Please fill in the data correctly",
      });
    }
  };

  return {
    formResponse: res,
    handleFormRequest,
  };
}

export default useForm;
