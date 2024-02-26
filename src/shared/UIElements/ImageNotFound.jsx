/* eslint-disable react/prop-types */
const ImageNotFound = ({ className, fontSize }) => {
  return (
    <span
      style={{ fontSize: fontSize }}
      className={`material-icons-outlined ${className}`}
      title="Image"
    >
      image
    </span>
  );
};

export default ImageNotFound;
