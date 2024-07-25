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
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/users", label: "Users" },
];

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(links[0].link);
  const buttonSize = useMatches({ base: "md", xs: "xs" });

  const items = links.map((link) => (
    <Button
      component={NavLink}
      key={link.label}
      to={link.link}
      variant={active === link.link ? "filled" : "subtle"}
      onClick={() => setActive(link.link)}
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
            to={"/"}
            className={classes.logo}
          >
            Logo
          </Text>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Group
          gap={15}
          h={"100%"}
          hiddenFrom="xs"
          ta={"center"}
          className={classes.group_mobile}
        >
          {items}
        </Group>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
