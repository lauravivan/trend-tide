/* eslint-disable react/prop-types */
const IconModel = ({ fontSize, title, children, className }) => {
  return (
    <span
      style={{ fontSize: fontSize }}
      className={`material-icons-outlined ${className}`}
      title={title}
    >
      {children}
    </span>
  );
};

export default IconModel;
