import "./ConfirmModal.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-confirm">
            Confirmar
          </button>
          <button onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
