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
import { NavLink, useLocation } from "react-router-dom";
import { useLoginMutation } from "../hooks/auth/useLoginMutation";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es valido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(4, "Minimo 4 caracteres")
    .required("La contraseña es requerida"),
});

export default function LoginPage() {
  const { login, isPending } = useLoginMutation();
  const location = useLocation();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: location.state?.email ?? "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  return (
    <Center h={"100vh"}>
      <Stack gap={"lg"}>
        <Stack gap={5}>
          <Title ta="center">Iniciar sesión</Title>
          <Text c="dimmed" size="sm" ta="center">
            ¿No tienes una cuenta todavia?{" "}
            <Anchor size="sm" component={NavLink} to={"/register"}>
              Crear cuenta
            </Anchor>
          </Text>
        </Stack>
        <Card maw={"100%"} w={{ base: "auto", xs: "400" }}>
          <form
            onSubmit={form.onSubmit((values) => {
              login(values);
            })}
          >
            <Stack>
              <TextInput
                label="Correo"
                withAsterisk
                placeholder="you@mantine.dev"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Contraseña"
                withAsterisk
                placeholder="Tu contraseña"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Button type="submit" fullWidth loading={isPending}>
                Iniciar sesión
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Center>
  );
}
