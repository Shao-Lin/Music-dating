interface ClassicButtonProps {
  name: string;
  type?: "button" | "submit" | "reset"; // Уже было необязательным из-за default value
  isLoading?: boolean; // Сделаем и это необязательным
  onClick?: () => void; // Новый необязательный параметр
}

export const ClassicButton = ({
  name,
  type = "button",
  isLoading = false, // Значение по умолчанию
  onClick, // Новый пропс
}: ClassicButtonProps) => {
  return (
    <button
      className="button"
      type={type}
      disabled={isLoading}
      onClick={onClick} // Передаем обработчик
    >
      {name}
    </button>
  );
};
