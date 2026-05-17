import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IFacultyItem, IMajorItem, IStudentByMajorResponse, IStudentdelete, IStudentItem } from "../interface/StudentMange.interface";


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

export const UpdateStudent = async (body: IStudentItem): Promise<IStudentItem> => {
    const res = await api.patch<IStudentItem>(
        ApiConfig.STUDENT_API + `/admin/update-stu/${body.student_id}`,
        body
    );
    return res;
};

export const DeleteStudent = async (body: IStudentdelete): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.STUDENT_API + `/delete/${body.student_id}`,
        {
            data: body
        }
        
    );
    return res;
};

export const CreateStudent = async (body: IStudentItem): Promise<IStudentItem> => {
    const res = await api.post<IStudentItem>(
        ApiConfig.STUDENT_API + `/admin/create`,
        body
    );
    return res;
};



