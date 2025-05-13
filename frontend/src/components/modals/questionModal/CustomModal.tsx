interface ModalProps {
  onClose: () => void;
  onDelete: () => void;
  description: string;
  back: string;
  action: string;
}

export const CustomModal = ({
  onClose,
  onDelete,
  description,
  back,
  action,
}: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal__content">
        <p>{description}</p>
        <div className="modal__buttons">
          <button onClick={onClose}>{back}</button>
          <button onClick={onDelete}>{action}</button>
        </div>
      </div>
    </div>
  );
};
