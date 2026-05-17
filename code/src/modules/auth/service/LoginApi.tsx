import { ApiConfig } from "../../../shared/service/ApiConfig";
import { api } from "../../../shared/service/axiosInstance";
import type { IFacultyMajorResponse } from "../../admin/Faculty_Majors/interface/Faculty_Majors.Interface";
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

export const getAllFaculty = async (): Promise<IFacultyMajorResponse> => {
  const res = await api.get<IFacultyMajorResponse>(
    ApiConfig.FACULTY_API + `/faculties-all`
  );
  return res;
};

export const CreateStudent_v1 = async (body: IStudentItem): Promise<any> => {
  const res = await api.post<IStudentItem>(
    ApiConfig.STUDENT_API + `/register`,
    body
  );

  return res;
};
export const CreateStudent = async (body: IStudentItem): Promise<any> => {
  const res = await api.post<IStudentItem>(
    ApiConfig.STUDENT_API_V2 + `/register`,
    body
  );

  return res;
};