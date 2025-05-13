interface ModalProps {
  onClose: () => void;
}

export const SuccessModal = ({ onClose }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal__content">
        <p>Вы успешно приобрели Vibe Premium. Наслаждайтесь!</p>
        <div className="modal__buttons single">
          <button onClick={onClose}>ОК</button>
        </div>
      </div>
    </div>
  );
};
