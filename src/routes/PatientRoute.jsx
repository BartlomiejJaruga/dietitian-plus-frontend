import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRolesENUM } from "@enums";

export default function PatientRoute() {
  const authState = useSelector((state) => state.auth);

  if (!authState || authState.isAuthenticated !== true || authState.userData.user_type !== userRolesENUM.PATIENT) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

