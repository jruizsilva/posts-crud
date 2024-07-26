import {
  Center,
  Flex,
  SimpleGrid,
  Title,
  Anchor,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

interface Props {}

export default function RegisterPage(_props: Props): JSX.Element {
  return (
    <>
      <Center h={"100vh"}>
        <Flex direction={"column"} gap={20}>
          <SimpleGrid spacing={5}>
            <Title ta="center">Crear cuenta</Title>
            <Text c="dimmed" size="sm" ta="center">
              ¿Ya tienes una cuenta?{" "}
              <Anchor size="sm" component={NavLink} to={"/login"}>
                Inicia sesión
              </Anchor>
            </Text>
          </SimpleGrid>
          <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
            <SimpleGrid>
              <TextInput label="Nombre" placeholder="John Doe" required />
              <TextInput
                label="Correo"
                placeholder="you@mantine.dev"
                required
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                required
              />
              <Button fullWidth>Crear cuenta</Button>
            </SimpleGrid>
          </Card>
        </Flex>
      </Center>
    </>
  );
}
