import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityItem, IActivityListResponse, IStudentActivityRegister, IStudentActivityResponse, IStudentAvailableActivitiesResponse } from "../interface/Activity.interface";
import Cookies from "js-cookie";

export const getAllActivity = async (): Promise<IActivityListResponse> => {
    const res = await api.get<IActivityListResponse>(
        ApiConfig.ACTIVITY_API + `/get-all`
    );
    return res;
};

export const getAllActivityCode = async (code:number): Promise<IStudentAvailableActivitiesResponse> => {
   
    const res = await api.get<IStudentAvailableActivitiesResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/student/available/${code}`
    );

    return res;
};

export const RegisterStudentActivity = async (body: IStudentActivityRegister): Promise<any> => {
    const res = await api.post<any>(
        ApiConfig.STUDENT_ACTIVITY_API + `/register`,
        body
    );
    return res;
};