export interface ClassInfoClient {
  success: boolean;
  sessionInfo: SessionInfo;
}

export interface SessionInfo {
  pushname: string;
  wid: Me;
  me: Me;
  platform: string;
}

export interface Me {
  server: string;
  user: string;
  _serialized: string;
}

export interface TotalDevice {
  success: boolean;
  result: number;
}
