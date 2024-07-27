import { Stack, Skeleton, Group } from "@mantine/core";

interface Props {}

export default function CardSkeleton(_props: Props): JSX.Element {
  return (
    <>
      <Stack gap={"xs"} h={"120"} p={"md"}>
        <Skeleton h={16} />
        <Skeleton h={16} />
        <Group wrap="nowrap" mt={"auto"}>
          <Skeleton circle h={32} w={32} className="shrink-0" />
          <Skeleton h={16} />
        </Group>
      </Stack>
    </>
  );
}
