export interface IStudentReportRequest {
  search: string;
  student_code: string;
  year_status: string;
  faculty_id: string;
  major_id: string;
  hour_type: string;
  attendance_status: string;
}

export interface IStudentReportActivity {
  student_activity_id: number;
  activity_id: number;
  activity_name: string;
  activity_date: string;
  activity_time_text: string;
  location: string;
  activity_img: string | null;
  hours: number;
  hour_type_id: string | null;
  check_type: string;
  require_registration: boolean;
  max_participants: number | null;
  attendance_status: "เข้าร่วม" | "ไม่เข้าร่วม";
  registered_at: number | null;
  checkin_at: number | null;
  checkout_at: number | null;
}

export interface IStudentReportItem {
  student_id: number;
  student_code: string;
  full_name: string;
  first_name: string;
  last_name: string;
  faculty_id: number;
  faculty_name: string;
  major_id: number;
  major_name: string;
  year_status: string;
  total_activity: number;
  total_hours: number;
  activity: IStudentReportActivity[];
}

export interface IStudentReportResponse {
  detail: string;
  total_all: number;
  data: IStudentReportItem;
}

// new

export interface IStudentActivityAllResponse {
  detail: string;
  data: IStudentActivityAllData;
}

export interface IStudentActivityAllData {
  student_id: number;
  student_code: string;
  prefix: string | null;

  position_id: number | null;
  position_name: string | null;
  student_position_id: number | null;
  position_start_date: string | null;
  position_end_date: string | null;

  full_name: string;
  first_name: string;
  last_name: string;

  faculty_id: number;
  faculty_name: string;
  major_id: number;
  major_name: string;
  year_status: string;

  total_activity: number;
  total_hours: number;
  total_volunteer_hours: number;
  total_earned_hours: number;

  activity: IStudentActivityItem[];
}

export interface IStudentActivityItem {
  student_activity_id: number;
  activity_id: number;
  activity_name: string;
  activity_date: string;
  activity_time_text: string;
  location: string;
  activity_img: string;

  hours: number;
  volunteer_hours: number;
  hour_type_id: string;

  check_type: string;

  require_registration: boolean;
  max_participants: number;
  description?: string;

  check_detail: IStudentActivityCheckDetail;
}

export interface IStudentActivityCheckDetail {
  attendance_status: string;
  registered_at: number | null;
  earned_hours: number;
  volunteer_hours: number;

  checkin: IStudentActivityCheckin;
  checkout: IStudentActivityCheckout;
}

export interface IStudentActivityCheckin {
  checkin_at: number | null;
  checkin_status: "valid" | "manual" | null;
  checkin_status_text: string | null;
  checkin_lat: number | null;
  checkin_lng: number | null;
}

export interface IStudentActivityCheckout {
  checkout_at: number | null;
  checkout_status: "valid" | "manual" | null;
  checkout_status_text: string | null;
  checkout_lat: number | null;
  checkout_lng: number | null;
}

export interface IStudentActivitySummaryApiResponse {
    detail: string;
    data: IStudentActivitySummaryResponse;
}

export interface IStudentActivitySummaryResponse {
    student_id: number;
    student_code: string;
    prefix: string;

    position_id: number;
    position_name: string;
    student_position_id: number;
    position_start_date: string;
    position_end_date: string;

    full_name: string;
    first_name: string;
    last_name: string;

    faculty_id: number;
    faculty_name: string;

    major_id: number;
    major_name: string;

    year_status: string;

    total_activity: number;
    total_hours: number;
    total_volunteer_hours: number;
    total_earned_hours: number;

    activity: {
        student_activity_id: number;

        activity_id: number;
        activity_name: string;
        activity_date: string;
        activity_time_text: string;

        location: string;
        activity_img: string;
        description: string;

        start_time: string;
        end_time: string;

        hours: number;
        volunteer_hours: number;

        hour_type_id: string;

        check_type: string;
        target_group: string;

        require_registration: boolean;
        max_participants: number;

        check_detail: {
            attendance_status: string;
            registered_at: number;

            earned_hours: number;
            volunteer_hours: number;

            checkin: {
                checkin_at: number;
                checkin_status: string;
                checkin_status_text: string;
                checkin_lat: number;
                checkin_lng: number;
            };

            checkout: {
                checkout_at: number;
                checkout_status: string;
                checkout_status_text: string;
                checkout_lat: number;
                checkout_lng: number;
            };
        };
    }[];
}