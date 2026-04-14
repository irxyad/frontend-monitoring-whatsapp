import { AppConstants } from '@/core/constants/app.constant';
import ActiveSession from '../../domain/types/active-session.type';

export const SessionLocal = {
  get: (): ActiveSession | null => {
    try {
      const raw = localStorage.getItem(AppConstants.SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set: (session: ActiveSession) => {
    localStorage.setItem(AppConstants.SESSION_KEY, JSON.stringify(session));
  },

  update: (data: Partial<ActiveSession>) => {
    const current = SessionLocal.get() || ({} as ActiveSession);
    const updated = { ...current, ...data };
    SessionLocal.set(updated);
    return updated;
  },

  clear: () => {
    localStorage.removeItem(AppConstants.SESSION_KEY);
  },
};
