export interface IStudentActivityHistoryResponse {
    detail: string;
    data: IStudentActivityHistoryData;
}

export interface IStudentActivityHistoryData {
    joined_count: number;

    not_joined_count: number;

    checkin_count: number;

    checkout_count: number;

    total_hours: number;

    total_activity_count: number;

    join_rate_percent: number;

    checkout_rate_percent: number;

    activities: IStudentActivityHistoryItem[];
}

export interface IStudentActivityHistoryItem {
    activity_id: number;

    activity_name: string;

    activity_date: string;

    start_time: string;

    end_time: string;

    hours: number;

    location: string | null;

    description: string | null;

    activity_img: string | null;

    activity_status: boolean;

    attendance_status:
        | "เข้าร่วม"
        | "ไม่เข้าร่วม";

    checkin_at: number | null;

    checkout_at: number | null;
}