export interface ICheckInStudentActivityBody {
  student_code: string;
  activity_id: number;
  created_by_name: string;
  checkin_lat: number;
  checkin_lng: number;
}
export interface IActivityFilter {
  id: number;
  name: string;
  target_group: TargetGroupFilter;
  start_date: string;
  end_date: string;
}

export interface IActivityOption {
  id: number;
  name: string;
  target_group?: TargetGroupFilter;
  start_date?: string;
  end_date?: string;
}


export interface ICheckOutStudentActivityBody {
  student_code: string;
  activity_id: number;
  updated_by_name: string;
  checkout_lng: number;
  checkout_lat: number;
}

export interface IStudentActivityCheckResponse {
  detail: string;
  data: IStudentActivityCheckItem;
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

  faculty_name: string;
  major_name: string;
  year_status: string;
  prefix: string | null;
  start_date: string;
  end_date: string;
  target_group: "freshman" | "senior" | "all";

  check_type: string;
  require_registration: boolean;
  max_participants: number | null;

  hours: number;
  volunteer_hours: number;

  check_detail: IStudentActivityCheckDetail;

  created_by_id: number | null;
  created_by_name: string | null;
  updated_by_id: number | null;
  updated_by_name: string | null;

  created_at: number | null;
  updated_at: number | null;
}

export interface IStudentActivityCheckDetail {
  attendance_status: string;
  registered_at: number | null;
  earned_hours: number;
  volunteer_hours: number;

  checkin: IStudentActivityCheckIn;
  checkout: IStudentActivityCheckOut;
}

export interface IStudentActivityCheckIn {
  checkin_at: number | null;
  checkin_status: string | null;
  checkin_status_text: string | null;
  checkin_lat: number | null;
  checkin_lng: number | null;
}

export interface IStudentActivityCheckOut {
  checkout_at: number | null;
  checkout_status: string | null;
  checkout_status_text: string | null;
  checkout_lat: number | null;
  checkout_lng: number | null;
}

export type TargetGroupFilter = "freshman" | "senior" | "all" | null ;

export interface IActivityFilterByDateParams {
    start_date: string;
    end_date: string;
    target_group: TargetGroupFilter;
    activity_date?: string;
}

export interface IActivityFilterByDateResponse {
  detail : string;
  data: IActivityFilterByDate[];
}

export interface IActivityFilterByDate {
    activity_id: number;
    activity_name: string;
    activity_date: string;
    start_time: string;
    end_time: string;
    location: string;

    check_type: "checkin_only" | "checkout_only" | "checkin_checkout";
    target_group: TargetGroupFilter;

    activity_lat: number;
    activity_lng: number;
    activity_radius_meter: number;

    require_registration: boolean;
    max_participants: number | null;
    registered_count: number;
    register_text: string | null;
    is_full: boolean;
}