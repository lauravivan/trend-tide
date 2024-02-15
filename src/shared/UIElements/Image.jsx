/* eslint-disable react/prop-types */
function Image({ fontSize = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className="material-icons-outlined"
      title="Image"
    >
      image
    </span>
  );
}

export default Image;
