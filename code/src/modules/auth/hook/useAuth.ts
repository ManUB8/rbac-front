import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from "jotai";

import {
  AppRoutes,
  getDefaultRouteByRole,
  type UserRole,
} from "../../../router/router";

import type {
  ILoginAdminBody,
  ILoginAdminItem,
  ILoginStudentBody,
  IStudentItem,
} from "../interface/Login.interface";
import { getLoginAdmin, getLoginStudent } from "../service/LoginApi";

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

  const setAuthSession = (
    role: UserRole,
    accountName: string,
    userId: string | number
  ) => {
    const fakeToken = `mock-token-${role}-${Date.now()}`;

    Cookies.set("accessToken", fakeToken, { expires: 30 });
    Cookies.set("accountName", accountName, { expires: 30 });
    Cookies.set("accountType", role, { expires: 30 });
    Cookies.set("userId", String(userId), { expires: 30 });

    localStorage.setItem("access_token", fakeToken);
    localStorage.setItem("account_type", role);
    localStorage.setItem("account_name", accountName);
    localStorage.setItem("user_id", String(userId));

    navigate(getDefaultRouteByRole(role), { replace: true });
  };

  const authroizedAdmin = (data: ILoginAdminItem) => {
    setAuthSession("admin", data.name, data.user_id);
  };

  const authroizedStudent = (data: IStudentItem) => {
    setAuthSession("student", data.first_name, data.student_id);
  };

  const handleLoginAdmin = async (
    payload: ILoginAdminBody
  ): Promise<boolean> => {
    try {
      const res = await getLoginAdmin(payload);
      authroizedAdmin(res);
      return true;
    } catch (err) {
      console.error("login admin error:", err);
      return false;
    }
  };

  const handleLoginStudent = async (
    payload: ILoginStudentBody
  ): Promise<boolean> => {
    try {
      const res = await getLoginStudent(payload);
      authroizedStudent(res);
      return true;
    } catch (err) {
      console.error("login student error:", err);
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