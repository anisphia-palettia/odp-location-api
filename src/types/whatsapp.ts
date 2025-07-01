export interface IChat {
    name: string;
    isGroup: boolean
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