import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Titulo requerido"),
  content: yup.string().required("Contenido requerido"),
});

interface Props {}

export default function PostCreate(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
    },
    validate: yupResolver(schema),
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Crear publicación">
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
          })}
        >
          <SimpleGrid spacing={"xs"}>
            <TextInput
              label="Titulo"
              withAsterisk
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Contenido"
              withAsterisk
              key={form.key("content")}
              {...form.getInputProps("content")}
            />
          </SimpleGrid>
          <Group justify="flex-end" mt={"md"}>
            <Button
              variant="outline"
              onClick={() => {
                close();
                form.reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </Group>
        </form>
      </Modal>
      <Button variant="light" onClick={open}>
        Agregar post
      </Button>
    </>
  );
}