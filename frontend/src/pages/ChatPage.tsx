import { ChatHeader } from "../components/chatHeader/ChatHeader";
import { ChatFooter } from "../components/chatFooter/ChatFooter";
import { ChatMain } from "../components/chatMain/ChatMain";
import type { MessageType } from "../components/UI/message/messageType";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
//import { useGetMessagesQuery } from "../api/messagesApi";
// import { useGetDataMatchQuery } from "../api/matchesApi";
import { HeaderType } from "../components/chatHeader/headerType";
import defaultAvatar from "../assets/testAvatar.png";

export const ChatPage = () => {
  // const { data } = useGetDataMatchQuery();
  const data = { name: "Екатерина", avatar: defaultAvatar, isOnline: true };
  const headerData: HeaderType = {
    name: data?.name ?? "Гость",
    avatar: data?.avatar ?? defaultAvatar,
    isOnline: data?.isOnline ?? false,
  };
  //const { data: messages = [] } = useGetMessagesQuery();
  // const [liveMessages, setLiveMessages] = useState<MessageType[]>([]);

  // useEffect(() => {
  //   const socket = io(window.location.origin);

  //   socket.on("newMessage", (message: MessageType) => {
  //     setLiveMessages((prev) => [...prev, message]);    //СОЕДИНИТЬ live и messages и ПЕРЕДАТЬ В ChatMain
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const fakeImageFile = new File([""], "testImage.png", { type: "image/png" });
  const message1: MessageType = {
    senderId: "111",

    text: "Привет",
    image: null,
  };
  const message2: MessageType = {
    senderId: "112",

    text: "Ты очень красивая",
    image: fakeImageFile,
  };
  const message3: MessageType = {
    senderId: "111",

    text: "Спасибо ты тоже!",
    image: null,
  };

  const message4: MessageType = {
    senderId: "112",

    text: "Какое у тебя любимое приложение?",
    image: null,
  };
  const message5: MessageType = {
    senderId: "111",

    text: "Конечно же Vibe",
    image: null,
  };

  const arrMessage = [message1, message2, message3, message4, message5];
  return (
    <div className="chat">
      {/* {headerData && <ChatHeader {...headerData} />} */}
      <ChatHeader {...headerData} />

      <ChatMain messages={arrMessage} />
      <ChatFooter />
    </div>
  );
};
