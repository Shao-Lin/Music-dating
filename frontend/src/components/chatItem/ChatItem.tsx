import { CustomAvatar } from "../UI/avatar/CustomAvatar";
<<<<<<< HEAD
import testAvatar from "../../assets/testAvatar.png";
export const ChatItem = () => {
  return (
    <button className="chat-item">
      <div className="chat-item__avatar">
        <CustomAvatar avatar={testAvatar} online={true} size={60} />
=======
import type { ChatItemPropsType } from "./chatItemType";
export const ChatItem = ({
  name,
  avatar,
  isOnline,
  lastMessage,
}: ChatItemPropsType) => {
  return (
    <button className="chat-item">
      <div className="chat-item__avatar">
        <CustomAvatar avatar={avatar} online={isOnline} size={55} />
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
      </div>

      <div className="chat-item__content">
        <div className="chat-item__name">{name}</div>
        <div className="chat-item__message">{lastMessage}</div>
      </div>

      <div className="chat-item__unread-dot" />
    </button>
  );
};
