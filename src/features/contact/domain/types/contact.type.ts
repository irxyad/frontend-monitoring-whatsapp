export interface ContactInfo {
  id: ID;
  number: string;
  isBusiness: boolean;
  isEnterprise: boolean;
  labels: any[];
  name: string;
  pushname: string;
  shortName: string;
  statusMute: boolean;
  type: string;
  isMe: boolean;
  isUser: boolean;
  isGroup: boolean;
  isWAContact: boolean;
  isMyContact: boolean;
  isBlocked: boolean;
}

export interface ID {
  server: string;
  user: string;
  _serialized: string;
}
