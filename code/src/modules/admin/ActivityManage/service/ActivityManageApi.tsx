import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityItem } from "../interface/ActivityManage.interface";


export const getAllActivity = async (): Promise<IActivityItem[]> => {
    const res = await api.get<IActivityItem[]>(
        ApiConfig.ACTIVITY_API + `/get-all`
    );
    return res;
};

export const getOneActivity = async (activity_id: number): Promise<IActivityItem> => {
    const res = await api.get<IActivityItem>(
        ApiConfig.ACTIVITY_API + `/get-one/${activity_id}`
    );
    return res;
};

export const getActivityStatus = async (): Promise<IActivityItem[]> => {
    const res = await api.get<IActivityItem[]>(
        ApiConfig.ACTIVITY_API + `/get-all`
    );
    return res;
};


