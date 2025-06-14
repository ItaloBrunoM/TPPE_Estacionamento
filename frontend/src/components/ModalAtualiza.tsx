import React from "react";
import "./ModalAtualiza.css";

interface ModalAtualizaProps {
  message: string;
  onClose: () => void;
}

const ModalAtualiza: React.FC<ModalAtualizaProps> = ({ message, onClose }) => {
  return (
    <div className="success-popup">
      <p>{message}</p>
      <button onClick={onClose} className="close-btn">
        &times;
      </button>
    </div>
  );
};

export default ModalAtualiza;
