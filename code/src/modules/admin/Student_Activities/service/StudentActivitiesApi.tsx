import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentActivityBody, IStudentActivityResponse } from "../interface/StudentActivities.interface";


export const CreateStudentActivities = async (body: IStudentActivityBody): Promise<IStudentActivityResponse> => {
    const res = await api.post<IStudentActivityResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/create`, body
    );
    return res;
};



