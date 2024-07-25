interface Props {}
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function PostDelete(_props: Props): JSX.Element {
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
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log("Confirmed");
        const id = notifications.show({
          loading: true,
          title: "Eliminando...",
          message: "",
          autoClose: false,
          withCloseButton: false,
        });
        setTimeout(() => {
          notifications.update({
            id,
            withCloseButton: true,
            color: "green",
            title: "Exito!",
            message: "La publicación fue eliminada exitosamente",
            loading: false,
            autoClose: 2000,
            icon: <IconCheck size={20} />,
          });
        }, 3000);
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
