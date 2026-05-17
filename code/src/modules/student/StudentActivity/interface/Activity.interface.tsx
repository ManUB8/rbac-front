export interface IStudentActivityRegister {
    student_code: string;
    activity_id: number;
}

export interface IActivityListResponse {
    detail: string;
    data: IActivityItem[];
}

export interface IActivityItem {
    activity_id: number;
    activity_name: string;
    activity_date: string;
    start_time: string;
    end_time: string;
    hours: number;

    location: string;
    description: string;
    activity_img: string;

    activity_status: boolean;

    check_type: string;

    require_registration: boolean;

    max_participants: number;

    activity_lat: number;
    activity_lng: number;
    activity_radius_meter: number;

    created_by_id: number;
    created_by_name: string;

    updated_by_id: number;
    updated_by_name: string;

    created_at: number;
    updated_at: number;

    registered_count: number;

    register_text: string;

    is_full: boolean;
}

export interface IStudentActivityResponse {
    detail: string;
    student_code: string;
    data: IStudentActivityItem[];
}

export interface IStudentActivityItem {
    activity_id: number;

    activity_name: string;

    activity_date: string;

    activity_time_text: string;

    location: string | null;

    activity_img: string | null;

    check_type: string;

    require_registration: boolean;

    max_participants: number | null;

    registered_count: number;

    register_text: string | null;

    is_registered: boolean;

    is_full: boolean;

    button_text: string;

    button_status:
    | "can_join"
    | "full"
    | "registered"
    | "closed";
}