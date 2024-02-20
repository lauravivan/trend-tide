/* eslint-disable react/prop-types */
const ImageNotFound = ({ className, fontSize }) => {
  return (
    <div className={className}>
      <span
        style={{ fontSize: fontSize }}
        className="material-icons-outlined"
        title="Image"
      >
        image
      </span>
    </div>
  );
};

export default ImageNotFound;
