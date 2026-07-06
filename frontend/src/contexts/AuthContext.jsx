import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("mini_trello_token");
    localStorage.removeItem("mini_trello_user");
    setUser(null);
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem("mini_trello_token", token);
    localStorage.setItem("mini_trello_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const register = useCallback(
    async (name, email, password, role = "member") => {
      const { data } = await authAPI.register(name, email, password, role);
      const { token, user: userData } = data;
      login(token, userData);
      return userData;
    },
    [login],
  );

  // Validate session on mount
  useEffect(() => {
    const token = localStorage.getItem("mini_trello_token");
    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .getProfile()
      .then((res) => {
        // Handle both format formats
        const userData = res.data.user || res.data;
        setUser(userData);
        localStorage.setItem("mini_trello_user", JSON.stringify(userData));
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [logout]);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        register,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
