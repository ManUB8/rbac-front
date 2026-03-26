export interface IStudentActivityItem {
  student_activity_id: number;
  student_id: number;
  activity_id: number;
  student_code: string;
  full_name: string;
  activity_name: string;
  activity_date: string;
  activity_time_text: string;
  location: string;
  attendance_status: string; // "เข้าร่วม"
  registered_at: number;
  registered_at_text: string;
  checkin_at: number;
  created_by_id: number;
  created_by_name: string;
  updated_by_id: number;
  updated_by_name: string;
  created_at: number;
  updated_at: number;
}

export interface IStudentActivityResponse {
  detail: string;
  data: IStudentActivityItem;
}

export interface IStudentActivityBody {
  student_code: string;
  activity_id: number;
  created_by_name: string;
}