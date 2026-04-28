export interface IUserLogin {
    username: string;
    password: string;
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
    img_stu: string;

    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;

    created_at: number;
    updated_at: number;

    user: IUserLogin;
}