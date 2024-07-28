import {
  Fieldset,
  Stack,
  Center,
  Avatar,
  SimpleGrid,
  FileInput,
  Button,
} from "@mantine/core";
import { User } from "../../types/user";
import { useState, useEffect } from "react";
import { useUserUploadImage } from "../../hooks/user/useUserUploadImage";

interface Props {
  user: User;
}

export default function UserUpdatePhoto({ user }: Props): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const { uploadUserImage } = useUserUploadImage();

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
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);
      uploadUserImage(formData);
    }
  };

  const imageToShow: string = previewUrl ? previewUrl.toString() : user.image;

  return (
    <>
      <Fieldset legend="Foto de perfíl">
        <Stack h={"100%"}>
          <Center flex={1}>
            <Avatar size={"xl"} src={imageToShow} />
          </Center>
          <SimpleGrid cols={user.image ? 2 : 1}>
            <FileInput
              onChange={setFile}
              clearable
              placeholder="Selecciona una imagen"
            />
            {user.image && (
              <Button variant="subtle" color={"red"}>
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
