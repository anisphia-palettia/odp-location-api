export interface IMessage {
    id: string;
    from: string;
    to: string;
    body: string;
    type: string;
    timestamp: number;
    isFromMe: boolean;
    mediaUrl: string | null;
    mediaType?: string | null;
}

export interface IChat {
    name: string;
    isGroup: boolean
    chatId: string;
    unreadCount: number;
    timestamp: number;
}