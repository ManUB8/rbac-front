export interface IStudentReportRequest {
    search: string;
    student_code: string;
    year_status: string;
    faculty_id: string;
    major_id: string;
    hour_type: string;
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