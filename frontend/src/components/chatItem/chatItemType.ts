export type ChatItemType = {
  id: string;
  participantIds: string[];
  lastMessage: {
    id: string;
    text: string | null;
    createdAt: Date | null;
  };
  updatedAt: Date | null;
};

export type ChatItemPropsType = {
  name: string;
  chatId: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string | null;
  partnerId: string;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  mediaUrls: string[];
  createdAt: string; // или Date, если вы будете парсить
};

export type ChatMessageResponse = {
  content: Message[];
  totalPages: number;
  totalItems: number;
  page: number;
  size: number;
};

export type PartnerInfo = {
  name: string;
  avatarUrl: string;
  isOnline: boolean;
};
