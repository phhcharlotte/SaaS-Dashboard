import { useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = () => {
    localStorage.setItem("token", "fake_token");
    setToken("fake_token");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout };
};

export default useAuth;
