import { ChatItem } from "../components/chatItem/ChatItem";
import testAvatar from "../assets/testAvatar.png";
import type { MessageType } from "../components/UI/message/messageType";
import { ChatItemType } from "../components/chatItem/chatItemType";

export const ListOfChats = () => {
  const message: MessageType = {
    senderId: 1,
    text: "Последнее сообщение, которое может быть очень длинным, поэтому оно обрежется...",
    image: null,
  };

  const messages = [message, message, message];

  const chatItem: ChatItemType = {
    name: "Анастасия",
    avatar: testAvatar,
    isOnline: true,
    messages,
  };

  const chatData = [
    chatItem,
    chatItem,
    chatItem,
    chatItem,
    chatItem,
    chatItem,
    chatItem,
    chatItem,
    chatItem,
  ];

  return (
    <main className="content">
      <div className="content-inner">
        <div className="header-chat-and-Matches">Vibe</div>

        {chatData.map((chat, index) => {
          const lastMessage = chat.messages[chat.messages.length - 1];

          const lastMessageText = lastMessage
            ? lastMessage.image
              ? "Фото"
              : lastMessage.text
            : "";

          return (
            <ChatItem
              key={index}
              name={chat.name}
              avatar={chat.avatar}
              isOnline={chat.isOnline}
              lastMessage={lastMessageText}
            />
          );
        })}
      </div>
    </main>
  );
};
