/* eslint-disable react/prop-types */
function Spinner({ fontSize = "", className = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className={`material-icons-outlined ${className}`}
      title="Favorite"
    >
      favorite
    </span>
  );
}

export default Spinner;
