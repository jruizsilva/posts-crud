import {
  Avatar,
  Group,
  Pagination,
  Radio,
  rem,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useUserListPaginationQuery } from "../hooks/user/useUserListPaginationQuery";
import { IconSearch } from "@tabler/icons-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import UserRowSkeleton from "../components/common/UserRowSkeleton";
import PaginationSkeleton from "../components/common/PaginationSkeleton";

interface Props {}

export default function UserListPage(_props: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useDebouncedState("", 300);
  const location = useLocation();
  const { users, isPending } = useUserListPaginationQuery(location.search);

  useEffect(() => {
    handleFilterChange("search", search);
  }, [search]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prevParams) => {
      prevParams.set("page", "1");
      value = value.trim();
      if (value === "") {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const rows = users?.data?.map(({ id, email, name, posts, image }) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>{id}</Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} radius={26} color="indigo" src={image} />
            <Stack gap={0}>
              <Text size="sm" fw={500}>
                {name}
              </Text>
              <Text size="xs" fw={400} c="dimmed">
                {posts.length} publicaciones creadas
              </Text>
            </Stack>
          </Group>
        </Table.Td>
        <Table.Td>{email}</Table.Td>
      </Table.Tr>
    );
  });

  const totalPages = useMemo(() => {
    if (!users) return 0;
    return Math.ceil(users.total / users.per_page);
  }, [users]);

  return (
    <>
      <Stack gap={"xs"}>
        <Stack>
          <TextInput
            defaultValue={searchParams.get("search") ?? ""}
            placeholder="Busqueda por usuario o correo"
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          />
          <Radio.Group
            name="withPosts"
            onChange={(value) => handleFilterChange("withPosts", value)}
          >
            <Group>
              <Radio value="" label="Mostrar todos los usuarios" />
              <Radio value="true" label="Mostrar usuarios con publicaciones" />
              <Radio value="false" label="Mostrar usuarios sin publicaciones" />
            </Group>
          </Radio.Group>
        </Stack>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Usuario</Table.Th>
              <Table.Th>Correo</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isPending && rows && rows.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={3} align="center">
                  No se encontraron resultados
                </Table.Td>
              </Table.Tr>
            )}
            {isPending && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <UserRowSkeleton key={index} />
                ))}
              </>
            )}
            {!isPending && rows && rows.length > 0 && rows}
          </Table.Tbody>
        </Table>
        {!isPending && users && users.total > 0 && (
          <Pagination
            total={totalPages}
            defaultValue={parseInt(searchParams.get("page") ?? "1")}
            onChange={(value) => {
              handleFilterChange("page", value.toString());
            }}
          />
        )}
        {isPending && <PaginationSkeleton />}
      </Stack>
    </>
  );
}
