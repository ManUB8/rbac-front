export interface IStudentYearSummaryBody{
    year_status: string;
    student_code_prefix: string;
}

export interface IMajorStudentCount {
    major_id: number;
    major_name: string;
    count_student: number;
}

export interface IFacultyStudentCount {
    faculty_id: number;
    faculty_name: string;
    count_student: number;
    majors: IMajorStudentCount[];
}

export interface IStudentYearSummaryResponse {
    detail: string;
    year_status: string;
    student_code_prefix: string;
    count_student: number;
    faculty: IFacultyStudentCount[];
}