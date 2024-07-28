import { Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import UserUpdateInfo from "../components/user/UserUpdateInfo";
import UserUpdatePhoto from "../components/user/UserUpdatePhoto";

interface Props {}

export default function AccountPage(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  if (!userAuthenticated) return <Loader />;

  return (
    <>
      <Stack>
        <Title fw={500}>Mi cuenta</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <UserUpdateInfo user={userAuthenticated} />
          <UserUpdatePhoto user={userAuthenticated} />
        </SimpleGrid>
      </Stack>
    </>
  );
}
