import { SimpleGrid } from "@mantine/core";
import PostCard from "../components/post/PostCard/PostCard";

interface Props {}

export default function PostListPage(_props: Props): JSX.Element {
  return (
    <>
      <SimpleGrid cols={3}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </SimpleGrid>
    </>
  );
}
