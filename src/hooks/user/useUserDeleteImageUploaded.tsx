import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { CheckIcon } from "@mantine/core";
import { User } from "../../types/user";
import { useAppStore } from "../../store/useAppStore";
import { fetchDeleteImageUploaded } from "../../services/user";

export const useUserDeleteImageUploaded = () => {
  const mutationKey = ["user-delete-image-uploaded"];
  const queryClient = useQueryClient();
  const { userAuthenticated, setUserAuthenticated } = useAppStore(
    (store) => store
  );

  const { mutate: deleteImageUploaded, ...rest } = useMutation({
    mutationKey,
    mutationFn: async () => {
      return await fetchDeleteImageUploaded();
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["/users"] });
      setUserAuthenticated(user);
      notifications.update({
        id: userAuthenticated?.id.toString(),
        title: "Exito!",
        message: "Actualizado correctamente",
        autoClose: 5000,
        withCloseButton: true,
        loading: false,
        color: "green",
        icon: <CheckIcon size={"15"} />,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || "Error al actualizar usuario";
      notifications.show({
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { deleteImageUploaded, ...rest };
};
