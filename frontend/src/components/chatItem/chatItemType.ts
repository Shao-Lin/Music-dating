import { MessageType } from "../UI/message/messageType";

export type ChatItemType = {
  name: string;
  avatar: string;
  isOnline: boolean;
  messages: MessageType[];
};

export type ChatItemPropsType = {
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string | null;
};
