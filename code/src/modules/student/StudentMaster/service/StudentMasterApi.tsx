import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IStudentItem } from "../../../auth/interface/Login.interface";

export const getOneStudent = async (student_id: number): Promise<IStudentItem> => {
    const res = await api.get<IStudentItem>(
        ApiConfig.STUDENT_API + `/get-one/${student_id}`
    );
    return res;
};


