import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { LoginPage, PostListPage, UserListPage } from "../pages";
import PostPage from "../pages/PostPage";
import { useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import { fetchMe } from "../services/auth";
import RegisterPage from "../pages/RegisterPage";

interface Props {}

export default function MainRouter(_props: Props): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (!token) {
      setUserAuthenticated(null);
      setLoading(false);
      return navigate("login");
    }
    fetchMe()
      .then((user) => {
        setUserAuthenticated(user);
      })
      .catch((err) => {
        console.log(err);
        setUserAuthenticated(null);
        localStorage.removeItem("AUTH_TOKEN");
        navigate("login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
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
