import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { ICheckInStudentActivityBody, ICheckOutStudentActivityBody, IStudentActivityCheckResponse } from "../interface/StudentActivities.interface";


export const CheckInStudentActivities = async (
    body: ICheckInStudentActivityBody
): Promise<IStudentActivityCheckResponse> => {
    const res = await api.post<IStudentActivityCheckResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/checkin`,
        body,
        {
            skipSwal: true,
        }
    );

    return res;
};

export const CheckOutStudentActivities = async (
    body: ICheckOutStudentActivityBody
): Promise<IStudentActivityCheckResponse> => {
    const res = await api.patch<IStudentActivityCheckResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/checkout`,
        body,
        {
            skipSwal: true,
        }
    );

    return res;
};

