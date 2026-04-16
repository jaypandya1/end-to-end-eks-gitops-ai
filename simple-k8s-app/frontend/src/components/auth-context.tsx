"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (rawApiUrl || (import.meta.env.DEV ? "http://localhost:3001" : "")).replace(/\/+$/, "");

const apiPath = (path: string) => `${API_URL}${path}`;

interface User {
  id: number;
  name: string;
  email: string;
  fitnessGoals: string[];
  level: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearAuthData = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        console.error("Invalid token format found in localStorage");
        clearAuthData();
        setLoading(false);
        return;
      }

      fetch(apiPath("/api/auth/verify"), {
        headers: {
          "x-auth-token": token.trim(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            clearAuthData();
          }
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
          clearAuthData();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(apiPath("/api/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    if (data.token) {
      const tokenParts = data.token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format received from server");
      }
      localStorage.setItem("token", data.token.trim());
      setUser(data.user);
    } else {
      throw new Error("No token received from server");
    }
  };

  const register = async (userData: any) => {
    const response = await fetch(apiPath("/api/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    if (data.token) {
      const tokenParts = data.token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format received from server");
      }
      localStorage.setItem("token", data.token.trim());
      setUser(data.user);
    } else {
      throw new Error("No token received from server");
    }
  };

  const logout = () => {
    clearAuthData();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}