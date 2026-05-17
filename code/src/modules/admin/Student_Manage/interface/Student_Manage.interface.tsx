export interface IStudentSearch {
    search: string;
    major_id: number;
    faculty_id: number;
    position_id: number;
    page: number;
    limit: number;
    year_status: string;

}

export interface IStudentListResponse {
    detail: string;
    page: number;
    limit: number;
    total_all: number;
    total_page: number;
    data: IStudentItem[];
}

export interface IStudentItem {
    student_id: number;
    student_code: string;
    prefix: string;
    first_name: string;
    last_name: string;
    gender: string;

    faculty_id: number;
    major_id: number;
    user_id: number;

    faculty_name: string;
    major_name: string;
    img_stu: string | null;

    position: IStudentPosition | null;
    year_status: string | null;

    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;

    created_at: number;
    updated_at: number;

    user: IStudentUser;
}

export interface IStudentPosition {
    position_id: number;
    position_name: string;
    start_date: string;
    end_date: string | null;
}

export interface IStudentUser {
    username: string;
    password: string;
}

export interface IYearType {
    label: string;
    id: string;
}

export const IStudenItemDefule:IStudentItem={
    student_id: 0,
    student_code: "",
    prefix: "",
    first_name: "",
    last_name: "",
    gender: "",
    faculty_id: 0,
    major_id: 0,
    user_id: 0,
    faculty_name: "",
    major_name: "",
    img_stu: null,
    position: null,
    year_status: null,
    created_by_id: 0,
    created_by_name: "",
    updated_by_id: 0,
    updated_by_name: "",
    created_at: 0,
    updated_at: 0,
    user: {
        username: "",
        password: ""
    }
}