import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../../services/auth";
import { LoginRequest, LoginResponse } from "../../types/auth";
import { notifications } from "@mantine/notifications";

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
    onError: (error) => {
      console.dir(error);
      notifications.show({
        loading: true,
        title: error.name,
        message: error.message,
        autoClose: false,
        withCloseButton: false,
      });
    },
  });

  return { login, ...rest };
};
