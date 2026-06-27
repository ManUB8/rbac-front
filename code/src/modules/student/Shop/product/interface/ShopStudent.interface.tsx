export interface IStudentProductSearchRequest {
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

export interface IProductItem {
    product_id: string;
    product_name: string;
    description: string;
    category_id: string;
    category_name: string;
    total_stock: number;
    min_price: number;
    max_price: number;
    active_variant_count: number;
    base_price: string | number;
    base_stock: number;
    owner_type: string; //"club" | "faculty" | "major" | "external";
    faculty_id: number;
    major_id: number;
    external_name: string;
    club_name: string;
    main_image: string;
    product_images: string[];
    has_variant: boolean;
    is_active: boolean;
    is_limited: boolean;
    limit_per_student: number;
    weight_gram: number;
    sold_count: number;
    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;
    created_at: number;
    updated_at: number;
}

export interface IProductListResponse {
    detail: string;
    total_all: number;
    page: number;
    limit: number;
    data: IProductItem[];
}

export interface IProductOneResponse {
    detail: string;
    data: IProductOneData;
}

export interface IProductOneData {
    product_id: string;
    product_name: string;
    description: string;
    category_id: string;
    base_price: number | string;
    base_stock: number;
    owner_type:string; //"club" | "faculty" | "major" | "external";
    faculty_id: number;
    major_id: number;
    external_name: string;
    club_name: string;
    main_image: string;
    product_images: string[];
    has_variant: boolean;
    is_active: boolean;
    is_limited: boolean;
    limit_per_student: number;
    weight_gram: number;
    sold_count: number;
    min_price: string;
    max_price: string;
    total_stock: number;
    variants: IProductVariant[];
    created_at: number;
    updated_at: number;
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

export const ShopProductItemDefault: IProductOneData = {
    product_id: "",
    product_name: "",
    description: "",
    category_id: "",
    base_price: "",
    base_stock: 0,
    owner_type: "",
    faculty_id: 0,
    major_id: 0,
    external_name: "",
    club_name: "",
    main_image: "",
    product_images: [],
    has_variant: false,
    is_active: false,
    is_limited: false,
    limit_per_student: 0,
    weight_gram: 0,
    sold_count: 0,
    min_price: "",
    max_price: "",
    total_stock: 0,
    variants: [],
    created_at: 0,
    updated_at: 0
};

export interface IAddToCartRequest {
    student_code: string;
    product_id: string;
    quantity: number;
}

export interface IAddToCartVariantRequest {
    student_code: string;
    product_id: string;
    variant_id: string;
    quantity: number;
}

export const AddToCartDefault: IAddToCartRequest = {
    student_code: "",
    product_id: "",
    quantity: 1,
};

export interface IProductResponse {
    detail: string;
}