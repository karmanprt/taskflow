import { useState } from "react";
import AuthContext from "./AuthContext";

// AuthProvider manages authentication state
export function AuthProvider({ children }) {
  // Restore the user information from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      // If saved user data is invalid, start with null
      return null;
    }
  });

  // Restore the JWT from localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Save authentication information after successful login
  const login = (data) => {
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  // Clear authentication information during logout
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Share authentication information with child components
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
