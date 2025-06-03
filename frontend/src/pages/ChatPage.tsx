import { useEffect, useState, useRef, UIEvent, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { Client, IMessage } from "@stomp/stompjs";
import { useGetMatchesDataQuery } from "../api/usersApi";
import { useGetMessagesQuery } from "../api/chatApi";
import type { Message } from "../components/chatItem/chatItemType";
import { ChatHeader } from "../components/chatHeader/ChatHeader";
import { ChatMain } from "../components/chatMain/ChatMain";
import { ChatFooter } from "../components/chatFooter/ChatFooter";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const PAGE_SIZE = 20;

  // текущая страница истории (0 — первые 20, 1 — следующие 20 и т.д.)
  const [page, setPage] = useState(0);
  // весь массив сообщений, который рендерим (история + WS)
  const [messages, setMessages] = useState<Message[]>([]);
  // признак, что ещё есть страницы
  const [hasMore, setHasMore] = useState(true);

  // RTK Query для истории
  const { data: historyResponse, isFetching: isHistoryFetching } =
    useGetMessagesQuery(
      { chatId: chatId!, page, size: PAGE_SIZE },
      { skip: !chatId }
    );

  // Хуки для WS и партнера (без изменений)
  const { data: matches = [] } = useGetMatchesDataQuery();
  const partnerId = localStorage.getItem("partnerId");
  const partner = matches.find((m) => m.userId === partnerId);
  const stompClient = useRef<Client | null>(null);

  // ref на контейнер с сообщениями для отслеживания скролла и подстройки позиции
  const mainRef = useRef<HTMLDivElement>(null);
  // для корректировки позиции после prepend
  const prevScrollHeight = useRef(0);

  // 1) При получении новой страницы истории — добавляем в массив:
  useEffect(() => {
    if (!historyResponse) return;

    const newMsgs = historyResponse.content;
    // первая страница — полностью заменяем,
    // последующие — добавляем в начало
    setMessages((prev) => (page === 0 ? newMsgs : [...newMsgs, ...prev]));
    setHasMore(page < historyResponse.totalPages - 1);
  }, [historyResponse, page]);

  // 2) Поддерживаем корректный скролл при prepend
  useLayoutEffect(() => {
    if (page === 0) {
      // при первой загрузке — скроллим вниз
      mainRef.current?.scrollTo(0, mainRef.current.scrollHeight);
    } else {
      // при подгрузке старых сообщений — сохраняем позицию
      if (mainRef.current) {
        const diff = mainRef.current.scrollHeight - prevScrollHeight.current;
        mainRef.current.scrollTop = diff;
      }
    }
  }, [messages, page]);

  // 3) Хэндлер скролла вверх
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop === 0 && hasMore && !isHistoryFetching) {
      // сохраняем текущее scrollHeight перед подгрузкой страницы
      if (mainRef.current) {
        prevScrollHeight.current = mainRef.current.scrollHeight;
      }
      setPage((p) => p + 1);
    }
  };

  // 4) Настройка STOMP-WebSocket (новые сообщения в конец)
  useEffect(() => {
    if (!chatId) return;
    const client = new Client({
      brokerURL:
        window.location.protocol === "https:"
          ? "wss://localhost:8088/connect-chat"
          : "ws://localhost:8088/connect-chat",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/chat/${chatId}`, (msg: IMessage) => {
        const newMsg: Message = JSON.parse(msg.body);
        setMessages((prev) => [newMsg, ...prev]);
        // автоскролл вниз при приходе новых:
        mainRef.current?.scrollTo(0, mainRef.current.scrollHeight);
      });
    };
    client.activate();
    stompClient.current = client;
    return () => {
      stompClient.current?.deactivate();
    };
  }, [chatId]);

  if (!chatId) return <div>Чат не выбран</div>;
  console.log(messages);

  return (
    <div className="chat-page">
      {partner && (
        <ChatHeader
          name={partner.name}
          avatarUrl={partner.avatarUrl}
          isOnline={true}
        />
      )}

      {/* контейнер сообщений с infinite-scroll */}
      <div
        ref={mainRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatMain messages={messages} />
        {isHistoryFetching && page > 0 && (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            Загрузка истории...
          </div>
        )}
      </div>

      <ChatFooter chatId={chatId} />
    </div>
  );
};
