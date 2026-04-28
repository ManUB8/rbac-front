import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityItem } from "../interface/Activity.interface";

export const getAllActivity = async (): Promise<IActivityItem[]> => {
    const res = await api.get<IActivityItem[]>(
        ApiConfig.ACTIVITY_API + `/get-all`
    );
    return res;
};