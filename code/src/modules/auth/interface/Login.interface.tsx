export interface ILoginAdminBody {
  username: string;
  password: string;
}

export interface ILoginStudentBody {
  username: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  detail?: string;
}

export type UserRole = "admin" | "temporary_admin" | "student";

export interface ILoginAdminItem {
  user_id: string;
  username: string;
  name:string;
  role: "admin" | "temporary_admin";
}

export interface IMajor {
  major_id: number;
  major_name: string;
}

export interface IFaculty {
  faculty_id: number;
  faculty_name: string;
  majors: IMajor[];
}

export interface IUserCredential {
  username: string;
  password: string;
  confirm_password: string;
}

export interface IStudentItem {
  student_id: number;
  student_code: string;
  year_status: string;
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
  user: IUserCredential;
}
