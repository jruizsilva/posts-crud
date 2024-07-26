import { useEffect, useState } from "react";
import { fetchMe } from "../services/auth";
import { useAppStore } from "../store/useAppStore";

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  );

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) {
      setUserAuthenticated(null);
      setIsAuthenticating(false);
    }
    fetchMe()
      .then((user) => {
        setUserAuthenticated(user);
      })
      .catch(() => {
        setUserAuthenticated(null);
        localStorage.removeItem("AUTH_TOKEN");
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  }, []);

  return { isAuthenticating };
};
