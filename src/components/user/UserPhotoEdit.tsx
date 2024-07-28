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

interface Props {
  user: User;
}

export default function UserPhotoEdit(_props: Props): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );

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

  return (
    <>
      <Fieldset legend="Foto de perfíl">
        <Stack h={"100%"}>
          <Center flex={1}>
            <Avatar size={"xl"} src={previewUrl as string} />
          </Center>
          <SimpleGrid cols={2}>
            <FileInput
              value={file}
              onChange={setFile}
              clearable
              placeholder="Selecciona una imagen"
            />
            <Button variant="subtle" color={"red"}>
              Eliminar imagen
            </Button>
          </SimpleGrid>
          <Button type="submit">Subir imagen</Button>
        </Stack>
      </Fieldset>
    </>
  );
}
