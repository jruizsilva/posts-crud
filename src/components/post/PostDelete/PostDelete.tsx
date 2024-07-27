import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { usePostDeleteMutation } from "../../../hooks/post/usePostDeleteMutation";
import { useParams } from "react-router-dom";
import { Post } from "../../../types/post";

interface Props {
  post: Post;
}

export default function PostDelete({ post }: Props): JSX.Element {
  const { deletePost } = usePostDeleteMutation(post.id);
  const params = useParams();
  const postId = params.id as string;

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Eliminar la publicación",
      centered: true,
      children: (
        <Text size="sm">
          ¿Estás seguro de que quieres eliminar la publicación? <br />
          Esta acción no se puede deshacer.
        </Text>
      ),
      labels: { confirm: "Eliminar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deletePost();
        notifications.show({
          id: postId,
          loading: true,
          title: "Eliminando...",
          message: "",
          autoClose: false,
          withCloseButton: false,
        });
      },
    });
  return (
    <>
      <Button
        radius={"xl"}
        variant="subtle"
        color="red"
        leftSection={<IconTrash />}
        onClick={openDeleteModal}
      >
        Eliminar
      </Button>
    </>
  );
}
