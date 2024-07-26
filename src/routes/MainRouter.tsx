import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { LoginPage, PostListPage, UserListPage } from "../pages";
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
          <Route path="/publicaciones">
            <Route index element={<PostListPage />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/usuarios">
            <Route index element={<UserListPage />} />
            <Route path=":id" element={<h1>User Detail Page</h1>} />
          </Route>
          <Route path="*" element={<Navigate to={"/publicaciones"} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
