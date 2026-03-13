export interface ISearchMasterSkuContext {
  page: string
  limit: string
  search: string
  sort_by: string
  status: string
  sub_category_ids: string[]
}

export type StatusOption = { label: string; value: number };
export type SortOption = { label: string; value: number };
export type SortGroup = { title: string; options: SortOption[] };

// ตัวเลือกใน group
export interface IGroupOption {
  group_id: string;
  group_code: string;
  group_name: string;
}

// ตัวเลือกใน sort_by
export interface ISortOption {
  key: string;
  value: string;
}

// กลุ่ม sort_by
export interface ISortBy {
  name: ISortOption[];
  code: ISortOption[];
  create_at: ISortOption[];
}

// sub_category ในแต่ละหมวด
export interface ISubCategory {
  sub_category_id: string;
  sub_category_name: string;
}

// category ใน filter_by
export interface ICategoryFilter {
  category_id: string;
  category_name: string;
  sub_category: ISubCategory[];
}

// status ที่ใช้ filter
export type StatusFilter = "active" | "inactive" | "all";

export interface IFilterBy {
  category: ICategoryFilter[];
  status: StatusFilter[];
}

// response ทั้งก้อน
export interface IMasterSkuFilterConfig {
  sort_by: ISortBy;
  filter_by: IFilterBy;
}

export interface IMasterItem {
  master_item_id: string;
  master_item_name: string;
  group_name: string;
  category_and_sub_category_name: string;
  stock_unit_per_small_unit: string;
  is_active: boolean;
}

export interface IMasterItemResponse {
  total_pages: string;
  total_items: string;
  items: IMasterItem[];
}

//create-info

// sub-category แต่ละตัว
export interface ISubCategory {
  sub_category_id: string;
  sub_category_name: string;
}

// category 1 บรรทัด (มีชื่อ + list sub_category)
export interface ICategoryItem {
  category_id: string;
  category_name: string;
  sub_category: ISubCategory[];
}

// หน่วยนับ
export interface IUnitItem {
  unit_id: string;
  unit_name: string;
}

// ประเภทการเก็บรักษา
export interface IStorageTypeItem {
  storage_type_id: string;
  storage_type_name: string;
}

// รวมทั้งหมดใน master item
export interface IMasterSkuItemCreate {
  master_item_code: string;
  categories: ICategoryItem[];
  units: IUnitItem[];
  storage_types: IStorageTypeItem[];
}

//Update
// ---------------- BASIC OBJECTS ----------------

export interface ICategoryInfo {
  category_id: string;
  category_name: string;
}

export interface ISubCategoryInfo {
  sub_category_id: string;
  sub_category_name: string;
}

export interface IGroupInfo {
  group_id: string;
  group_name: string;
  group_code: string;
}

export interface IStockUnitInfo {
  stock_unit_id: string;
  stock_unit_name: string;
  stock_unit_ratio: string;
}

export interface ISmallUnitInfo {
  priority: string;
  small_unit_id: string;
  small_unit_name: string;       // บาง response ไม่มี name
  small_unit_ratio: string;
}

export interface IWarehouseStorageTypeInfo {
  warehouse_storage_type_id: string;
  warehouse_storage_type_name?: string; // case 2 ไม่มี name
}

export interface IBranchStorageTypeInfo {
  branch_storage_type_id: string;
  branch_storage_type_name?: string; // case 2 ไม่มี name
}


// ---------------- MAIN INTERFACE ----------------
export interface IMasterSkuUpdateData {
  master_item_id: string;
  master_item_code: string;
  master_item_name: string;
  image: string;
  category_id: string;
  sub_category_id: string;
  group_id: string;
  stock_unit_id: string;
  stock_unit_ratio: string;
  small_units: ISmallUnitInfo[];
  warehouse_shelf_life: string;
  warehouse_storage_type_id: string;
  branch_shelf_life: string;
  branch_storage_type_id: string;
  is_active: boolean;
  updated_by: string;
}

export interface IMasterSkuData {
  master_item_id: string;
  master_item_code: string;
  master_item_name: string;
  image: string;
  category: ICategoryInfo;
  category_id: string;
  sub_category: ISubCategoryInfo;
  sub_category_id: string;
  group: IGroupInfo;
  group_id: string;
  stock_unit: IStockUnitInfo;
  stock_unit_id: string;
  stock_unit_ratio: string;
  small_units: ISmallUnitInfo[];
  warehouse_shelf_life: string;
  warehouse_storage_type: IWarehouseStorageTypeInfo;
  warehouse_storage_type_id: string;
  branch_shelf_life: string;
  branch_storage_type: IBranchStorageTypeInfo;
  branch_storage_type_id: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export const IMasterSkuDefaul: IMasterSkuData = {
  master_item_id: "",
  master_item_code: "",
  master_item_name: "",
  image: "",
  category: {
    category_id: "",
    category_name: ""
  },
  sub_category: {
    sub_category_id: "",
    sub_category_name: ""
  },
  group: {
    group_id: "",
    group_name: "",
    group_code: ""
  },
  stock_unit: {
    stock_unit_id: "",
    stock_unit_name: "",
    stock_unit_ratio: "1"
  },
  small_units: [
    {
      priority: '1',
      small_unit_id: '',
      small_unit_name: '',
      small_unit_ratio: '1',
    }
  ],
  warehouse_shelf_life: "",
  warehouse_storage_type: {
    warehouse_storage_type_id: ""
  },
  branch_shelf_life: "",
  branch_storage_type: {
    branch_storage_type_id: ""
  },
  is_active: true,
  category_id: "",
  sub_category_id: "",
  created_by: "",
  updated_by: "",
  group_id: "",
  stock_unit_id: "",
  warehouse_storage_type_id: "",
  branch_storage_type_id: "",
  stock_unit_ratio: "1"
}