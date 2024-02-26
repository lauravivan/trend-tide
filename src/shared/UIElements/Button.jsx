/* eslint-disable react/prop-types */
// import Spinner from "UIElements/Spinner";
import { forwardRef } from "react";

const Button = forwardRef(function Button(
  { type, className, onClick, children, isLoading = false },
  btnRef
) {
  return (
    <div
      className={`font-semibold rounded text-center py-3 hover:opacity-85 text-sm w-full ${className}`}
    >
      <button type={type} className="w-full" onClick={onClick} ref={btnRef}>
        {children}
        {isLoading && (
          <div className="text-light animate-spin">
            {/* <Spinner fontSize={"20px"} /> */}
          </div>
        )}
      </button>
    </div>
  );
});

export default Button;
