import type { IBranchItem } from "../../branch/interface/Branch.interface"

export interface ISearchContext {
  owner_search: string
  owner_type_id: string
  user_type_id: string
  food_type_id: string
  count_active_type: string
  branch_type_id: string
  branch_active_type: string
  package_main_name: string
  addon_package_name: string
  sort: string
  page: number
  limit: number
}

export interface IFilterOwner {
  label: string
  value: string
  code: string
}

export interface IOwnerResponse {
  status_data: IStatusData[];
  limit: number;
  page: number;
  sort: string;
  total_rows: number;
  total_pages: number;
  rows: IOwnerItem[];
}

export interface IStatusData {
  labal: string;
  code: string;
  qty: number;
}

export interface IOwnerItem {
  id: string;
  owner_name: string;
  owner_code: string;
  user_type_name: string;
  user_type: string;
  user_type_id: string;
  branch_name: string;
  branch_main_id: string;
  active_type: number;
  phone: string;
  sales: string;
  lead_id: string;
  customer_id: string;
  email: string;
  password: string;
  confirm_password: string;
  active_name: string;
  status: number;
  owner_type_names: string[];
  owner_types_id: string[];
  food_type_names: string[];
  food_types_id: string[];
  branches: IBranchItem[];
  actype?: 'create' | 'edit';
}



export const IOwnerItemDefault: IOwnerItem = {
  id: "",
  owner_name: "",
  phone: "",
  sales: "",
  lead_id: "",
  customer_id: "",
  email: "",
  password: "",
  confirm_password: "",
  active_name: "",
  user_type_name: "",
  user_type: "",
  user_type_id: "",
  status: 1,
  owner_type_names: [],
  food_type_names: [],
  branches: [],
  owner_code: "",
  branch_name: "",
  branch_main_id: "",
  active_type: 1,
  owner_types_id: [],
  food_types_id: []
}