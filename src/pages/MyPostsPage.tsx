import { Group, Title, SimpleGrid } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";
import PostCreate from "../components/post/PostCreate/PostCreate";
import { usePostListQuery } from "../hooks/post/usePostListQuery";
import { useAppStore } from "../store/useAppStore";
import CardSkeleton from "../components/common/CardSkeleton";

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
      <SimpleGrid cols={3}>
        {isPending && (
          <>
            {Array.from({ length: 9 }).map(() => (
              <CardSkeleton />
            ))}
          </>
        )}
        {!isPending && posts && posts.length === 0 && (
          <Title ta="center" mt={"lg"}>
            No tienes publicaciones
          </Title>
        )}
        {!isPending && posts && posts.length > 0 && (
          <>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </SimpleGrid>
    </>
  );
}
