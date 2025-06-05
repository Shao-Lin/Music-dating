import { ChatItem } from "../components/chatItem/ChatItem";
import { ChatItemType } from "../components/chatItem/chatItemType";
import { useGetChatsQuery } from "../api/chatApi";
import { useGetMatchesDataQuery } from "../api/usersApi";

// Интерфейс для данных о партнере в чате
interface PartnerData {
  chat: ChatItemType;
  partnerAvatar: string;
  partnerName: string;
  partnerId: string;
}

export const ListOfChats = () => {
  // Получение данных чатов с помощью RTK Query
  const {
    data: chats = [],
    isLoading: isChatsLoading,
    error: chatsError,
  } = useGetChatsQuery(undefined, {
    pollingInterval: 20000, // Обновление каждые 20 секунд
  });

  // Получение данных мэтчей
  const {
    data: matches = [],
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useGetMatchesDataQuery();

  // Получение ID текущего пользователя из localStorage
  const myId = localStorage.getItem("myId");

  // Проверка: если myId отсутствует
  if (!myId) {
    return <div>Пожалуйста, войдите, чтобы просмотреть ваши чаты.</div>;
  }

  // Проверка: если данные еще загружаются
  if (isChatsLoading || isMatchesLoading) {
    return <div>Загрузка...</div>;
  }

  // Проверка: если произошла ошибка при загрузке данных
  if (chatsError || matchesError) {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  // Формирование списка чатов с информацией о партнерах
  const fullChatInfoList: PartnerData[] = chats
    .map((chat) => {
      // Поиск ID партнера (исключаем собственный ID)
      const partnerId = chat.participantIds.find((id) => id !== myId);
      if (!partnerId) return null;

      // Поиск данных пользователя в списке мэтчей
      const user = matches.find((m) => m.userId === partnerId);
      if (!user) return null;

      return {
        chat: {
          ...chat,
          lastMessage: {
            ...chat.lastMessage,
            text: chat.lastMessage?.text ?? "", // Если текста нет, используется пустая строка
          },
        },
        partnerAvatar: user.avatarUrl,
        partnerName: user.name,
        partnerId: partnerId,
      };
    })
    .filter(Boolean) as PartnerData[];

  // Проверка: если список чатов пуст
  if (fullChatInfoList.length === 0) {
    return <div>Нет доступных чатов.</div>;
  }

  // Рендеринг списка чатов
  return (
    <main className="content">
      <div className="content-inner">
        <div className="header-chat-and-Matches">Vibe</div>
        {fullChatInfoList.map(
          ({ chat, partnerName, partnerAvatar, partnerId }) => (
            <ChatItem
              key={chat.id} // Уникальный ключ для каждого чата
              chatId={chat.id}
              name={partnerName}
              avatar={partnerAvatar}
              isOnline={true} // Пока захардкоджено, можно доработать
              lastMessage={chat.lastMessage.text}
              partnerId={partnerId}
            />
          )
        )}
      </div>
    </main>
  );
};
