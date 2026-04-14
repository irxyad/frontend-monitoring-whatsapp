const StatisticDashboard = {
  ALL: ['statistic-dashboard'],
  CHATS: ['statistic-dashboard', 'chats'],
  CONTACTS: ['statistic-dashboard', 'contacts'],
  DEVICES: ['statistic-dashboard', 'devices'],
};

export const QueryKey = {
  SESSIONS: ['sessions'],
  QR: ['qr'],
  STATISTIC_DASHBOARD: StatisticDashboard,
  CHATS: ['chats'],
  CONTACTS: ['contacts'],
  PROFILE_IMAGE: ['profile-image'],
} as const;
