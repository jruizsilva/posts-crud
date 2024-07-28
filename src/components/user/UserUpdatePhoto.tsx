import {
  Fieldset,
  Stack,
  Center,
  Avatar,
  SimpleGrid,
  FileInput,
  Button,
  Text,
} from "@mantine/core";
import { User } from "../../types/user";
import { useState, useEffect } from "react";
import { useUserUploadImage } from "../../hooks/user/useUserUploadImage";
import { useUserDeleteImageUploaded } from "../../hooks/user/useUserDeleteImageUploaded";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

interface Props {
  user: User;
}

export default function UserUpdatePhoto({ user }: Props): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const { uploadUserImage } = useUserUploadImage();
  const { deleteImageUploaded } = useUserDeleteImageUploaded();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleUpdatePhoto = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadUserImage(formData, {
        onSuccess: () => setFile(null),
        onError: () => setFile(null),
      });
    }
  };

  const imageToShow: string = previewUrl ? previewUrl.toString() : user.image;

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Eliminar foto subida",
      centered: true,
      children: (
        <Text size="sm">
          ¿Estás seguro de que quieres eliminar la foto de perfil? <br />
          Esta acción no se puede deshacer.
        </Text>
      ),
      labels: { confirm: "Eliminar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteImageUploaded();
        notifications.show({
          id: user.id.toString(),
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
      <Fieldset legend="Foto de perfíl">
        <Stack h={"100%"}>
          <Center flex={1}>
            <Avatar size={"xl"} src={imageToShow} />
          </Center>
          <SimpleGrid cols={user.image ? 2 : 1}>
            <FileInput
              value={file}
              onChange={setFile}
              clearable
              placeholder="Selecciona una imagen"
            />
            {user.image && (
              <Button variant="subtle" color={"red"} onClick={openDeleteModal}>
                Eliminar imagen
              </Button>
            )}
          </SimpleGrid>
          <Button disabled={!file} onClick={handleUpdatePhoto}>
            Subir imagen
          </Button>
        </Stack>
      </Fieldset>
    </>
  );
}
