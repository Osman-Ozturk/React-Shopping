
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const divRef = useRef(null);
  if (!divRef.current) {
    divRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.querySelector('#modal');
    modalRoot.append(divRef.current);

    return () => divRef.current.remove();
  });

  return createPortal(children, divRef.current);
};

export default Modal;