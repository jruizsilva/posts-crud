import { Table, Group, Skeleton } from "@mantine/core";

interface Props {}

export default function UserRowSkeleton(_props: Props): JSX.Element {
  return (
    <>
      <Table.Tr>
        <Table.Td>
          <Skeleton h={16} w={16} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm" wrap="nowrap">
            <Skeleton h={24} w={24} circle className="shrink-0" />
            <Group gap={"xs"} w={"60%"}>
              <Skeleton h={16} />
              <Skeleton h={16} />
            </Group>
          </Group>
        </Table.Td>
        <Table.Td>
          <Skeleton h={16} w={"70%"} />
        </Table.Td>
      </Table.Tr>
    </>
  );
}
