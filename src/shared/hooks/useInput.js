import { useReducer } from "react";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "util/validator";

const initialStateVal = "bg-white text-black invalid";

const initialState = {
  email: {
    state: initialStateVal,
    isValid: false,
    value: null,
  },
  username: {
    state: initialStateVal,
    isValid: false,
    value: null,
  },
  pass: {
    state: initialStateVal,
    isValid: false,
    value: null,
  },
  confirmedPass: {
    state: initialStateVal,
    isValid: false,
    value: null,
  },
};

const inputReducer = (state, action) => {
  const valid = "bg-green placeholder:text-white valid";
  const invalid = "bg-red placeholder:text-white invalid";
  const value = action.payload;

  if (value.length === 0) {
    return initialState;
  }

  switch (action.type) {
    case "VALIDATE_EMAIL": {
      const isValid = validateEmail(value);
      return {
        ...state,
        email: {
          state: isValid ? valid : invalid,
          isValid: isValid,
          value: value,
        },
      };
    }

    case "VALIDATE_USERNAME": {
      const isValid = validateUserName(value);
      return {
        ...state,
        username: {
          state: isValid ? valid : invalid,
          isValid: isValid,
          value: value,
        },
      };
    }

    case "VALIDATE_PASSWORD": {
      const isValid = validatePassword(value);
      return {
        ...state,
        pass: {
          state: isValid ? valid : invalid,
          isValid: isValid,
          value: value,
        },
      };
    }

    case "VALIDATE_PASSWORDS": {
      let passwordsValid = false;
      let passwordsMatch = false;
      let errorMsg;

      if (
        validatePassword(value.password) &&
        validatePassword(value.passwordConfirmed)
      ) {
        passwordsValid = true;
      } else {
        errorMsg = "Invalid passwords";
      }

      if (value.password === value.passwordConfirmed) {
        passwordsMatch = true;
      } else {
        errorMsg = `The passwords don't match. Please verify data.`;
      }

      if (passwordsValid && passwordsMatch) {
        return {
          ...state,
          pass: {
            state: valid,
            isValid: true,
            value: value.password,
          },
          confirmedPass: {
            state: valid,
            isValid: true,
            value: value.passwordConfirmed,
          },
        };
      }

      return {
        ...state,
        pass: {
          state: invalid,
          isValid: false,
          value: value.password,
        },
        confirmedPass: {
          state: invalid,
          message: errorMsg,
          isValid: false,
          value: value.passwordConfirmed,
        },
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

function useInput() {
  const [state, dispatch] = useReducer(inputReducer, initialState);

  const validateEmail = (email) => {
    dispatch({
      type: "VALIDATE_EMAIL",
      payload: email,
    });
  };

  const validateUserName = (username) => {
    dispatch({
      type: "VALIDATE_USERNAME",
      payload: username,
    });
  };

  const validatePassword = (password) => {
    dispatch({
      type: "VALIDATE_PASSWORD",
      payload: password,
    });
  };

  const validatePasswords = (password, passwordConfirmed) => {
    dispatch({
      type: "VALIDATE_PASSWORDS",
      payload: {
        password: password,
        passwordConfirmed: passwordConfirmed,
      },
    });
  };

  return {
    inputResponse: state,
    validateEmail,
    validatePassword,
    validateUserName,
    validatePasswords,
  };
}

export default useInput;
