import { useState } from 'react';
import { SessionLocal } from '../data/local_source/session.local';
import ActiveSession from '../domain/types/active-session.type';

export const useActiveSession = () => {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(() =>
    SessionLocal.get()
  );

  const updateSession = (data: Partial<ActiveSession>) => {
    setActiveSession((prev) => {
      const updated = { ...prev, ...data } as ActiveSession;
      SessionLocal.set(updated);

      return updated;
    });
  };

  const setFullSession = (data: ActiveSession) => {
    SessionLocal.set(data);
    setActiveSession(data);
  };

  const clearSession = () => {
    SessionLocal.clear();
    setActiveSession(null);
  };

  return {
    activeSession,
    updateSession,
    setFullSession,
    clearSession,
  };
};
