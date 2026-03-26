import { ApiConfig } from "../../../shared/service/ApiConfig";
import { api } from "../../../shared/service/axiosInstance";
import type { IFaculty, ILoginAdminBody, ILoginAdminItem, ILoginStudentBody, IStudentItem } from "../interface/Login.interface";

export const getLoginAdmin = async (body: ILoginAdminBody): Promise<ILoginAdminItem> => {
  const res = await api.post<ILoginAdminItem>(
    ApiConfig.LOGIN_ADMIN_API, body,
  );

  return res;
};

export const getLoginStudent = async (body: ILoginStudentBody): Promise<IStudentItem> => {
  const res = await api.post<IStudentItem>(
    ApiConfig.LOGIN_STUDENT_API, body,
  );

  return res;
};

export const getAllFaculty = async (): Promise<IFaculty[]> => {
  const res = await api.get<IFaculty[]>(
    ApiConfig.FACULTY_API + `/faculties-all`
  );
  return res;
};

export const CreateStudent = async (body: IStudentItem): Promise<any> => {
  const res = await api.post<IStudentItem>(
    ApiConfig.STUDENT_API + `/register`,
    body
  );

  return res;
};