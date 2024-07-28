import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { CheckIcon } from "@mantine/core";
import { User, UserEditRequest } from "../../types/user";
import { fetchEditUser } from "../../services/user";
import { useAppStore } from "../../store/useAppStore";

export const useUserEditMutation = (userId: number) => {
  const mutationKey = ["user-edit"];
  const queryClient = useQueryClient();
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  );

  const { mutate: editUser, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (userEditRequest: UserEditRequest) => {
      return await fetchEditUser(userId, userEditRequest);
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["/users"] });
      setUserAuthenticated(user);
      notifications.show({
        title: "Exito!",
        message: "Actualizado correctamente",
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
        icon: <CheckIcon size={"15"} />,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Error al editar user";
      notifications.show({
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { editUser, ...rest };
};
