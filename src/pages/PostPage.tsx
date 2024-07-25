import { Group, Paper, Text, Title } from "@mantine/core";
import PostDelete from "../components/post/PostDelete/PostDelete";
import PostEdit from "../components/post/PostEdit/PostEdit";

interface Props {}

export default function PostPage(_props: Props): JSX.Element {
  return (
    <>
      <Paper py={16}>
        <Group>
          <Title fw={900} fz={"h1"} lh={1.1}>
            You&apos;ve won a million dollars in cash!
          </Title>
          <Text c="dimmed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis distinctio inventore iure laborum. Facilis ad totam
            magni vel fugit. Commodi facilis veritatis sapiente dolor
            necessitatibus voluptates totam officia quibusdam mollitia.
          </Text>
          <PostEdit />
          <PostDelete />
        </Group>
      </Paper>
    </>
  );
}
