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
import { useUserUpdateMutation } from "../../hooks/user/useUserUpdateMutation";

interface Props {
  user: User;
}

export default function UserUpdatePhoto({ user }: Props): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const { updateUser } = useUserUpdateMutation(user.id);

  console.log(user);

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
      updateUser(formData);
    }
  };

  return (
    <>
      <Fieldset legend="Foto de perfíl">
        <Stack h={"100%"}>
          <Center flex={1}>
            <Avatar size={"xl"} src={previewUrl as string} />
          </Center>
          <SimpleGrid cols={user.image ? 2 : 1}>
            <FileInput
              value={file}
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
