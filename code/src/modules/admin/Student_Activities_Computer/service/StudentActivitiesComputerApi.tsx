import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityFilterByDate, IActivityOption, ICheckInStudentActivityBody, ICheckOutStudentActivityBody, IStudentActivityCheckResponse } from "../interface/StudentActivitiesComputer.interface";


export const CheckInStudentActivitiesComputer = async (
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

export const CheckOutStudentActivitiesComputer = async (
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

export const getActivityFilterInfo = async (): Promise<IActivityOption[]> => {
    const res = await api.get<IActivityOption[]>(
        "/activity/v1/filter-info"
    );

    return res ;
};

export const getActivityFilter_BY_Date = async (): Promise<IActivityFilterByDate[]> => {
    const res = await api.get<IActivityFilterByDate[]>(
        ApiConfig.ACTIVITY_API + `/filter-info-by-date`
    );

    return res;
};