import axios, { type AxiosRequestConfig } from "axios";
import { alertError } from "../components/swal";
import { ENUM_VERSION } from "../components/Enum";

type RequestConfig = AxiosRequestConfig & {
  skipSwal?: boolean;
};

// export const HOST_SERVER = `https://api.rbac-activity.com/api`;
export const HOST_SERVER = `http://127.0.0.1:8000`;
console.log("[ENV] VITE_IMAGE_VERSION ENUM_VERSION=", ENUM_VERSION);
console.log("[ENV] VITE_API_DOMAIN HOST_SERVER=", HOST_SERVER);

const instance = axios.create({
  baseURL: HOST_SERVER,
});

// ====== injectable logout handler ======
let logoutHandler: null | (() => void) = null;
export const setLogoutHandler = (fn: () => void) => {
  logoutHandler = fn;
};

// ====== REQUEST interceptor ======
instance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("access_token");
    if (token) {
      const clean = token.replace(/^"+|"+$/g, "");
      config.headers["Authorization"] = `Bearer ${clean}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ====== RESPONSE interceptor ======
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const httpStatus = error?.response?.status;

    if (httpStatus === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// ====== unwrap ======
function unwrap<T>(payload: any): T {
  // รองรับ format เดิม
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

    if (Number(code) === 401) {
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

  // รองรับ format ใหม่ { msg, data }
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  // fallback
  return payload as T;
}

// ====== handle error ======
const handleError = (error: any) => {
  const httpStatus = error?.response?.status;
  const skipSwal = !!error?.config?.skipSwal;

  console.log("httpStatus", httpStatus);

  if (httpStatus === 401) throw error;
  if (skipSwal) throw error;

  if (!error?.response) {
    const msg =
      error?.message === "Network Error"
        ? "Network Error: ตรวจสอบอินเทอร์เน็ตหรือ CORS"
        : error?.message || "Unknown network error";
    alertError(msg);
    throw error;
  }

  // format เดิม
  const status = error?.response?.data?.status;
  if (status) {
    const { err_code, description, code } = status;

    if (Number(code) === 401) {
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

  // format ใหม่
  const fallback =
    error?.response?.data?.msg ||
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
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },

  post: async <T>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> => {
    try {
      const res = await instance.post(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },

  put: async <T>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> => {
    try {
      const res = await instance.put(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      if (config?.skipSwal) throw err;
      handleError(err);
      throw err;
    }
  },

  patch: async <T>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> => {
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