export interface IActivityItem {
  activity_id: number;
  activity_name: string;
  activity_date: string; // "2026-03-25"
  start_time: string;    // "08.00"
  end_time: string;      // "12.00"
  hours: number;
  location: string;
  description: string;
  activity_img: string;
  activity_status: boolean;
  created_by_id: number;
  created_by_name: string;
  updated_by_id: number;
  updated_by_name: string;
  created_at: number;
  updated_at: number;
}

export const IActivityDataDefault:IActivityItem ={
    activity_id: 0,
    activity_name: "",
    activity_date: "",
    start_time: "",
    end_time: "",
    hours: 0,
    location: "",
    description: "",
    activity_img: "",
    activity_status: true,
    created_by_id: 0,
    created_by_name: "",
    updated_by_id: 0,
    updated_by_name: "",
    created_at: 0,
    updated_at: 0
}