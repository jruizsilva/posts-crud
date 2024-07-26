import { Card, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./PostCard.module.scss";

interface Props {}

export default function PostCard(_props: Props): JSX.Element {
  return (
    <>
      <Card shadow="sm" padding="xl">
        <Text
          fw={500}
          size="lg"
          lineClamp={1}
          component={Link}
          to={"/publicaciones/1"}
          className={classes.title}
        >
          You&apos;ve won a million dollars in cash!
        </Text>

        <Text mt="xs" c="dimmed" size="sm" lineClamp={3}>
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us Please click anywhere on this card to claim your
          reward, this is not a fraud, trust us
        </Text>
      </Card>
    </>
  );
}
