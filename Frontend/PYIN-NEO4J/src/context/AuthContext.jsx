// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await api('/me');
        setCurrentUser(me || null);
      } catch {
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    })();
  }, []);

  const value = { currentUser, setCurrentUser, authLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

