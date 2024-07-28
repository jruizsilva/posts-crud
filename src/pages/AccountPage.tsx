import { Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import UserInfoEdit from "../components/user/UserInfoEdit";
import UserPhotoEdit from "../components/user/UserPhotoEdit";

interface Props {}

export default function AccountPage(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  if (!userAuthenticated) return <Loader />;

  return (
    <>
      <Stack>
        <Title fw={500}>Mi cuenta</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <UserInfoEdit user={userAuthenticated} />
          <UserPhotoEdit user={userAuthenticated} />
        </SimpleGrid>
      </Stack>
    </>
  );
}
