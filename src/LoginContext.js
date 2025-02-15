import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "./api";

const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setLogin(decoded);
      } catch (err) {
        handleLogout();
      }
    }
  }, []);

  async function refreshAccessToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return handleLogout();

      const response = await API.post("refresh/", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      setLogin(jwtDecode(newAccessToken));
    } catch (err) {
      handleLogout();
    }
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogin(null);
  }

  return (
    <LoginContext.Provider value={{ login, setLogin, refreshAccessToken, handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext };
export default LoginProvider;
