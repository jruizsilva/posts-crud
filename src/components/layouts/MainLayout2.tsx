import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import UserMenu from "../common/UserMenu";

const links = [
  { link: "/", label: "Inicio" },
  { link: "/usuarios", label: "Usuarios" },
];

export function MainLayout2() {
  const [opened, { toggle }] = useDisclosure();
  const buttonSize = useMatches({ base: "md", xs: "xs" });

  const items = links.map(({ label }) => (
    <Button
      key={label}
      color="gray"
      w={{ base: "100%", xs: "auto" }}
      size={buttonSize}
    >
      {label}
    </Button>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="md" h={"100%"}>
          <Group h={"100%"} justify="space-between">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "indigo", to: "teal", deg: 90 }}
              visibleFrom="xs"
            >
              Blog App
            </Text>
            <Group gap={5} visibleFrom="xs">
              {items}
            </Group>
            <UserMenu />

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Group hiddenFrom="xs">{items}</Group>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
