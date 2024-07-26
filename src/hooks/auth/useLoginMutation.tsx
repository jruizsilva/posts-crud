import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../../services/auth";
import { LoginRequest, LoginResponse } from "../../types/auth";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const useLoginMutation = () => {
  const mutationKey = ["login"];

  const { mutate: login, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (loginRequest: LoginRequest) => {
      return fetchLogin(loginRequest);
    },

    onSuccess: ({ token }: LoginResponse) => {
      localStorage.setItem("AUTH_TOKEN", token);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      notifications.show({
        title: message,
        message: "El correo o la contraseña no es correcto",
        autoClose: false,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { login, ...rest };
};
