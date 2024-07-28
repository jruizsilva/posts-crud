import { Fieldset, Stack, TextInput, Button } from "@mantine/core";
import { useAppStore } from "../../store/useAppStore";
import { useUserUpdateMutation } from "../../hooks/user/useUserUpdateMutation";
import * as yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { User } from "../../types/user";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
});

interface Props {
  user: User;
}

export default function UserInfoUpdate({ user }: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);
  const { updateUser, isPending } = useUserUpdateMutation(user.id);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: user.name,
    },
    validate: yupResolver(schema),
  });

  return (
    <>
      <Fieldset legend="Información personal">
        <form
          onSubmit={form.onSubmit((values) => {
            updateUser(values);
          })}
        >
          <Stack gap={"xs"}>
            <TextInput
              label="Nombre"
              placeholder="Nombre"
              defaultValue={userAuthenticated?.name}
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Correo"
              placeholder="Correo"
              disabled
              value={userAuthenticated?.email}
            />
          </Stack>
          <Button type="submit" mt={"md"} loading={isPending}>
            Guardar cambios
          </Button>
        </form>
      </Fieldset>
    </>
  );
}
