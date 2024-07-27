import { SimpleGrid, Text } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";
import { usePostListQuery } from "../hooks/post/usePostListQuery";
import PostCardSkeleton from "../components/common/PostCardSkeleton";

interface Props {}

export default function HomePage(_props: Props): JSX.Element {
  const { posts, isPending } = usePostListQuery();

  return (
    <>
      {isPending && (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      )}
      {!isPending && posts && posts.length === 0 && (
        <Text>No se encontraron resultados</Text>
      )}
      {!isPending && posts && posts.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
