export interface IFacultyItem {
  faculty_name: string;
  faculty_id: number;
  count_major: number;
  count_student: number;
}

export interface IMajorItem {
  major_name: string;
  major_id: number;
  count_student: number;
}

export interface IUserCredential {
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
  user: IUserCredential;
}

export interface IStudentByMajorResponse {
  detail: string;
  major_id: number;
  major_name: string;
  count_student: number;
  student: IStudentItem[];
}

export const IStudentDataDefule:IStudentItem ={
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
    img_stu: "",
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

export interface IStudentdelete {
  student_id: number;
  updated_by_name: string;
}
