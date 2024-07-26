import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function GuestRoutes(_props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated);

  return userAuthenticated ? <Navigate to={"/"} /> : <Outlet />;
}
