import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { CheckIcon } from "@mantine/core";
import { User } from "../../types/user";
import { fetchUploadUserPhoto } from "../../services/user";
import { useAppStore } from "../../store/useAppStore";

export const useUserUploadImage = () => {
  const mutationKey = ["user-upload-image"];
  const queryClient = useQueryClient();
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  );

  const { mutate: uploadUserImage, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (formData: FormData) => {
      return await fetchUploadUserPhoto(formData);
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

  return { uploadUserImage, ...rest };
};
