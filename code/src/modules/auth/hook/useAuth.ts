import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/router";
import type {
  ILoginAdminBody,
  ILoginStudentBody,
} from "../interface/Login.interface";
import Cookies from "js-cookie";

export type UserRole = "admin" | "student";

export const useAuth = () => {
  const navigate = useNavigate();

  const getAuthToken = (): string => localStorage.getItem("access_token") || "";

  const getAuthRole = (): UserRole | "" =>
    (localStorage.getItem("account_type") as UserRole | null) || "";

  const getAuthUser = () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("account_type") as UserRole | null;
    const accountName = localStorage.getItem("account_name");
    const userId = localStorage.getItem("user_id");

    if (!token || !role) return null;

    return {
      access_token: token,
      role,
      account_name: accountName || "",
      user_id: userId || "",
    };
  };

  const authorized = (
    role: UserRole,
    accountName: string,
    userId: string,
    path: string
  ) => {
    const fakeToken = `mock-token-${role}-${Date.now()}`;

    Cookies.set("accessToken", fakeToken, { expires: 30 });
    Cookies.set("accountName", accountName, { expires: 30 });
    Cookies.set("accountType", role, { expires: 30 });
    Cookies.set("userId", userId, { expires: 30 });

    localStorage.setItem("access_token", fakeToken);
    localStorage.setItem("account_type", role);
    localStorage.setItem("account_name", accountName);
    localStorage.setItem("user_id", userId);

    navigate(path, { replace: true });
  };

  const handleLoginAdmin = async (
    payload: ILoginAdminBody
  ): Promise<boolean> => {
    try {
      if (payload.username === "admin" && payload.password === "1234") {
        authorized("admin", "Administrator", "admin-001", AppRoutes.dashboard);
        return true;
      }
      return false;
    } catch (err) {
      console.error("mock admin login error:", err);
      return false;
    }
  };

  const handleLoginStudent = async (
    payload: ILoginStudentBody
  ): Promise<boolean> => {
    try {
      if (payload.student_id === "67010533" && payload.password === "1234") {
        authorized(
          "student",
          "Student Demo",
          "student-001",
          AppRoutes.studentCard
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("mock student login error:", err);
      return false;
    }
  };

  const handleLogOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("accountName");
    Cookies.remove("accountType");
    Cookies.remove("userId");

    localStorage.removeItem("access_token");
    localStorage.removeItem("account_type");
    localStorage.removeItem("account_name");
    localStorage.removeItem("user_id");

    navigate(AppRoutes.authLanding, { replace: true });
  };

  return {
    getAuthToken,
    getAuthRole,
    getAuthUser,
    handleLoginAdmin,
    handleLoginStudent,
    handleLogOut,
  };
};

export default useAuth;