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
import classes from "./MainLayout.module.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { link: "/publicaciones", label: "Publicaciones" },
  { link: "/usuarios", label: "Usuarios" },
];

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const buttonSize = useMatches({ base: "md", xs: "xs" });
  const { pathname } = useLocation();

  const items = links.map((link) => (
    <Button
      component={NavLink}
      key={link.label}
      to={link.link}
      variant={pathname.includes(link.link) ? "filled" : "subtle"}
      w={{ base: "100%", xs: "auto" }}
      size={buttonSize}
    >
      {link.label}
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
      <AppShell.Header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "indigo", to: "teal", deg: 90 }}
            component={NavLink}
            to={"/posts"}
          >
            LogoApp
          </Text>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
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
