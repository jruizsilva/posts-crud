import { Button, Menu, rem, Stack, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconExternalLink,
  IconLogout,
} from "@tabler/icons-react";

interface Props {}

export default function UserMenu(_props: Props): JSX.Element {
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
                honathan
              </Text>
              <Text c="dimmed" size="xs" tt={"lowercase"}>
                Jonathan@gmail.com
              </Text>
            </Stack>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            component="a"
            href="https://mantine.dev"
            target="_blank"
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
