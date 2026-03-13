import type { IPackageTier, IPackageType } from "../../product&services/package_services/interface/PackageServices.interface";
import type { IFilterBranchType } from "./BranchType.interface";

// ข้อมูลที่อยู่สาขา
export interface IAddressBranch {
  id: string;
  address_line: string;     // ที่อยู่รวม
  house_number: string;     // บ้านเลขที่
  sub_district_id: number;     // ตำบล / แขวง
  district_id: number;         // อำเภอ / เขต
  province_id: number;         // จังหวัด
  sub_district_name: string;     // ตำบล / แขวง
  district_name: string;         // อำเภอ / เขต
  province_name: string;         // จังหวัด
  zip_code: string;      // รหัสไปรษณีย์
  latitude: number;         // ละติจูด
  longitude: number;        // ลองจิจูด
  google_place_id: string ;
  google_maps_url: string ;
}


export interface ISubscription {
  subscription_id?: string;
  owner_id: string;
  branch_id: string;
  status?: string;          // "ACTIVE"
  auto_renew: boolean;
  start_at: number;        // unix seconds
  end_at: number;          // unix seconds
  items: ISubscriptionItem[];
}

export interface ISubscriptionItem {
  // subscription_item_id?: string;
  // subscription_id?: string;
  package_id: string;
  package_name?: string;
  // package_code?: string;
  // package_type?: IPackageType;  // MAIN / ADD_ON
  // package_tier?: IPackageTier;  // STARTER / STANDARD
  price: number;
  periodicity: IPackagePeriodicity;
  // status?: IStatus;             // ACTIVE
  start_at: number;
  end_at: number;
  compatible_main_package_id: string;
}

export interface IStatus {
  code: number;
  name: string;   // "ACTIVE"
}

export interface IPackageRequest {
  owner_id: string;
  branch_id: string;
  auto_renew: boolean;
  items: IPackageRequestItem[];
}

export interface IPackageRequestItem {
  package_id: string;
  start_at: number;     // Unix timestamp (seconds)
  end_at: number;       // Unix timestamp (seconds)
  price: number;
  compatible_main_package_id: string;
  periodicity: IPackagePeriodicity;
}

export interface IPackagePeriodicity {
  daily: boolean;
  monthly: boolean;
  yearly: boolean;
}

export interface IPackageSummary {
  package_name_main: string;
  start_date: string;       // dd/mm/yyyy
  end_date: string;      
  price: number;
  add_pk_Count: number;
  add_pk: IAddPackage[];
  id?: string;
  package_main_name?: string;
  addon_count?: number;
  total_price?: number;
  start_at?: string;
  end_at?: string;
  unit_price?: string;
  payment_status?: string;
  addons?: IAddPackage[];
}

export interface IAddPackage {
  id?: string;
  name: string;
}

export interface IBranchItem {
  id: string;
  temp_id?: string;
  branch_name: string;
  branch_code: string;
  branch_type_id: string;
  branch_latitude: number;
  branch_longitude: number;
  business_info_id: string;
  business_info: string; // ถ้ารู้โครงสร้างให้แทนที่ unknown
  owner_id: string;             // รหัสเจ้าของ
  name: string;                 // ชื่อสาขา
  address_id: string;           // รหัสที่อยู่
  address: IAddressBranch;            // ข้อมูลที่อยู่
  username: string;             // ชื่อผู้ใช้สำหรับระบบ
  branch_type: IFilterBranchType;     // ประเภทสาขา
  active_type: number;          // สถานะการใช้งาน (เช่น 0=ปิด, 1=เปิด)
  pos_id: string | null;        // รหัส POS ถ้ามี
  image: string;                // ลิงก์รูปภาพสาขา
  is_branch_main: boolean;      // เป็นสาขาหลักหรือไม่
  contacts: any[];              // รายชื่อผู้ติดต่อ (เปลี่ยน any เป็น interface ถ้ารู้โครงสร้าง)
  opening_hours: any[];         // เวลาเปิดทำการ (เปลี่ยน any เป็น interface ถ้ารู้โครงสร้าง)
  package_id: string;
  password: string;
  confirm_password: string;
  pin: string;
  confirm_pin: string;
  branch_house_number: string;
  sub_district_id: number;     // ตำบล / แขวง
  district_id: number;         // อำเภอ / เขต
  province_id: number;
  branch_postcode: string;
  merchant_id: string;
  active_name: string;
  duration: number;
  add_on_package_names: string;
  addon_count: number;
  total_price: number;
  end_at: string;
  start_at: string;
  package_main_name: string;
  payment_status: string;
  unit_price: string;
  package_request: IPackageRequest;
  package_summary: IPackageSummary;
  nats_subscription?: ISubscription;
  actype?: 'create' | 'edit';
}


export const IBranchItemDefault: IBranchItem = {
  id: "",
  branch_name: "",
  branch_code: "",
  branch_type_id: "",
  branch_latitude: 0,
  branch_longitude: 0,
  package_id: "",
  is_branch_main: false,
  image: "",
  username: "",
  password: "",
  branch_house_number: "",
  branch_postcode: "",
  merchant_id: "",
  active_name: "",
  active_type: 1,
  duration: 0,
  payment_status: "",
  business_info_id: "",
  business_info: "",
  owner_id: "",
  name: "",
  address_id: "",
  address: {
    id: "",
    address_line: "",
    house_number: "",
    zip_code: "",
    latitude: 0,
    longitude: 0,
    google_place_id: '',
    google_maps_url: '',
    sub_district_id: 0,
    district_id: 0,
    province_id: 0,
    sub_district_name: "",
    district_name: "",
    province_name: ""
  },
  branch_type: {
    id: "",
    name: "",
    code: ""
  },
  pos_id: null,
  contacts: [],
  opening_hours: [],
  confirm_password: "",
  pin: '',
  confirm_pin: "",
  temp_id: "",
  sub_district_id: 0,
  district_id: 0,
  province_id: 0,
  package_request: {
    owner_id: "",
    branch_id: "",
    auto_renew: true,
    items: []
  },
  package_summary: {
    package_name_main: "",
    start_date: "",
    end_date: "",
    price: 0,
    unit_price: "",
    payment_status: "รอชำระเงิน",
    add_pk_Count: 0,
    add_pk: [],
  },
  nats_subscription: {
    owner_id: "",
    branch_id: "",
    auto_renew: true,
    start_at: 0,
    end_at: 0,
    items: []
  },
  add_on_package_names: "",
  addon_count: 0,
  total_price: 0,
  end_at: "",
  start_at: "",
  package_main_name: "",
  unit_price: ""
}