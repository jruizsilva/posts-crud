import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage, UserListPage } from "../pages";

interface Props {}

export default function MainRouter(_props: Props): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/users">
              <Route index element={<UserListPage />} />
              <Route path=":id" element={<h1>User Detail Page</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
