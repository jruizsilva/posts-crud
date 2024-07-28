import {
  Avatar,
  Button,
  Center,
  Fieldset,
  FileInput,
  Loader,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import { useEffect, useState } from "react";
import UserInfoEdit from "../components/user/UserInfoEdit";

interface Props {}

export default function AccountPage(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);
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

  if (!userAuthenticated) return <Loader />;

  return (
    <>
      <Stack>
        <Title fw={500}>Mi cuenta</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <UserInfoEdit user={userAuthenticated} />
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
        </SimpleGrid>
      </Stack>
    </>
  );
}
