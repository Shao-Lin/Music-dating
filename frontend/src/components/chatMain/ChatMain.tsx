import { useEffect, useRef } from "react";
import type { MessageType } from "../UI/message/messageType";
import { Message } from "../UI/message/Message";

interface ChatMainProps {
  messages: MessageType[];
}

export const ChatMain = ({ messages }: ChatMainProps) => {
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
      {messages.map((message, index) => {
        const nextMessage = messages[index + 1];
        const isSameSender =
          nextMessage && nextMessage.senderId === message.senderId;

        return (
          <Message
            key={message.id}
            message={message}
            isSameSender={Boolean(isSameSender)}
          />
        );
      })}
    </div>
  );
};
