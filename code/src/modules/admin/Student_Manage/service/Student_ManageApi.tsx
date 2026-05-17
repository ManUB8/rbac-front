import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentItem, IStudentListResponse, IStudentSearch } from "../interface/Student_Manage.interface";


export const getAllStudent = async (body: IStudentSearch): Promise<IStudentListResponse> => {
    const res = await api.get<IStudentListResponse>(
        ApiConfig.STUDENT_API_V2 + `/get-all/filter`,
    {
      params: body,
    }
  );
    return res;
};

export const getOneStudent = async (student_id: number): Promise<IStudentItem> => {
    const res = await api.get<IStudentItem>(
        ApiConfig.STUDENT_API_V2 + `/get-one/${student_id}`
    );
    return res;
};

export const CreateStudent = async (body: IStudentItem): Promise<IStudentItem> => {
    const res = await api.post<IStudentItem>(
        ApiConfig.STUDENT_API_V2 + `/admin/create`,
        body
    );
    return res;
};

export const UpdateStudent = async (body: IStudentItem): Promise<IStudentItem> => {
    const res = await api.patch<IStudentItem>(
        ApiConfig.STUDENT_API_V2 + `/admin/update-stu/${body.student_id}`,
        body
    );
    return res;
};

export const DeleteStudent = async (body: any): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.STUDENT_API + `/delete/${body.student_id}`,
        {
            data: body
        }
        
    );
    return res;
};




