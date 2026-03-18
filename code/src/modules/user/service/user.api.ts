import { api } from "../../../shared/services/axiosInstance";
import type { User } from "../interface/user.interface";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/users');
  return res
};
export const getBranch = async (): Promise<any[]> => {
  const res = await api.get<any[]>('/branch/v1/branches');
  return res
};