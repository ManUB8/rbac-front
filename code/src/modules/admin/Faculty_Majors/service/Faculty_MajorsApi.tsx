import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IFacultyBody, IFaculty_MajorsItem, IMajorsBody, } from "../interface/Faculty_Majors.Interface";

export const getAllFaculty_Majors = async (): Promise<IFaculty_MajorsItem[]> => {
    const res = await api.get<IFaculty_MajorsItem[]>(
        ApiConfig.FACULTY_API + `/faculties-all`
    );
    return res;
};

// ------------------
// Faculty
// ------------------

export const getOneFaculty = async (faculty_id: number): Promise<IFacultyBody> => {
    const res = await api.get<IFacultyBody>(
        ApiConfig.FACULTY_API + `/get-one/faculties/${faculty_id}`
    );
    return res;
};


export const UpdateFaculty = async (body: IFacultyBody): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.FACULTY_API + `/update/faculties/${body.faculty_id}`,
        body
    );
    return res;
};

export const DeleteFaculty = async (body: IFacultyBody): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.FACULTY_API + `/delete/faculties/${body.faculty_id}`,
        {
            data: body,
        }
    );
    return res;
};

export const CreateFaculty = async (body: IFacultyBody): Promise<any> => {
    const res = await api.post<any>(
        ApiConfig.FACULTY_API + `/faculties`,
        body
    );
    return res;
};


// ------------------
// MAJOR
// ------------------

export const getOneMajors = async (major_id: number): Promise<IFacultyBody> => {
    const res = await api.get<IFacultyBody>(
        ApiConfig.FACULTY_API + `/get-one/majors/${major_id}`
    );
    return res;
};

export const UpdateMajors = async (body: IFacultyBody): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.FACULTY_API + `/majors/${body.major_id}`,
        body
    );
    return res;
};

export const DeleteMajors = async (body: IFacultyBody): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.FACULTY_API + `/delete/majors/${body.major_id}`,
        {
            data: body,
        }
    );
    return res;
};


export const CreateMajors = async (body: IFacultyBody): Promise<any> => {
    const res = await api.post<any>(
        ApiConfig.FACULTY_API + `/majors`,
        body
    );
    return res;
};
