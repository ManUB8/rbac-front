// --- utils/http.ts ---
import axios, { type AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import { alertError } from "../components/swal";
import { ENUM_VERSION } from "../components/Enum";
import { AppRoutes } from "../../router/router";

type RequestConfig = AxiosRequestConfig & {
  skipSwal?: boolean;
};

export const HOST_SERVER = `${import.meta.env.VITE_API_DOMAIN}/api`;
console.log("[ENV] VITE_IMAGE_VERSION ENUM_VERSION=", ENUM_VERSION);
console.log("[ENV] VITE_API_DOMAIN HOST_SERVER=", HOST_SERVER);

const instance = axios.create({ baseURL: HOST_SERVER, });

// ====== ONE-SHOT session popup guard ======
let sessionPopupShown = false;

// ====== injectable logout handler (แทนการใช้ useAuth ในไฟล์นี้) ======
let logoutHandler: null | (() => void) = null;
/** เรียกใน App หรือ AuthProvider เพื่อลงทะเบียน handler */
export const setLogoutHandler = (fn: () => void) => { logoutHandler = fn; };

const goLogin = () => {
  if (typeof logoutHandler === "function") {
    try { logoutHandler(); } catch { }
  } else {
    window.location.replace(AppRoutes?.authLanding ?? "/login");
  }
};

const showSessionExpiredAndRedirect = () => {
  if (sessionPopupShown) return;
  sessionPopupShown = true;

  localStorage.removeItem("access_token");

  let redirected = false;
  const safeLogin = () => {
    if (redirected) return;
    redirected = true;
    goLogin();
  };

  Swal.fire({
    title: "Session expired",
    text: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง",
    icon: "warning",
    confirmButtonText: "ไปหน้า Login",
    showConfirmButton: true,      // ✅ แสดงปุ่ม
    timer: 5000,                  // ✅ ครบเวลาแล้วเด้งเอง
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    // กรณีกดปุ่ม หรือหมดเวลา → ไปหน้า Login
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      safeLogin();
    }
  });
};

// ====== REQUEST interceptor ======
instance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("access_token");
    if (token) {
      // กันกรณี token ถูกเก็บแบบมี "..." ติดมา
      const clean = token.replace(/^"+|"+$/g, "");
      config.headers["Authorization"] = `Bearer ${clean}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ====== RESPONSE interceptor -> จับ HTTP 401 ======
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const httpStatus = error?.response?.status;
    if (httpStatus === 401) {
      showSessionExpiredAndRedirect();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// ====== unwrap & error handling ======
function unwrap<T>(payload: any): T {
  if (payload && typeof payload === "object" && payload.status) {
    const { code, description, err_code } = payload.status ?? {};
    const isSuccess =
      (Number(code) >= 200 && Number(code) < 300) ||
      (Number(code) >= 1000 && Number(code) < 2000) ||
      (typeof description === "string" &&
        description.toLowerCase().includes("success"));

    if (isSuccess) {
      return (payload.data as T) ?? (undefined as unknown as T);
    }

    // backend ส่ง status.code=401 แม้ HTTP 200
    if (Number(code) === 401) {
      showSessionExpiredAndRedirect();
      const e = new Error("Session expired (401)");
      (e as any).__backend = payload;
      throw e;
    }

    const messageParts = [
      err_code || null,
      description || null,
      code ? `(${code})` : null,
    ].filter(Boolean);
    const message = messageParts.join(" - ");

    const e = new Error(message || "Unknown Error");
    (e as any).__backend = payload;
    throw e;
  }
  return payload as T;
}

const handleError = (error: any) => {
  const httpStatus = error?.response?.status;
  const skipSwal = !!error?.config?.skipSwal;
  console.log("httpStatus", httpStatus);

  // 401 ถูกจัดการแล้วโดย interceptor
  if (httpStatus === 401) throw error;
  if (skipSwal) throw error;
  // ถ้าไม่มี response เลย => network/CORS/DNS/TLS/timeout
  if (!error?.response) {
    const msg =
      error?.message === "Network Error"
        ? "Network Error: ตรวจสอบอินเทอร์เน็ตหรือ CORS"
        : error?.message || "Unknown network error";
    alertError(msg);
    throw error;
  }

  const status = error?.response?.data?.status;

  if (status) {
    const { err_code, description, code } = status;

    if (Number(code) === 401) {
      showSessionExpiredAndRedirect();
      throw error;
    }

    const messageParts = [
      err_code || null,
      description || null,
      code ? `(${code})` : null,
    ].filter(Boolean);

    const message = messageParts.join(" - ");
    alertError(message || "Unknown Error");
    throw error;
  }

  const fallback =
    error?.response?.data?.message ||
    error?.message ||
    "Unknown Error";

  alertError(fallback);
  throw error;
};

export const api = {
  get: async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.get(url, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;   // ✅ กันทั้ง axios error + unwrap throw
      handleError(err);
      throw err;
    }
  },

  post: async <T>(url: string, data?: any, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.post(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;   // ✅ สำคัญมาก
      handleError(err);
      throw err;
    }
  },

  put: async <T>(url: string, data?: any, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.put(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },

  patch: async <T>(url: string, data?: any, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.patch(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },

  delete: async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.delete(url, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },
};