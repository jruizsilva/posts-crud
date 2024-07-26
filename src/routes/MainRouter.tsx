import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage, LoginPage, UserListPage } from "../pages";
import PostPage from "../pages/PostPage";
import { Center, Loader } from "@mantine/core";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/publicaciones">
            <Route index element={<HomePage />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/usuarios" element={<UserListPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
