export interface IActivityItem {
    activity_id: number;
    activity_name: string;
    activity_date: string; // "YYYY-MM-DD"

    start_time: string; // "08.00"
    end_time: string;   // "12.00"
    hours: number;

    location: string;
    description: string;

    activity_img: string;
    activity_status: boolean;

    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;

    created_at: number; // unix time
    updated_at: number; // unix time
}