import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./PostCard.module.scss";
import { Post } from "../../../types/post";
import { formatDate } from "../../../helpers/formatDate";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props): JSX.Element {
  return (
    <>
      <Card shadow="sm" padding="md">
        <Stack gap={"xs"} h={"100%"}>
          <Text
            fw={500}
            size="lg"
            lineClamp={1}
            component={Link}
            to={`publicaciones/${post.id}`}
            state={{ post }}
            className={classes.title}
          >
            {post.title}
          </Text>

          <Text c="dimmed" size="sm" lineClamp={2}>
            {post.content}
          </Text>
          <Group wrap="nowrap" gap="xs" mt={"auto"}>
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={20}
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${
                  post.user_id <= 10 ? post.user_id : 1
                }.png`}
              />
              <Text size="xs">{post.user?.name}</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {formatDate(post.created_at)}
            </Text>
          </Group>
        </Stack>
      </Card>
    </>
  );
}
