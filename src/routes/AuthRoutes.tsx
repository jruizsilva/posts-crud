import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function AuthRoutes(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);
  const location = useLocation();

  return userAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ previousUrl: location.pathname }} />
  );
}
