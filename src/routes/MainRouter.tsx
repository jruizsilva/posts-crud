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
            <Route path="/users" element={<UserListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
