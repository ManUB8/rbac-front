import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IActivityDashboardResponse, IActivityRankItem, IFacultyRankItem, IFacultySummary, IMajorRankItem, IStudentSummaryResponse, IYearCount } from "../interface/DashboardAdmin.interface";

interface IDashboardListResponse<T> {
    detail: string;
    data: T[];
}

const resolveDashboardList = <T,>(res: T[] | IDashboardListResponse<T>): T[] => {
    return Array.isArray(res) ? res : res.data ?? [];
};

const yearStatusParams = (yearStatus: string) => ({
    params: {
        year_status: yearStatus,
    },
});

export const getAllDashboardAdmin = async (activity_id: number): Promise<IActivityDashboardResponse> => {
    const res = await api.get<IActivityDashboardResponse>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}`
  );
    return res;
};

export const getAllYear = async (): Promise<IStudentSummaryResponse> => {
    const res = await api.get<IStudentSummaryResponse>(
        ApiConfig.STUDENT_API_V2 + `/summary/year/${'ปี 1'}`
  );
    return res;
};

export const getAllDashboardAdminSum = async (activity_id: number, yearStatus: string): Promise<IActivityDashboardResponse> => {
    const res = await api.get<IActivityDashboardResponse>(
        ApiConfig.DASHBOARD_API + `/admin/sum/${activity_id}`,
        yearStatusParams(yearStatus)
  );
    return res;
};

export const getAllDashboardAdminActivityRank = async (activity_id: number, yearStatus: string): Promise<IActivityRankItem[]> => {
    const res = await api.get<IActivityRankItem[] | IDashboardListResponse<IActivityRankItem>>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}/activity-rank`,
        yearStatusParams(yearStatus)
  );
    return resolveDashboardList(res);
};
export const getAllDashboardAdminYearCount = async (activity_id: number, yearStatus: string): Promise<IYearCount[]> => {
    const res = await api.get<IYearCount[] | IDashboardListResponse<IYearCount>>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}/year-count`,
        yearStatusParams(yearStatus)
  );
    return resolveDashboardList(res);
};
export const getAllDashboardAdminFacultyRank = async (activity_id: number, yearStatus: string): Promise<IFacultyRankItem[]> => {
    const res = await api.get<IFacultyRankItem[] | IDashboardListResponse<IFacultyRankItem>>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}/faculty-rank`,
        yearStatusParams(yearStatus)
  );
    return resolveDashboardList(res);
};
export const getAllDashboardAdminMajorRank = async (activity_id: number, yearStatus: string): Promise<IMajorRankItem[]> => {
    const res = await api.get<IMajorRankItem[] | IDashboardListResponse<IMajorRankItem>>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}/major-rank`,
        yearStatusParams(yearStatus)
  );
    return resolveDashboardList(res);
};
export const getAllDashboardAdminFacultySummary = async (activity_id: number, yearStatus: string): Promise<IFacultySummary[]> => {
    const res = await api.get<IFacultySummary[] | IDashboardListResponse<IFacultySummary>>(
        ApiConfig.DASHBOARD_API + `/admin/${activity_id}/faculty`,
        yearStatusParams(yearStatus)
  );
    return resolveDashboardList(res);
};
