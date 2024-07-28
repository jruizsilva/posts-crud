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
import { IconEdit } from "@tabler/icons-react";
import * as yup from "yup";
import { usePostUpdateMutation } from "../../../hooks/post/usePostUpdateMutation";
import { Post } from "../../../types/post";

const schema = yup.object().shape({
  title: yup.string().required("Titulo requerido"),
  content: yup.string().required("Contenido requerido"),
});

interface Props {
  post: Post;
}

export default function PostEdit({ post }: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validate: yupResolver(schema),
  });
  const { updatePost } = usePostUpdateMutation(post.id);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Editar publicación">
        <form
          onSubmit={form.onSubmit((values) => {
            updatePost(values);
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
