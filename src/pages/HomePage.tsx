import { Group, SimpleGrid, Title } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";
import PostCreate from "../components/post/PostCreate/PostCreate";

interface Props {}

export default function HomePage(_props: Props): JSX.Element {
  return (
    <>
      <Group justify="space-between">
        <Title mb={"lg"} fw={500}>
          Listado de publicaciones
        </Title>
        <PostCreate />
      </Group>
      <SimpleGrid cols={3}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </SimpleGrid>
    </>
  );
}