import type { IVariantItem } from "../../master_variants/interface/MasterVariants.interface";

export interface IProductSearchRequest {
    search: string;
    category_id: string;
    owner_type: string; //club | faculty | major | external
    faculty_id: string;
    major_id: string;
    is_limited: string;
    active_only: string;
    page: number;
    limit: number;
}

export interface IProductVariant {
    variant_id: string;
    variant_name: string;
    color_name: string;
    variant_image: string;
    sku_code: string;
    price: string;
    stock: number;
    is_active: boolean;
}

export interface IProductItem {
    product_id: string;
    product_name: string;
    description: string;
    category_id: string;
    category_name: string;
    base_price: number;
    base_stock: number;
    total_stock: number;
    active_variant_count: number;
    owner_type: string; //club | faculty | major | external
    faculty_id: string;
    major_id: string;
    external_name: string ;
    club_name: string ;
    main_image: string;
    product_images: string[];
    variants: IVariantItem[];
    has_variant: boolean;
    is_active: boolean;
    is_limited: boolean;
    limit_per_student: number;
    weight_gram: number;
    sold_count: number;
    min_price?: string;
    max_price?: string;
    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;
    created_at: number;
    updated_at: number;
    actype?: string;
}

export interface IProductListResponse {
    detail: string;
    total_all: number;
    page: number;
    limit: number;
    data: IProductItem[];
}

export const IProductItemmDefule: IProductItem = {
    product_id: "",
    product_name: "",
    description: '',
    category_id: "",
    base_price: 0,
    base_stock: 0,
    owner_type: "",
    faculty_id: "",
    major_id: "",
    external_name: "",
    main_image: "",
    product_images: [],
    has_variant: false,
    is_active: true,
    is_limited: false,
    limit_per_student: 0,
    weight_gram: 0,
    sold_count: 0,
    created_by_id: 0,
    created_by_name: "",
    updated_by_id: 0,
    updated_by_name: "",
    created_at: 0,
    updated_at: 0,
    variants: [],
    club_name: "",
    category_name: "",
    active_variant_count: 0,
    total_stock: 0
}


export interface IProductListOneResponse {
    detail: string;
    data: IProductItem;
}