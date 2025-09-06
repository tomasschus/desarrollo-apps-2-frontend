import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
  OPERATOR: "operator",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
}

interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  role: UserRoleType | null;
  isAdmin: boolean;
  isOperator: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setRole: (role: UserRoleType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    value: storedUser,
    setValue: setStoredUser,
    removeValue: removeStoredUser,
  } = useLocalStorage<User | null>("auth_user", null);
  const { value: storedIsLogged, setValue: setStoredIsLogged } =
    useLocalStorage<boolean>("auth_isLogged", false);

  const [user, setUser] = useState<User | null>(storedUser);
  const [isLogged, setIsLogged] = useState<boolean>(storedIsLogged);

  const login = (userData: User) => {
    setUser(userData);
    setIsLogged(true);
    setStoredUser(userData);
    setStoredIsLogged(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    removeStoredUser();
    setStoredIsLogged(false);
  };

  const setRole = (role: UserRoleType) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setStoredUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    isLogged,
    user,
    role: user?.role || null,
    isAdmin: user?.role === UserRole.ADMIN,
    isOperator: user?.role === UserRole.OPERATOR,
    login,
    logout,
    setRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
