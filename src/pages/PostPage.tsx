import {
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import PostDelete from "../components/post/PostDelete/PostDelete";
import PostEdit from "../components/post/PostEdit/PostEdit";
import { usePostByIdQuery } from "../hooks/post/usePostByIdQuery";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function PostPage(_props: Props): JSX.Element {
  const { post, isPending } = usePostByIdQuery();
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  if (!post && isPending) {
    return (
      <Center h={"80vh"}>
        <Loader type="dots" />
      </Center>
    );
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
      <Paper py={16}>
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
              <PostDelete />
            </Group>
          )}
        </Stack>
      </Paper>
    </>
  );
}
