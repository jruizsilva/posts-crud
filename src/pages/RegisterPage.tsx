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
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useUserCreateMutation } from "../hooks/user/useUserCreateMutation";
import { useForm, yupResolver } from "@mantine/form";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(4, "Minimo 4 caracteres")
    .required("La contraseña es requerida"),
});

interface Props {}

export default function RegisterPage(_props: Props): JSX.Element {
  const { createUser, isPending } = useUserCreateMutation();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  return (
    <>
      <Center h={"100vh"}>
        <Stack gap={20}>
          <Stack gap={5}>
            <Title ta="center">Crear cuenta</Title>
            <Text c="dimmed" size="sm" ta="center">
              ¿Ya tienes una cuenta?{" "}
              <Anchor size="sm" component={NavLink} to={"/login"}>
                Inicia sesión
              </Anchor>
            </Text>
          </Stack>
          <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
                createUser(values);
              })}
            >
              <Stack>
                <TextInput
                  label="Nombre"
                  placeholder="John Doe"
                  withAsterisk
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Correo"
                  placeholder="you@mantine.dev"
                  withAsterisk
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Contraseña"
                  placeholder="Tu contraseña"
                  withAsterisk
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
                <Button type="submit" fullWidth loading={isPending}>
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
