import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage, UserListPage } from "../pages";
import PostPage from "../pages/PostPage";
import { Center, Loader } from "@mantine/core";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";
import GuestRoutes from "./GuestRoutes";
import AuthRoutes from "./AuthRoutes";
import MyPostsPage from "../pages/MyPostsPage";
import AccountPage from "../pages/AccountPage";
import { MainLayout2 } from "../components/layouts/MainLayout2";
import { MainLayout } from "../components/layouts/MainLayout";

interface Props {}

export default function MainRouter(_props: Props): JSX.Element {
  const { isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return (
      <Center h={"100vh"}>
        <Loader type="dots" />
      </Center>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/publicaciones">
              <Route index element={<HomePage />} />
              <Route path=":id" element={<PostPage />} />
            </Route>
            <Route path="/mis-publicaciones" element={<MyPostsPage />} />
            <Route path="/usuarios" element={<UserListPage />} />
            <Route path="/mi-cuenta" element={<AccountPage />} />
          </Route>
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
