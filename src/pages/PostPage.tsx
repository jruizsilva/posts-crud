import { Center, Group, Stack, Text, Title } from "@mantine/core";
import PostDelete from "../components/post/PostDelete/PostDelete";
import PostEdit from "../components/post/PostEdit/PostEdit";
import { usePostByIdQuery } from "../hooks/post/usePostByIdQuery";
import { useAppStore } from "../store/useAppStore";
import PostSkeleton from "../components/common/PostSkeleton";
import { useParams } from "react-router-dom";

interface Props {}

export default function PostPage(_props: Props): JSX.Element {
  const params = useParams();
  const postId = Number(params.id);
  const { post, isPending } = usePostByIdQuery(postId);
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  if (isPending) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <>
        <Center my={"lg"}>
          <Title fw={400}>Post not found</Title>
        </Center>
      </>
    );
  }

  return (
    <>
      <Stack>
        <Stack gap={"xs"}>
          <Title fw={900} fz={"h1"} lh={1.1}>
            {post?.title}
          </Title>
          <Text c="dimmed">{post?.content}</Text>
        </Stack>
        {userAuthenticated?.id === post.user_id && (
          <Group>
            <PostEdit post={post} />
            <PostDelete post={post} />
          </Group>
        )}
      </Stack>
    </>
  );
}
