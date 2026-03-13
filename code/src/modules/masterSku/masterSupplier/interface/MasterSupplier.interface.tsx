export interface ITabSelect {
    value: number;
    label: string;
}
[];

export type DropDownOption = { label: string; value: number };
export type SortOption = { label: string; value: number };
export type SortGroup = { title: string; options: SortOption[] };

export interface ISupplierStatus {
    value: number;
    label: string;
}

export interface ISupplierItem {
    id: number;
    code: string;
    name: string;
    TypeOfBusiness: string;
    businessType: string;
    total: string; // ถ้าอยากให้เป็น number เปลี่ยนได้
    status: ISupplierStatus;
}

export interface IGetAllSupplier {
    total: number;
    list: ISupplierItem[];
}

//------------------------------------------------------------------------

export interface IProductStatus {
    value: number;
    label: string;
}

export interface IProductItem {
    id: number;
    name: string;
    saler: string;
    unit: string;
    mapping: string;
    status: IProductStatus;
}

export interface IGetAllProduct {
    total: number;
    list: IProductItem[];
}

//--------------------------------------------------------------
export interface IGroupItem {
    label: string;
    value: number;
}

export interface IGroupFilter {
    groupname: string;
    grouplist: IGroupItem[];
}

//--------------------------------------------------------------

export interface IFormValuesImportMasterSupplier {
    url: string;
}

//---------------------------------------------------------------

export interface ISupplierActiveStatus {
    is_active: boolean;
    name: string;
}

export interface ISupplierItemRes {
    supplier_id: string;
    image: string;
    supplier_code: string;
    company_name: string;
    business_structure_name: string;
    business_type_name: string;
    supplier_product_amount: string;
    is_active: ISupplierActiveStatus;
}

export interface IGetAllSupplierRes {
    total_items: string;
    total_page: string;
    items: ISupplierItemRes[];
}

//------------------------------------------------------------

export interface ISupplierProductStatusRes {
    status: string; // "1"
    name: string; // "เปิดใช้งาน"
}

export interface ISupplierProductItemRes {
    supplier_product_id: string;
    supplier_product_name: string;
    company_name: string;
    purchase_unit_per_stock_unit: string;
    mapping: string; // "ผูกสินค้า"
    status: ISupplierProductStatusRes;
}

export interface IGetAllSupplierProductsRes {
    supplier_products: ISupplierProductItemRes[];
    total_pages: string;
    total_items: string;
}
