import { Button, Menu, rem, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { useAppStore } from "../../store/useAppStore";
import { useNavigate } from "react-router-dom";

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
            <Stack gap={0}>
              <Text size="xs" fw={500} tt={"capitalize"}>
                {userAuthenticated?.name}
              </Text>
              <Text c="dimmed" size="xs" tt={"lowercase"}>
                {userAuthenticated?.email}
              </Text>
            </Stack>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
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
