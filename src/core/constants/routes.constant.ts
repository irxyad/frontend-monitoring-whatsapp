const PARENT_MESSAGING = '/messaging';

const MESSAGING = {
  PARENT: PARENT_MESSAGING,
  SEND_MESSAGE: PARENT_MESSAGING + '/' + 'send-message',
  LIST_MESSAGING: PARENT_MESSAGING + '/' + 'list-messaging',
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MESSAGING: MESSAGING,
  CONTACTS: '/contacts',
  PROFILE: '/profile',
} as const;
