interface ModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export const RemoveMatch = ({ onClose, onDelete }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal__content">
        <p>Удалить свой мэтч?</p>
        <div className="modal__buttons">
          <button onClick={onClose}>Назад</button>
          <button onClick={onDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
};
