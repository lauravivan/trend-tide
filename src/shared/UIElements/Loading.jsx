/* eslint-disable react/prop-types */
function Loading({ fontSize = "" }) {
  return (
    <p>
      Loading{" "}
      <span
        style={{ fontSize: fontSize }}
        className="material-icons-outlined animate-spin"
        title="Loop"
      >
        loop
      </span>
    </p>
  );
}

export default Loading;
