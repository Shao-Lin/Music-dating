// Message.tsx

//import { useAppSelector } from "../../hooks/reduxHook"; // если у тебя id текущего пользователя в стейте
import type { MessageType } from "./messageType";

interface MessageProps {
  message: MessageType;
  isSameSender: boolean;
}

export const Message = ({ message, isSameSender }: MessageProps) => {
  //const currentUserId = useAppSelector((state) => state.authUsers.id);
  const currentUserId = 111;

  const isOwnMessage = message.senderId === currentUserId;

  return (
    <div
      className={`message ${isOwnMessage ? "message--own" : "message--other"} ${
        isSameSender ? "message--same-sender" : "message--new-sender"
      }`}
    >
      {message.image ? (
        <img
          src={URL.createObjectURL(message.image)}
          alt="sent-img"
          className="message__image"
        />
      ) : (
        <div className="message__text">{message.text}</div>
      )}
    </div>
  );
};
