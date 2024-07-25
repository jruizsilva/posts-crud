import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { PostListPage, UserListPage } from "../pages";
import PostPage from "../pages/PostPage";

interface Props {}

export default function MainRouter(_props: Props): JSX.Element {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}
