import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentYearSummaryBody, IStudentYearSummaryResponse } from "../interface/StudentYearSummary.interface";


export const getAllStudentYearReport = async (
    body: IStudentYearSummaryBody
): Promise<IStudentYearSummaryResponse> => {

    const res = await api.get<IStudentYearSummaryResponse>(
        ApiConfig.STUDENT_API_V2 + "/summary/year-code",
        {
            params: body,
        }
    );

    return res;
};
