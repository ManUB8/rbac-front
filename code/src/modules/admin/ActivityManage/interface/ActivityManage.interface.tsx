export interface IActivitySearch {
  search: string;
  page: number;
  limit: number;
  activity_status: string;
  check_type: string
  require_registration: string;
  hour_type_id: string;
}

export interface IHourType {
  hour_type_id: string;
  hour_type_name: string;
}

export interface IActivityItem {
  activity_id: number;

  activity_name: string;
  activity_date: string;

  start_time: string;
  end_time: string;
  hour_type_id: string;
  hour_type: IHourType;

  hours: number;
  volunteer_hours: number | null;

  location: string;
  description: string;

  activity_img: string;

  activity_status: boolean;

  check_type: string;
  checkin_open_time: string | null;
  checkin_close_time: string | null;
  checkout_open_time: string | null;
  checkout_close_time: string | null;

  require_registration: boolean;

  max_participants: number | null;

  activity_lat: number | null;
  activity_lng: number | null;

  activity_radius_meter: number;

  created_by_id: number;
  created_by_name: string;

  updated_by_id: number;
  updated_by_name: string;

  created_at: number;
  updated_at: number;

  registered_count: number;

  register_text: string | null;

  is_full: boolean;
}

export interface IActivityListResponse {
  total_activity: number;

  total_active_activity: number;
  total_inactive_activity: number;

  activity: IActivityItem[];
}
export const IActivityDataDefault: IActivityItem = {
  activity_id: 0,
  activity_name: "",
  activity_date: "",
  start_time: "",
  end_time: "",
  hours: 0,
  volunteer_hours: 0,
  location: "",
  description: "",
  activity_img: "",
  activity_status: false,
  check_type: "",
  checkin_open_time: "",
  checkin_close_time: "",
  checkout_open_time: "",
  checkout_close_time: "",
  require_registration: false,
  max_participants: 0,
  activity_lat: 0,
  activity_lng: 0,
  activity_radius_meter: 0,
  created_by_id: 0,
  created_by_name: "",
  updated_by_id: 0,
  updated_by_name: "",
  created_at: 0,
  updated_at: 0,
  registered_count: 0,
  register_text: '',
  is_full: false,
  hour_type_id: "",
  hour_type: {
    hour_type_id: "",
    hour_type_name: ""
  }
}

export interface IActivityDelete {
  activity_id: number;
  updated_by_name: string;
}
// "checkin" | "checkout" | "checkin_checkout"

export interface ICheckType {
  id: string;
  label: string;
}

export interface IActivityType {
  id: string;
  label: string;
}

export interface IActivityFilter {
  id: number;
  name: string;
  code: string;
}

export interface IActivityFilterAll {
  hour_type: IActivityType[];
  check_type: IActivityType[];
  activity_status: IActivityType[];
  require_registration: IActivityType[];
}
