// EventRegistrants

export interface IEventRegistrantsRequest {
    activity_id: string;
    search: string;
    student_code: string;
    page: number;
    limit: number;
    year_status: string;
    faculty_id: string;
    major_id: string;
}

export interface IEventRegistrantsItem {
    student_activity_id: number;
    student_id: number;
    activity_id: number;

    student_code: string;
    full_name: string;
    faculty_name: string;
    major_name: string;
    year_status: string;

    activity_name: string;
    activity_date: string;
    activity_time_text: string;
    location: string;

    check_type: string;
    require_registration: boolean;
    max_participants: number;

    attendance_status: string;

    registered_at: number;

    checkin_at: number;
    checkout_at: number;

    checkin_lat: number;
    checkin_lng: number;

    checkout_lat: number;
    checkout_lng: number;

    created_by_id: number;
    created_by_name: string;

    updated_by_id: number;
    updated_by_name: string;

    created_at: number;
    updated_at: number;
}

export interface IEventRegistrantsAllInOneResponse {
    detail: string;
    total_all: number;
    page: number;
    limit: number;
    data: IEventRegistrantsItem[];
}

export interface IUpdateEventRegistrantsRequest {
    student_activity_id: number;
    activity_id: number;
    attendance_status: string;
    updated_by_name: string;
}

//  attendance_status: "เข้าร่วม" | "ไม่เข้าร่วม";

export interface IDeleteEventRegistrantsRequest {
    student_activity_id: number;
    updated_by_name: string;
}