import { useReducer } from "react";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "util/validator";

const inputReducer = (state, action) => {
  const value = action.payload;

  const valid = {
    state: "bg-green placeholder:text-white",
    isValid: true,
    value: value,
  };

  const invalid = {
    state: "bg-red placeholder:text-white",
    isValid: false,
    value: value,
    invalidMsg: "",
  };

  switch (action.type) {
    case "VALIDATE_EMAIL": {
      const isValid = validateEmail(value);
      invalid["invalidMsg"] = "Example: bear@example.com";

      if (value.length === 0 || !isValid) {
        return {
          ...state,
          email: invalid,
        };
      }

      return {
        ...state,
        email: valid,
      };
    }

    case "VALIDATE_USERNAME": {
      const isValid = validateUserName(value);
      invalid["invalidMsg"] =
        "Must have at least 5 characters and 3 non-capital letters";

      if (value.length === 0 || !isValid) {
        return {
          ...state,
          username: invalid,
        };
      }

      return {
        ...state,
        username: valid,
      };
    }

    case "VALIDATE_PASSWORD": {
      const isValid = validatePassword(value);
      invalid["invalidMsg"] =
        "Must have at least one symbol, one capital letter, one non-capital letter and one digit.";

      if (value.length === 0 || !isValid) {
        return {
          ...state,
          password: invalid,
        };
      }

      return {
        ...state,
        password: valid,
      };
    }

    case "VALIDATE_PASSWORDS": {
      let invalidMsg;

      if (
        !(
          validatePassword(value.password) &&
          validatePassword(value.passwordConfirmed)
        )
      ) {
        invalidMsg =
          "Password must have at least one symbol, one capital letter, one non-capital letter and one digit.";
      }

      if (!(value.password === value.passwordConfirmed)) {
        invalidMsg = `The passwords don't match. Please verify data.`;
      }

      if (invalidMsg) {
        return {
          ...state,
          password: {
            state: invalid["state"],
            isValid: invalid["isValid"],
            value: value.password,
          },
          confirmedPassword: {
            state: invalid["state"],
            isValid: invalid["isValid"],
            value: value.passwordConfirmed,
            invalidMsg: invalidMsg,
          },
        };
      }

      return {
        ...state,
        password: {
          state: valid["state"],
          isValid: valid["isValid"],
          value: value.password,
        },
        confirmedPassword: {
          state: valid["state"],
          isValid: valid["isValid"],
          value: value.passwordConfirmed,
        },
      };
    }

    case "VALIDATE_COMMON_INPUT":
      if (value.length > 0) {
        return {
          ...state,
          input: valid,
        };
      }

      return {
        ...state,
        input: invalid,
      };

    case "VALIDATE_TEXTAREA":
      if (value.length > 0) {
        return {
          ...state,
          textarea: valid,
        };
      }

      return {
        ...state,
        textarea: invalid,
      };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

function useInput() {
  const initialState = "bg-white text-black invalid";
  const [state, dispatch] = useReducer(inputReducer, {
    email: {
      state: initialState,
      isValid: false,
      value: null,
    },
    username: {
      state: initialState,
      isValid: false,
      value: null,
    },
    password: {
      state: initialState,
      isValid: false,
      value: null,
    },
    confirmedPassword: {
      state: initialState,
      isValid: false,
      value: null,
    },
    input: {
      state: initialState,
      isValid: false,
      value: null,
    },
    textarea: {
      state: initialState,
      isValid: false,
      value: null,
    },
  });

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

  const validateCommonInput = (input) => {
    dispatch({
      type: "VALIDATE_COMMON_INPUT",
      payload: input,
    });
  };

  const validateTextArea = (textarea) => {
    dispatch({
      type: "VALIDATE_TEXTAREA",
      payload: textarea,
    });
  };

  return {
    inputResponse: state,
    validateEmail,
    validatePassword,
    validateUserName,
    validatePasswords,
    validateCommonInput,
    validateTextArea,
  };
}

export default useInput;
