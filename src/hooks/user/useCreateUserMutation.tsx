import { useMutation } from "@tanstack/react-query";
import { User, UserRequest } from "../../types/user";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { fetchCreateUser } from "../../services/user";

export const useCreateUserMutation = () => {
  const mutationKey = ["create-user"];

  const { mutate: createUser, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (userRequest: UserRequest) => {
      return fetchCreateUser(userRequest);
    },

    onSuccess: (user: User) => {
      notifications.show({
        title: "Usuario creado",
        message: `El usuario ${user.name} ha sido creado`,
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Error al crear usuario";
      notifications.show({
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { createUser, ...rest };
};
