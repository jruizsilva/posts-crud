import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

interface Props {}

export default function PostEdit(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Editar publicación">
        <SimpleGrid spacing={"xs"}>
          <TextInput label="Titulo" placeholder="Input placeholder" />
          <Textarea label="Contenido" placeholder="Input placeholder" />
        </SimpleGrid>
        <Group justify="flex-end" mt={"md"}>
          <Button type="submit">Guardar</Button>
        </Group>
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
