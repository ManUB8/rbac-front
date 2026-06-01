export interface ICheckInStudentActivityBody {
  student_code: string;
  activity_id: number;
  created_by_name: string;
  checkin_lat: number ;
  checkin_lng: number ;
}
export interface ICheckOutStudentActivityBody {
  student_code: string;
  activity_id: number;
  updated_by_name: string;
  checkout_lng: number ;
  checkout_lat: number ;
}

export interface IStudentActivityCheckItem {
  student_activity_id: number;

  student_id: number;
  activity_id: number;

  student_code: string;
  full_name: string;

  activity_name: string;
  activity_date: string;
  activity_time_text: string;

  location: string | null;

  check_type: string;
  require_registration: boolean;
  max_participants: number | null;

  attendance_status: string;
  checkin_status: string | null;
  checkin_status_text: string | null;
  checkout_status: string | null;
  checkout_status_text: string | null;
  earned_hours: number | null;

  registered_at: number | null;

  checkin_at: number | null;
  checkout_at: number | null;

  checkin_lat: number | null;
  checkin_lng: number | null;

  checkout_lat: number | null;
  checkout_lng: number | null;

  created_by_id: number;
  created_by_name: string;

  updated_by_id: number;
  updated_by_name: string;

  created_at: number;
  updated_at: number;
}

export interface IStudentActivityCheckResponse {
  detail: string;
  data: IStudentActivityCheckItem;
}
