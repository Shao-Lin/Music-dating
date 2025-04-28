import React, { useEffect, useRef } from "react";
import { Message } from "../UI/message/Message";
import type { MessageType } from "../UI/message/messageType";

interface ChatMainProps {
  messages: MessageType[];
}

export const ChatMain: React.FC<ChatMainProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Автоматическая прокрутка вниз при новом сообщении
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-main" ref={chatContainerRef}>
      {messages
        .slice()
        .reverse()
        .map((message, index) => {
          const nextMessage = messages[index + 1];
          const isSameSender =
            nextMessage && nextMessage.senderId === message.senderId;

          return (
            <Message
              key={index}
              message={message}
              isSameSender={Boolean(isSameSender)}
            />
          );
        })}
    </div>
  );
};
