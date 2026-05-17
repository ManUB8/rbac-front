import { atom } from "jotai";
import type { IStudentSearch } from "../interface/Student_Manage.interface";

export const searchStateStudent = atom<IStudentSearch>({
    search: '',
    major_id: 0,
    faculty_id: 0,
    position_id: 0,
    page: 1,
    limit: 20,
    year_status: ''
});

