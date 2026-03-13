export interface ISearchContextPackage {
  search: string
  package_tier_code: string
  package_type_code: string
  billing_type_code: string
  page: string
  limit: string
  is_active: string
  is_asc?: boolean
}

export interface IPackageEnumResponse {
  package_types: IEnumPackageType[];
  package_tiers: IEnumPackageType[];
  billing_types: IEnumPackageType[];
}

export interface IEnumPackageType {
  code: string | number;
  name: string;
}

export interface IPackageType {
  code: string;
  name: string;
  // name: 'MAIN' | 'ADD_ON' | 'TOP_UP';
}

export interface IPackageTier {
  code: string;
  name: string;
  // name: 'STARTER' | 'STANDARD' | 'EXCLUSIVE';
}

export interface IBillingType {
  code: string;
  name: string;
  // name: 'SUBSCRIBE' | 'PAYG' | 'ONE_TIME';
}

export interface IPackageDataResponse {
  status_data: IStatusData[];
  data: IPackageItem[];
}

export interface IStatusData {
  labal: string;
  code: string;
  qty: number;
}

export interface IPackageData {
  package_id: string;                // รหัสแพ็กเกจ
  package_name: string;              // ชื่อแพ็กเกจ
  package_code: string;              // โค้ดแพ็กเกจ
  description: string;               // รายละเอียดแพ็กเกจ
  is_active: boolean;                // สถานะเปิดใช้งาน
  is_deleted: boolean;               // สถานะลบ
}


// export interface IPackageItem {
//   id: string;
//   package_name: string;
//   package_code: string;
//   package_type: number;
//   active_type: number;
//   active_name: string;
//   status: number;
//   actype?: 'create' | 'edit';
// }

// ===== โครงสร้างย่อย =====


export interface IPriceOption {
  is_selected: boolean;
  price: number;
}

export interface IProductDevicePermission {
  product_device_id: string;                // "1" | "2" | "3" | ...
  product_device_name: string;              // "erp" | "pos" | "mobile-staff" | ...
  pages: IPagePermission[];
  functions: IFunctionPermission[];
  is_selected: boolean;
}

export interface IPagePermission {
  page_id: string;
  page_name: string;
  page_code: string;
  main_page_id: string;
  product_device_id: string;
  product_device_name: string;
  priority: number;
  functions: IFunctionPermission[];
  sub_pages: IPagePermission[];              // recursive structure (can be [])
}

export interface IFunctionPermission {
  function_id: string;
  function_name: string;
  function_code: string;
  function_type: number;                    // e.g. 1
  function_type_name: string;               // e.g. "button"
  page_id: string;
  priority: number;
  is_approve: boolean;
}

export interface IDataMetric {
  id: string;
  owner_level: boolean;
  master_package_id: string;
  master_data_metric_id: string;
  master_name: string;
  scope: string;
  periodicity: {
    per_none: boolean;
    per_daily: boolean;
    per_monthly: boolean;
    per_yearly: boolean;
  };
  cap: number;
  token_rule: {
    enabled: boolean;
    token_per_unit: number;
  };
  notes: string;
  unit_default: string;
}

export interface IPackageItem {
  actype?: 'create' | 'edit';
  package_id: string;
  package_name: string;
  package_code: string;
  package_img: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  package_tier: IEnumPackageType
  package_type: IEnumPackageType
  compatible_package_ids: IPackageItemMain[];
  billing: IEnumPackageType[]
  price_daily: IPriceOption;
  price_monthly: IPriceOption;
  price_yearly: IPriceOption;
  product_device_permissions: IProductDevicePermission[];
  data_metric: IDataMetric[];
  human_readable_created_at: string;
  human_readable_updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface IPackageItemMain {
  actype?: 'create' | 'edit';
  package_id: string;
  package_name: string;
  package_code: string;
  is_active?: boolean;
  price_daily?: IPriceOption;
  price_monthly?: IPriceOption;
  price_yearly?: IPriceOption;
}

export const IPackageItemDefaul: IPackageItem = {
  package_id: "",
  package_name: "",
  package_code: "",
  package_img: "",
  description: "",
  is_active: true,
  is_deleted: false,
  package_tier: {
    code: "",
    name: ""
  },
  package_type: {
    code: "",
    name: ""
  },
  compatible_package_ids: [],
  billing: [],
  price_daily: {
    is_selected: false,
    price: 0
  },
  price_monthly: {
    is_selected: false,
    price: 0
  },
  price_yearly: {
    is_selected: false,
    price: 0
  },
  product_device_permissions: [],
  data_metric: [],
  human_readable_created_at: "",
  human_readable_updated_at: "",
  created_by: "",
  updated_by: ""
}