export interface ChatMessageInfo {
  name: string;
  isGroup: boolean;
  lastMessage: LastMessage;
}

export interface LastMessage {
  ack: number;
  hasMedia: boolean;
  body: string;
  type: string;
  timestamp: number;
  author: string | undefined;
  from: string;
  to: string;
  fromMe: boolean;
}
