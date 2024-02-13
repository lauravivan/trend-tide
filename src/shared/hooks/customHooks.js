import { useState } from "react";

function useVisibility() {
  const [show, setShow] = useState(false);

  const changeVisibility = () => {
    setShow(!show);
  };

  return {
    visibilityState: show,
    changeVisibility,
  };
}

export { useVisibility };
