/* eslint-disable react/prop-types */
// import Spinner from "UIElements/Spinner";

const Request = ({ requestRes, children }) => {
  if (requestRes && requestRes.status === "success") {
    return children;
  } else {
    return (
      <div className="text-center self-center text-white m-auto flex flex-1 flex-col text-xl font-bold">
        {!requestRes && <p>{/* Searching for data <Spinner /> */}</p>}
        {requestRes && requestRes.message}
      </div>
    );
  }
};

export default Request;
