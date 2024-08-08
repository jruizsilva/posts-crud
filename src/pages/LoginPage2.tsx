import {
  TextInput,
  PasswordInput,
  Anchor,
  Title,
  Text,
  Button,
  Center,
  Card,
  Stack,
} from "@mantine/core";

export default function LoginPage2() {
  return (
    <Center h={"100vh"}>
      <Stack gap={"lg"}>
        <Stack gap={5}>
          <Title ta="center">Iniciar sesión</Title>
          <Text c="dimmed" size="sm" ta="center">
            ¿No tienes una cuenta todavia?{" "}
            <Anchor size="sm">Crear cuenta</Anchor>
          </Text>
        </Stack>
        <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
          <form>
            <Stack>
              <TextInput
                label="Correo"
                withAsterisk
                placeholder="you@mantine.dev"
              />
              <PasswordInput
                label="Contraseña"
                withAsterisk
                placeholder="Tu contraseña"
              />
              <Button type="submit" fullWidth>
                Iniciar sesión
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Center>
  );
}
