/* eslint-disable react/prop-types */
function Search({ fontSize = "", className = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className={`material-icons-outlined text-dark ${className}`}
      title="Search"
    >
      search
    </span>
  );
}

export default Search;
