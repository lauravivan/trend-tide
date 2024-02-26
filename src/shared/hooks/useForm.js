import { useState } from "react";
import { sendRequest, getApiUrl } from "util/request";
import { useAuthContext } from "context/authContext";

function useForm() {
  const { signIn } = useAuthContext();
  const [res, setRes] = useState({
    message: "",
    isFormValid: false,
  });

  const handleFormRequest = async ({
    method = "",
    action = "",
    isJSON = true,
    data = {},
  }) => {
    try {
      const res = await sendRequest({
        method: method,
        url: getApiUrl() + action,
        isJSON: isJSON,
        resource: data,
      });

      if (res.status === "success") {
        if (res.token) {
          signIn(res.token, res.uid);
        }

        setRes({
          isFormValid: true,
          message: res.message,
        });
      } else if (res.status === "failed") {
        setRes({
          isFormValid: false,
          message: res.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formResponse: res,
    handleFormRequest,
  };
}

export default useForm;
