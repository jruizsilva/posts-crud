import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../../services/auth";
import { LoginRequest, LoginResponse } from "../../types/auth";
import { notifications } from "@mantine/notifications";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAppStore } from "../../store/useAppStore";

export const useLoginMutation = () => {
  const mutationKey = ["login"];
  const location = useLocation();
  const navigate = useNavigate();
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  );

  const { mutate: login, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (loginRequest: LoginRequest) => {
      return fetchLogin(loginRequest);
    },
    onSuccess: ({ token, user }: LoginResponse) => {
      localStorage.setItem("AUTH_TOKEN", token);
      setUserAuthenticated(user);
      navigate(location.state?.previousUrl ?? "/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      notifications.show({
        title: message,
        message: "El correo o la contraseña no es correcto",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { login, ...rest };
};
