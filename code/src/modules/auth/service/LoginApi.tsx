import { ApiConfig } from "../../../shared/service/ApiConfig";
import { api } from "../../../shared/service/axiosInstance";
import type { IFaculty, ILoginAdminBody, ILoginAdminItem, IStudentRegister } from "../interface/Login.interface";

export const getLoginAdmin = async ( body: ILoginAdminBody ): Promise<ILoginAdminItem> => {
  const res = await api.post<ILoginAdminItem>(
    ApiConfig.LOGIN_API,
    body,
    {
      skipSwal: true, 
    }
  );

  return res;
};

export const getAllFaculty = async ( ): Promise<IFaculty[]> => {
  const res = await api.get<IFaculty[]>(
    ApiConfig.FACULTY_API
  );
  return res;
};

export const CreateStudent = async ( body: IStudentRegister ): Promise<any> => {
  const res = await api.post<IStudentRegister>(
    ApiConfig.STUDENT_API,
    body
  );

  return res;
};