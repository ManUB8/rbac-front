import Cookies from "js-cookie";
import { api } from "../../../../../shared/service/axiosInstance";
import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import type { IStudentActivityHistoryResponse } from "../interface/ActivitySummary.interface";

export const getActivitySummaryDashboard = async (code:number): Promise<IStudentActivityHistoryResponse> => {
    const res = await api.get<IStudentActivityHistoryResponse>(
        ApiConfig.DASHBOARD_API + `/student/${code}`
    );

    return res;
};