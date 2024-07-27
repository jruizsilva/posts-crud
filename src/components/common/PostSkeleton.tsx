import { Stack, Skeleton, Group } from "@mantine/core";

interface Props {}

export default function PostSkeleton(_props: Props): JSX.Element {
  return (
    <>
      <Stack>
        <Stack gap={"xs"}>
          <Skeleton h={32} />
          <Skeleton h={12} />
        </Stack>
        <Group>
          <Skeleton radius={"xl"} h={32} w={100} />
          <Skeleton radius={"xl"} h={32} w={100} />
        </Group>
      </Stack>
    </>
  );
}
