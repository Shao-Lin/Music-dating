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
import { boolean, string } from "yup";

export const ChatPage = () => {
  // const { data } = useGetDataMatchQuery();
  const data = { Анастасия: string, defaultAvatar, false: boolean };
  const headerData: HeaderType | undefined = data
    ? {
        name: data.name ?? "Гость",
        avatar: data.avatar ?? defaultAvatar,
        isOnline: data.isOnline ?? false,
      }
    : undefined;
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
    senderId: 111,

    text: "Привет",
    image: fakeImageFile,
  };
  const message2: MessageType = {
    senderId: 112,

    text: "дарова",
    image: null,
  };
  const message3: MessageType = {
    senderId: 111,

    text: "Всё переплетено. Море нитей, но Потяни за нить, за ней потянется клубок Этот мир - веретено, совпадений ноль Нитью быть или струной, или для битвы тетивой.",
    image: null,
  };

  const arrMessage = [
    message1,
    message2,
    message3,
    message3,
    message3,
    message3,
    message3,
    message3,
    message2,
  ];
  return (
    <div className="chat">
      {/* {headerData && <ChatHeader {...headerData} />} */}
      <ChatHeader {...headerData} />

      <ChatMain messages={arrMessage} />
      <ChatFooter />
    </div>
  );
};
