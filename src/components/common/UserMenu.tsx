import { Avatar, Button, Group, Menu, rem, Stack, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLibrary,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useAppStore } from "../../store/useAppStore";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

export default function UserMenu(_props: Props): JSX.Element {
  const { userAuthenticated, setUserAuthenticated } = useAppStore(
    (store) => store
  );
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    setUserAuthenticated(null);
    navigate("/login");
  };

  return (
    <>
      <Menu width={180} shadow="md">
        <Menu.Target>
          <Button
            p={0}
            variant="transparent"
            color="gray"
            rightSection={<IconChevronDown size={"1rem"} />}
          >
            <Group gap={"xs"}>
              <Avatar size={32} src={userAuthenticated?.image} />
              <Stack gap={0} align="flex-start">
                <Text size="xs" fw={500} tt={"capitalize"}>
                  {userAuthenticated?.name}
                </Text>
                <Text c="dimmed" size="xs" tt={"lowercase"}>
                  {userAuthenticated?.email}
                </Text>
              </Stack>
            </Group>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconLibrary style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to={"/mis-publicaciones"}
          >
            Mis publicaciones
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to={"/mi-cuenta"}
          >
            Mi cuenta
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={logout}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
