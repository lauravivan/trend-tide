/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Button({ type = "", text = "", className = "" }) {
  return (
    <div
      className={`font-semibold w-full rounded flex items-center justify-center py-3 hover:opacity-85 ${className}`}
    >
      <button className="w-full" type={type}>
        {text}
      </button>
    </div>
  );
}

function ButtonWithLink({ type = "", text = "", href = "", className = "" }) {
  return (
    <Link className="w-full" to={href}>
      <Button type={type} text={text} className={className} />
    </Link>
  );
}

export { Button, ButtonWithLink };
