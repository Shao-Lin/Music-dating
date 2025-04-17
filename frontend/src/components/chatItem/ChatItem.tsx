import { CustomAvatar } from "../UI/avatar/CustomAvatar";
export const ChatItem = () => {
  return (
    <button className="chat-item">
      <div className="chat-item__avatar">
        <CustomAvatar size={60} />
      </div>

      <div className="chat-item__content">
        <div className="chat-item__name">Имя Пользователя</div>
        <div className="chat-item__message">
          Последнее сообщение, которое может быть очень длинным, поэтому оно
          обрежется...
        </div>
      </div>

      <div className="chat-item__unread-dot" />
    </button>
  );
};
