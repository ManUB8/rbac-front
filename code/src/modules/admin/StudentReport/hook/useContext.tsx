import { atom } from "jotai";
import type { IStudentReportRequest } from "../interface/StudentReport.interface";


export const searchStateStudentReport = atom<IStudentReportRequest>({
    search: "",
    student_code: "",
    year_status: "",
    faculty_id: "",
    major_id: "",
    hour_type: "",
    attendance_status: "",
});


