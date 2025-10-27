import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginByIdu,
  loginByName,
  registerUser,
  logout,
  getUsers,
} from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
    setUsers(getUsers());
  }, []);

  const actions = {
    loginByIdu: async (idu) => {
      const u = loginByIdu(idu);
      setUser(u);
      setUsers(getUsers());
      return u;
    },
    loginByName: async (nombre) => {
      const u = loginByName(nombre);
      setUser(u);
      setUsers(getUsers());
      return u;
    },
    register: async (nombre) => {
      const u = registerUser(nombre);
      setUser(u);
      setUsers(getUsers());
      return u;
    },
    logout: () => {
      logout();
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={{ user, users, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
