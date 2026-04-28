import axios, { type AxiosRequestConfig } from "axios";
import { alertError } from "../components/swal";
import { ENUM_VERSION } from "../components/Enum";

type RequestConfig = AxiosRequestConfig & {
  skipSwal?: boolean;
};

export const HOST_SERVER = `https://api.rbac-activity.com`;
// export const HOST_SERVER = `http://127.0.0.1:8000`;
console.log("[ENV] VITE_IMAGE_VERSION ENUM_VERSION=", ENUM_VERSION);
console.log("[ENV] VITE_API_DOMAIN HOST_SERVER=", HOST_SERVER);

const instance = axios.create({
  baseURL: HOST_SERVER,
});

const handleError = (error: any) => {
  let message = "Unknown Error";

  const data = error?.response?.data;

  if (typeof data?.detail === "string") {
    message = data.detail;
  } else if (Array.isArray(data?.detail)) {
    message = data.detail.map((e: any) => e.msg).join(", ");
  } else if (data?.message) {
    message = data.message;
  } else if (error?.message) {
    message = error.message;
  }

  alertError(message);

  throw error;
};

export const api = {
  get: async <T>(url: string, config = {}): Promise<T> => {
    try {
      const res = await instance.get<T>(url, config);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  post: async <T>(url: string, data?: any, config = {}): Promise<T> => {
    try {
      const res = await instance.post<T>(url, data, config);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;

    }
  },

  put: async <T>(url: string, data?: any, config = {}): Promise<T> => {
    try {
      const res = await instance.put<T>(url, data, config);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;

    }
  },

    patch: async <T>(url: string, data?: any, config: RequestConfig = {}): Promise<T> => {
    try {
      const res = await instance.patch<T>(url, data, config);
      return res.data;
    } catch (err: any) {
      if (!config.skipSwal) handleError(err);
      throw err;
    }
  },

  delete: async <T>(url: string, config = {}): Promise<T> => {
    try {
      const res = await instance.delete<T>(url, config);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;

    }
  },
};