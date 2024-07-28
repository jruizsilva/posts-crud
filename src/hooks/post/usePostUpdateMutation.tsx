import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Post, PostRequest } from "../../types/post";
import { fetchUpdatePost } from "../../services/post";
import { CheckIcon } from "@mantine/core";

export const usePostUpdateMutation = (postId: number) => {
  const mutationKey = ["post-update"];
  const queryClient = useQueryClient();

  const { mutate: updatePost, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (post: PostRequest) => {
      return await fetchUpdatePost(postId, post);
    },
    onSuccess: (post: Post) => {
      const queryKey = ["/posts", postId];
      queryClient.setQueryData(queryKey, post);
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
      console.log("error");
      const message = error.response?.data?.message || "Error al editar post";
      notifications.show({
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { updatePost, ...rest };
};
