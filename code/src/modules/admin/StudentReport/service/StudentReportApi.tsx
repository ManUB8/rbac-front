import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentActivityAllData, IStudentActivityAllResponse, IStudentReportRequest, IStudentReportResponse } from "../interface/StudentReport.interface";


export const getAllStudentReport = async (body: IStudentReportRequest): Promise<IStudentActivityAllResponse> => {
    const res = await api.post<IStudentActivityAllResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/admin/get-allinone`, body
    );
    return res;
};

