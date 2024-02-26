/* eslint-disable react/prop-types */
// import Spinner from "UIElements/Spinner";

function FormButton({ text = "", className = "", onClick }) {
  return (
    <div
      className={`font-semibold rounded flex items-center justify-center py-3 hover:opacity-85 bg-black text-white ${className}`}
    >
      <button
        className="w-full flex items-center justify-center gap-x-1"
        type="submit"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default FormButton;
