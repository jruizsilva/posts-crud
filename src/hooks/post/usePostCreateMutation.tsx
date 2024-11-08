import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Post, PostRequest } from "../../types/post";
import { fetchCreatePost } from "../../services/post";

export const usePostCreateMutation = () => {
  const mutationKey = ["post-create"];
  const queryClient = useQueryClient();

  const { mutate: createPost, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (post: PostRequest) => {
      return await fetchCreatePost(post);
    },
    onSuccess: (_: Post) => {
      queryClient.invalidateQueries({ queryKey: ["/posts"] });
      notifications.show({
        title: "Publicación creada correctamente",
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const message = error.response?.data?.message || "Error al crear posts";
      notifications.show({
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { createPost, ...rest };
};
