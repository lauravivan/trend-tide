/* eslint-disable react/prop-types */
function Spinner({ fontSize = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className="material-icons-outlined"
      title="Favorite Border"
    >
      favorite_border
    </span>
  );
}

export default Spinner;
