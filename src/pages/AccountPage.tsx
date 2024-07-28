import { Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import UserInfoUpdate from "../components/user/UserInfoUpdate";
import UserPhotoUpdate from "../components/user/UserPhotoUpdate";

interface Props {}

export default function AccountPage(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  if (!userAuthenticated) return <Loader />;

  return (
    <>
      <Stack>
        <Title fw={500}>Mi cuenta</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <UserInfoUpdate user={userAuthenticated} />
          <UserPhotoUpdate user={userAuthenticated} />
        </SimpleGrid>
      </Stack>
    </>
  );
}
