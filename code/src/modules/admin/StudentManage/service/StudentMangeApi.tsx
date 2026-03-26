import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IFacultyItem, IMajorItem, IStudentByMajorResponse, IStudentItem } from "../interface/StudentMange.interface";


export const getFacultyStudentMange = async (): Promise<IFacultyItem[]> => {
    const res = await api.get<IFacultyItem[]>(
        ApiConfig.STUDENT_API + `/get-all/faculties-student`
    );
    return res;
};

export const getMajorFaculty = async (faculty_id: number): Promise<IMajorItem[]> => {
    const res = await api.get<IMajorItem[]>(
        ApiConfig.STUDENT_API + `/get-all/major/${faculty_id}`
    );
    return res;
};

export const getStudentMange = async (major_id: number): Promise<IStudentByMajorResponse> => {
    const res = await api.get<IStudentByMajorResponse>(
        ApiConfig.STUDENT_API + `/get-all/student-major/${major_id}`
    );
    return res;
};
export const getOneStudent = async (student_id: number): Promise<IStudentItem> => {
    const res = await api.get<IStudentItem>(
        ApiConfig.STUDENT_API + `/get-one/${student_id}`
    );
    return res;
};

