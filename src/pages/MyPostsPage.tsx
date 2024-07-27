import { Group, Title, SimpleGrid, Text } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";
import PostCreate from "../components/post/PostCreate/PostCreate";
import { usePostListQuery } from "../hooks/post/usePostListQuery";
import { useAppStore } from "../store/useAppStore";
import PostCardSkeleton from "../components/common/PostCardSkeleton";

interface Props {}

export default function MyPostsPage(_props: Props): JSX.Element {
  const userId = useAppStore((store) => store.userAuthenticated?.id) as number;
  const { posts, isPending } = usePostListQuery(`?userId=${userId}`);

  return (
    <>
      <Group justify="space-between">
        <Title mb={"lg"} fw={500}>
          Mis publicaciones
        </Title>
        <PostCreate />
      </Group>
      {isPending && (
        <SimpleGrid cols={3}>
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      )}
      {!isPending && posts && posts.length === 0 && (
        <Text>No se encontraron resultados</Text>
      )}
      {!isPending && posts && posts.length > 0 && (
        <SimpleGrid cols={3}>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
