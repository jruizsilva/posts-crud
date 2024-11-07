import {
  Center,
  Title,
  Anchor,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
} from "@mantine/core";

interface Props {}

export default function RegisterPage(_props: Props): JSX.Element {
  return (
    <>
      <Center h={"100vh"}>
        <Stack gap={20}>
          <Stack gap={5}>
            <Title ta="center">Crear cuenta</Title>
            <Text c="dimmed" size="sm" ta="center">
              ¿Ya tienes una cuenta? <Anchor size="sm">Inicia sesión</Anchor>
            </Text>
          </Stack>
          <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
            <form>
              <Stack>
                <TextInput label="Nombre" placeholder="John Doe" withAsterisk />
                <TextInput
                  label="Correo"
                  placeholder="you@mantine.dev"
                  withAsterisk
                />
                <PasswordInput
                  label="Contraseña"
                  placeholder="Tu contraseña"
                  withAsterisk
                />
                <Button type="submit" fullWidth>
                  Crear cuenta
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Center>
    </>
  );
}
