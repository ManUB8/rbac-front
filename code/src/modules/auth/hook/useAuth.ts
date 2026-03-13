import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/router";
import type { ILoginAdminBody, ILoginAdminItem } from "../interface/Login.interface";
import Swal from "sweetalert2";
import * as R from "ramda";
import { getLoginAdmin } from "../service/LoginApi";
import Cookies from 'js-cookie'

export const useAuth = () => {
  const navigate = useNavigate();

  const getAuthToken = (): string => localStorage.getItem("access_token") || "";

  const authroized = (data: ILoginAdminItem, path: string = AppRoutes.default) => {
    console.log('authroized', data)
    Cookies.set('accessToken', data.access_token, { expires: 30 })
    Cookies.set('accountName', data.user.account_name, { expires: 30 })
    Cookies.set('accountType', data.user.account_type, { expires: 30 })
    Cookies.set('userId', data.user.user_id, { expires: 30 })
    Cookies.set('ownerId', data.user.owner_id, { expires: 30 })
    Cookies.set('branchId', data.user.branch_id, { expires: 30 })
    localStorage.setItem("access_token", data.access_token);
    navigate(path)
  }

const handleLogin = async (payload: ILoginAdminBody): Promise<boolean> => {
    try {
      const res = await getLoginAdmin(payload);
      console.log("getLoginAdmin", res)
      await authroized(res, AppRoutes.default)
      return true;
    } catch (err) {
      console.error("login error:", err);
      return false;
    }
};

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate(AppRoutes.authLanding);
  };

  return { getAuthToken, handleLogin, handleLogOut };
};