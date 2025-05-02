// components/auth/RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const token = localStorage.getItem("token"); // или sessionStorage, или useSelector(...) если храните в Redux

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
