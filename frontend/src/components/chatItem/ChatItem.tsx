import { CustomAvatar } from "../UI/avatar/CustomAvatar";
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
      </div>

      <div className="chat-item__content">
        <div className="chat-item__name">{name}</div>
        <div className="chat-item__message">{lastMessage}</div>
      </div>

      <div className="chat-item__unread-dot" />
    </button>
  );
};
