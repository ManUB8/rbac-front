export interface ILoginAdminBody {
    username: string;
    password: string;
}

export interface ILoginStudentBody {
    student_id: string;
    password: string;
}

export type UserRole = "admin" | "student";

export interface IUser {
    user_id: string;
    username: string;
    account_type: UserRole;
    account_name: string;
    first_login: boolean;
    role_id: string;
    is_auto: boolean;
}

export interface ILoginAdminItem {
    access_token: string;
    refresh_token: string;
    user: IUser;
}

export interface IRegisterForm {
  name: string;
  studentId: string;
  username: string;
  password: string;
}

export interface IStudentRegister {
  student_id: string;
  prefix: string;
  first_name: string;
  last_name: string;
  citizen_id: string;
  gender: string;
  faculty_name: string;
  major_name: string;
  faculty_id: number;
  major_id: number;
  img_stu: string;
  user: IUserRegister;
}

export interface IUserRegister {
  username: string;
  password: string;
}

export interface IMajor {
  id: number;
  major_name: string;
}

export interface IFaculty {
  id: number;
  faculty_name: string;
  majors: IMajor[];
}