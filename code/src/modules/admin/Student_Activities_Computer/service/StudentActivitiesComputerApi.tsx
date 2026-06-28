import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityFilterByDate, IActivityFilterByDateParams, IActivityFilterByDateResponse, IActivityOption, ICheckInStudentActivityBody, ICheckOutStudentActivityBody, IStudentActivityCheckResponse } from "../interface/StudentActivitiesComputer.interface";


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

    return res;
};

export const getActivityFilter_BY_Date = async (
    params: IActivityFilterByDateParams
): Promise<IActivityFilterByDate[]> => {
    const queryParams: Record<string, string> = {
        start_date: params.start_date,
        end_date: params.end_date,
        target_group: params.target_group || "all",
    };

    if (params.activity_date?.trim()) {
        queryParams.activity_date = params.activity_date.trim();
    }

    const res = await api.get<IActivityFilterByDateResponse>(
        ApiConfig.ACTIVITY_API + `/filter-by-date`,
        {
            params: queryParams,
        }
    );

    return res.data;
};