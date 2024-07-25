import {
  Button,
  Code,
  Group,
  Modal,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Titulo requerido"),
  content: yup.string().required("Contenido requerido"),
});

interface Props {}

export default function PostEdit(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "123",
      content: "444",
    },
    validate: yupResolver(schema),
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Editar publicación">
        <form
          onSubmit={form.onSubmit((values) => {
            form.validate();
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
            <Button type="submit">Guardar</Button>
          </Group>
        </form>
      </Modal>

      <Button
        radius={"xl"}
        variant="light"
        leftSection={<IconEdit />}
        onClick={open}
      >
        Editar
      </Button>
    </>
  );
}
