import { ChatItem } from "../components/chatItem/ChatItem";
import { ChatItemType } from "../components/chatItem/chatItemType";
import { useGetChatsQuery } from "../api/chatApi";
import { useGetMatchesDataQuery } from "../api/usersApi";
import { useMemo } from "react";

interface PartnerData {
  chat: ChatItemType;
  partnerAvatar: string;
  partnerName: string;
  partnerId: string;
}

export const ListOfChats = () => {
  const {
    data: chats = [],
    isLoading: isChatsLoading,
    error: chatsError,
  } = useGetChatsQuery(undefined, {
    pollingInterval: 20000, // 20 секунд
  });

  const {
    data: matches = [],
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useGetMatchesDataQuery();

  const myId = localStorage.getItem("myId");

  const fullChatInfoList: PartnerData[] = useMemo(() => {
    if (!chats || !matches || !myId) return [];

    return chats
      .map((chat) => {
        // Находим ID собеседника
        const partnerId = chat.participantIds.find((id) => id !== myId);
        if (!partnerId) return null;

        // Находим данные пользователя по partnerId
        const user = matches.find((m) => m.userId === partnerId);
        if (!user) return null;

        return {
          chat: {
            ...chat,
            lastMessage: {
              ...chat.lastMessage,
              text: chat.lastMessage?.text ?? "",
            },
          },
          partnerAvatar: user.avatarUrl,
          partnerName: user.name,
          partnerId: partnerId,
        };
      })
      .filter(Boolean) as PartnerData[];
  }, [chats, matches, myId]);

  if (isChatsLoading || isMatchesLoading) return <div>Загрузка...</div>;
  if (chatsError || matchesError)
    return <div>Произошла ошибка при загрузке данных</div>;
  console.log(fullChatInfoList);
  return (
    <main className="content">
      <div className="content-inner">
        <div className="header-chat-and-Matches">Vibe</div>

        {fullChatInfoList.map((chat, index) => {
          return (
            <ChatItem
              key={index}
              chatId={chat.chat.id}
              name={chat.partnerName}
              avatar={chat.partnerAvatar}
              isOnline={true}
              lastMessage={chat.chat.lastMessage.text}
              partnerId={chat.partnerId}
            />
          );
        })}
      </div>
    </main>
  );
};
