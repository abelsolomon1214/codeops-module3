import { useState } from "react";
import AuthContext from "./AuthContext";

const STORAGE_KEY = "addisEatsUser";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  const login = (email) => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, normalizedEmail);
    setUser(normalizedEmail);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;