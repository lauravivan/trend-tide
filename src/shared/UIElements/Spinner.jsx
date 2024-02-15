/* eslint-disable react/prop-types */
function Spinner({ fontSize = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className="material-icons-outlined animate-spin"
      title="Loop"
    >
      loop
    </span>
  );
}

export default Spinner;
