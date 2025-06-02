import type { MessageType } from "./messageType";

interface MessageProps {
  message: MessageType;
  isSameSender: boolean;
}

export const Message = ({ message, isSameSender }: MessageProps) => {
  const currentUserId = localStorage.getItem("myId");
  const isOwnMessage = message.senderId === currentUserId;

  return (
    <div
      className={`message ${isOwnMessage ? "message--own" : "message--other"} ${
        isSameSender ? "message--same-sender" : "message--new-sender"
      }`}
    >
      {message.mediaUrls &&
        message.mediaUrls.map((url, i) => (
          <img key={i} src={url} alt="sent-img" className="message__image" />
        ))}

      {message.text && <div className="message__text">{message.text}</div>}
    </div>
  );
};
