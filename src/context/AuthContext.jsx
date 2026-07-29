import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'thcs_mock_auth';

const AuthContext = createContext(null);

function readStoredUser() {
  const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedAuth) return null;

  try {
    const parsedAuth = JSON.parse(storedAuth);
    return parsedAuth?.user?.name ? parsedAuth.user : null;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [user]);

  const value = useMemo(() => ({
    user,
    isLoggedIn: Boolean(user),
    login({ name }) {
      const displayName = name?.trim();
      if (!displayName) return;

      setUser({ name: displayName });
    },
    logout() {
      setUser(null);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
