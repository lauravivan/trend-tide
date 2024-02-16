/* eslint-disable react/prop-types */
import Spinner from "UIElements/Spinner";

const Message = ({ isSearching = false, message = "" }) => {
  return (
    <div className="text-white flex flex-col m-auto text-2xl font-bold">
      {isSearching && (
        <p>
          Searching for data <Spinner />
        </p>
      )}
      {message}
    </div>
  );
};

export default Message;
