import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Post } from "../../types/post";
import { fetchDeletePost } from "../../services/post";
import { useNavigate, useParams } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

export const usePostDeleteMutation = () => {
  const mutationKey = ["post-delete"];
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id as string;

  const { mutate: deletePost, ...rest } = useMutation({
    mutationKey,
    mutationFn: async () => {
      return await fetchDeletePost(postId);
    },
    onSuccess: () => {
      notifications.update({
        id: postId,
        withCloseButton: true,
        color: "green",
        title: "Exito!",
        message: "Eliminado correctamente",
        loading: false,
        autoClose: 2000,
        icon: <IconCheck size={20} />,
      });
      queryClient.setQueryData(["/posts"], (oldPosts: Post[]) => {
        return oldPosts.filter((post) => post.id != Number(postId));
      });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Error al crear posts";
      notifications.show({
        id: postId,
        title: message,
        message: "",
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    },
  });

  return { deletePost, ...rest };
};
