import { Group, Title, SimpleGrid } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";
import PostCreate from "../components/post/PostCreate/PostCreate";
import { usePostListQuery } from "../hooks/post/usePostListQuery";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function MyPostsPage(_props: Props): JSX.Element {
  const userId = useAppStore((store) => store.userAuthenticated?.id) as number;
  const { posts } = usePostListQuery(`?userId=${userId}`);

  return (
    <>
      <Group justify="space-between">
        <Title mb={"lg"} fw={500}>
          Mis publicaciones
        </Title>
        <PostCreate />
      </Group>
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </>
  );
}
