// messageType.ts
export type MessageType = {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  /** Любой массив URL-ов, может быть пустым */
  mediaUrls: string[];
  createdAt: string;
};
