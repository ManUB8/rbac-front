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

export interface IPreorderRoundItem {
    preorder_round_id: string;
    product_id: string;
    round_name: string;
    start_at: number;
    end_at: number;
    expected_ship_at: number;
    limit_qty: number;
    sold_count: number;
    remaining_qty: number;
    is_active: boolean;
    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;
    created_at: number;
    updated_at: number;
}

export interface IProductItem {
    product_id: string;
    product_name: string;
    description: string;
    category_id: string;
    category_name: string;

    base_price: string | number;
    base_stock: number;
    total_stock: number;
    active_variant_count: number;

    owner_type: string;
    faculty_id: string | number;
    major_id: string | number;
    external_name: string;
    club_name: string;

    main_image: string;
    product_images: string[];
    variants?: IVariantItem[];

    has_variant: boolean;
    is_active: boolean;
    is_limited: boolean;
    pickup_only: boolean;

    limit_per_student: number;

    is_preorder: boolean;
    preorder_note: string;
    preorder_start_at: number;
    preorder_end_at: number;
    preorder_expected_ship_at: number;
    preorder_limit_qty: string | number;
    active_preorder_round: IPreorderRoundItem;

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
    total_stock: 0,
    pickup_only: false,
    is_preorder: false,
    preorder_note: "",
    preorder_start_at: 0,
    preorder_end_at: 0,
    preorder_expected_ship_at: 0,
    preorder_limit_qty: "",
    active_preorder_round: {
        preorder_round_id: "",
        product_id: "",
        round_name: "",
        start_at: 0,
        end_at: 0,
        expected_ship_at: 0,
        limit_qty: 0,
        sold_count: 0,
        remaining_qty: 0,
        is_active: false,
        created_by_id: 0,
        created_by_name: "",
        updated_by_id: 0,
        updated_by_name: "",
        created_at: 0,
        updated_at: 0
    }
}


export interface IProductListOneResponse {
    detail: string;
    data: IProductItem;
}