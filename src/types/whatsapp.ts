export interface IChat {
  name: string;
  isGroup: boolean;
  chatId: string;
  unreadCount: number;
  timestamp: number;
}

export interface IMessage {
  sessionId: string;
  chatId: string;
  messageId: string;
  fromMe: boolean;
  senderId?: string | null;
  messageType?: string | null;
  text?: string | null;
  caption?: string | null;
  mediaPath?: string | null;
  timestamp: bigint;
}

export interface IWhatsappWebhookMessage {
  name: string;
  sessionId: string;
  chatId: string;
  messageId: string;
  fromMe: boolean;
  senderId: string;
  messageType: string;
  text: string;
  caption: string;
  mediaPath: string | null;
  timestamp: string;
  msg?: any;
}

export interface Coordinates {
  lat: string;
  long: string;
  address: string;
  urlId? : string
}
