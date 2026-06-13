import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityFilterByDate, ICheckInStudentActivityBody, ICheckOutStudentActivityBody, IStudentActivityCheckResponse } from "../interface/StudentActivitiesPhone.interface";


export const CheckInStudentActivitiesPhone = async (
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

export const CheckOutStudentActivitiesPhone = async (
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

export const getActivityFilter_BY_Date = async (): Promise<IActivityFilterByDate[]> => {
    const res = await api.get<IActivityFilterByDate[]>(
        ApiConfig.ACTIVITY_API + `/filter-info-by-date`
    );

    return res;
};

