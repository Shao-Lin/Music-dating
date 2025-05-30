import { useAppDispatch } from "../../hooks/reduxHook";
import { setPartnerId } from "../../slices/userData";
import { CustomAvatar } from "../UI/avatar/CustomAvatar";
import type { ChatItemPropsType } from "./chatItemType";
import { useNavigate } from "react-router";
export const ChatItem = ({
  name,
  chatId,
  avatar,
  isOnline,
  lastMessage,
  partnerId,
}: ChatItemPropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setPartnerId({ partnerId }));
    localStorage.setItem("partnerId", partnerId);
    navigate(`/chat/${chatId}`);
  };
  return (
    <button onClick={handleClick} className="chat-item">
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
