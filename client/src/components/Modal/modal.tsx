import React, { ReactNode, useRef, useEffect } from "react";
import "./modal.scss";

interface ModalProps {
  children: ReactNode;
  isOpen: Boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const trapFocus = (e: KeyboardEvent) => {
    if (modalRef.current && props.isOpen) {
      const modalElement = modalRef.current;
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", trapFocus);
    } else {
      document.removeEventListener("keydown", trapFocus);
    }

    return () => {
      document.removeEventListener("keydown", trapFocus);
    };
  }, [props.isOpen]);

  return (
    <div>
      {props.isOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span className="close" onClick={props.onClose}>
              &times;
            </span>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
