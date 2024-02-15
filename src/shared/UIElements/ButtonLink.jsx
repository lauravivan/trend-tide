/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ButtonLink = ({ text = "", className = "", href = "" }) => {
  return (
    <Link className="w-full" to={href}>
      <div
        className={`font-semibold w-full rounded flex items-center justify-center py-3 hover:opacity-85 ${className}`}
      >
        <button type="button">{text}</button>
      </div>
    </Link>
  );
};

export default ButtonLink;
