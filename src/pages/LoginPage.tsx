import {
  TextInput,
  PasswordInput,
  Anchor,
  Title,
  Text,
  Button,
  Center,
  SimpleGrid,
  Card,
  Flex,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  return (
    <Center h={"100vh"}>
      <Flex direction={"column"} gap={20}>
        <SimpleGrid spacing={5}>
          <Title ta="center">Iniciar sesión</Title>
          <Text c="dimmed" size="sm" ta="center">
            ¿No tienes una cuenta todavia?{" "}
            <Anchor size="sm" component={NavLink} to={"/register"}>
              Crear cuenta
            </Anchor>
          </Text>
        </SimpleGrid>
        <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
          <SimpleGrid>
            <TextInput label="Correo" placeholder="you@mantine.dev" required />
            <PasswordInput
              label="Contraseña"
              placeholder="Tu contraseña"
              required
            />
            <Button fullWidth>Iniciar sesión</Button>
          </SimpleGrid>
        </Card>
      </Flex>
    </Center>
  );
}
