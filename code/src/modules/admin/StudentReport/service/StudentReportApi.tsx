import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentActivityAllData, IStudentActivityAllResponse, IStudentActivitySummaryApiResponse, IStudentActivitySummaryResponse, IStudentReportRequest, IStudentReportResponse } from "../interface/StudentReport.interface";


export const getAllStudentReport = async (body: IStudentReportRequest): Promise<IStudentActivitySummaryApiResponse> => {
    const res = await api.post<IStudentActivitySummaryApiResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/admin/get-allinone`, body
    );
    return res;
};

