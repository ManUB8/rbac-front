import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentReportRequest, IStudentReportResponse } from "../interface/StudentReport.interface";


export const getAllStudentReport = async (body: IStudentReportRequest): Promise<IStudentReportResponse> => {
    const res = await api.post<IStudentReportResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/admin/get-allinone`, body
    );
    return res;
};

