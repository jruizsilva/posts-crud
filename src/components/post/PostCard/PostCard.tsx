import { Card, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./PostCard.module.scss";
import { Post } from "../../../types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props): JSX.Element {
  return (
    <>
      <Card shadow="sm" padding="xl">
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

        <Text mt="xs" c="dimmed" size="sm" lineClamp={3}>
          {post.content}
        </Text>
      </Card>
    </>
  );
}
