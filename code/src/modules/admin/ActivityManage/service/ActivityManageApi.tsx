import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityDelete, IActivityFilter, IActivityFilterAll, IActivityFilterByDate, IActivityItem, IActivityListResponse, IActivitySearch } from "../interface/ActivityManage.interface";


export const getAllActivity = async (body: IActivitySearch): Promise<IActivityListResponse> => {
    const res = await api.post<IActivityListResponse>(
        ApiConfig.ACTIVITY_API + `/admin/get-all`, body
    );
    return res;
};

export const getOneActivity = async (activity_id: number): Promise<IActivityItem> => {
    const res = await api.get<IActivityItem>(
        ApiConfig.ACTIVITY_API + `/get-one/${activity_id}`
    );
    return res;
};

export const getActivityStatusTrue = async (): Promise<IActivityItem[]> => {
    const res = await api.get<IActivityItem[]>(
        ApiConfig.ACTIVITY_API + `/get-all`
    );
    return res;
};


export const UpdateActivity = async (body: IActivityItem): Promise<IActivityItem> => {
    const res = await api.patch<IActivityItem>(
        ApiConfig.ACTIVITY_API + `/update/${body.activity_id}`,
        body
    );
    return res;
};

export const DeleteActivity = async (body: IActivityDelete): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.ACTIVITY_API + `/delete/${body.activity_id}`,
        {
            data: body,
        }
    );
    return res;
};

export const CreateActivity = async (body: IActivityItem): Promise<IActivityItem> => {
    const res = await api.post<IActivityItem>(
        ApiConfig.ACTIVITY_API + `/create`,
        body
    );
    return res;
};


export const getActivityFilter = async (): Promise<IActivityFilter[]> => {
    const res = await api.get<IActivityFilter[]>(
        ApiConfig.ACTIVITY_API + `/filter-info`
    );
    return res;
};


export const getActivityFilter_BY_Date = async (): Promise<IActivityFilterByDate[]> => {
    const res = await api.get<IActivityFilterByDate[]>(
        ApiConfig.ACTIVITY_API + `/filter-info-by-date`
    );

    return res;
};

export const getActivityFilterAll = async (): Promise<IActivityFilterAll> => {
    const res = await api.get<IActivityFilterAll>(
        ApiConfig.ACTIVITY_API + `/filter-all`
    );
    return res;
};
