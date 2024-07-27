import { Group, Skeleton } from "@mantine/core";

interface Props {}

export default function PaginationSkeleton(_props: Props): JSX.Element {
  return (
    <>
      <Group gap={8}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} w={32} h={32} />
        ))}
      </Group>
    </>
  );
}
