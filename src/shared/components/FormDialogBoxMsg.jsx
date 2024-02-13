/* eslint-disable react/prop-types */
import { getPasswordText, getUserNameText, getEmailText } from "util/util";

function FormDialogBoxMsg({ hasUserName, hasEmail, hasPassword }) {
  return (
    <ul className="leading-7 font-bold">
      {hasUserName && (
        <li>
          <span className="text-pastel-purple">Username:</span>{" "}
          <span className="text-pastel-creme">{getUserNameText()}</span>
        </li>
      )}
      {hasEmail && (
        <li>
          <span className="text-pastel-orange">Email:</span>{" "}
          <span className="text-pastel-creme">{getEmailText()}</span>
        </li>
      )}
      {hasPassword && (
        <li>
          <span className="text-pastel-green">Password:</span>{" "}
          <span className="text-pastel-creme">{getPasswordText()}</span>
        </li>
      )}
    </ul>
  );
}

export default FormDialogBoxMsg;
