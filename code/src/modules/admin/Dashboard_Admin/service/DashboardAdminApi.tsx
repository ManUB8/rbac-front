import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityDashboardResponse } from "../interface/DashboardAdmin.interface";

export const getAllDashboardAdmin = async (activity_id: number): Promise<IActivityDashboardResponse> => {
    const res = await api.get<IActivityDashboardResponse>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}`
  );
    return res;
};



