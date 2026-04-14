export type GetQRResult = {
  success: boolean;
  qr: string;
  message?: string;
};

export type StartSessionResult = {
  success: boolean;
  message: string;
};

export type GetSessionsResult = {
  success: boolean;
  result: string[];
  raw: string[];
};

export type GetSessionStatusResult = {
  success: boolean;
  state: string | null;
  message: string;
};
