import { useState } from "react";
import { sendRequest, getApiUrl } from "util/request";
import { useAuthContext } from "context/authContext";

function useForm(method, action, isJSON = true) {
  const { signIn } = useAuthContext();

  const [res, setRes] = useState({
    message: "",
    isFormValid: false,
  });

  const handleFormRequest = async (isFormValid = false, data = {}) => {
    if (isFormValid) {
      try {
        const reqRes = await sendRequest({
          method: method,
          url: getApiUrl() + action,
          resource: data,
          isJSON: isJSON,
        });

        if (reqRes.ok) {
          const success = await reqRes.json();

          if (success.token) {
            signIn(success.token, success.uid);
          }

          setRes({
            message: success.message,
            isFormValid: true,
          });
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
