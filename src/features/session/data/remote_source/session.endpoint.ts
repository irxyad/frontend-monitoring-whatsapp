export const SESSION_ENDPOINTS = {
  START: 'session/start/:sessionId',
  STOP: 'session/stop/:sessionId',
  RESTART: 'session/restart/:sessionId',
  TERMINATE: 'session/terminate/:sessionId',
  STATUS: 'session/status/:sessionId',
  LIST: 'session/getSessions',
  QRCODE: 'session/qr/:sessionId',
} as const;
