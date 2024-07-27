import {
  Avatar,
  Button,
  Center,
  Fieldset,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function AccountPage(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  return (
    <>
      <Stack>
        <Title fw={500}>Mi cuenta</Title>
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
          <Fieldset legend="Información personal">
            <Stack gap={"xs"}>
              <TextInput
                label="Nombre"
                placeholder="Nombre"
                defaultValue={userAuthenticated?.name}
              />
              <TextInput
                label="Correo"
                placeholder="Correo"
                disabled
                value={userAuthenticated?.email}
              />
            </Stack>
            <Button type="submit" mt={"md"}>
              Guardar cambios
            </Button>
          </Fieldset>
          <Fieldset legend="Avatar">
            <Stack h={"100%"}>
              <Center flex={1}>
                <Avatar size={"xl"} />
              </Center>
              <Button type="submit">Cambiar avatar</Button>
            </Stack>
          </Fieldset>
        </SimpleGrid>
      </Stack>
    </>
  );
}
