export interface IVariantItem {
    variant_id: string;
    product_id: string;
    variant_name: string;
    color_name: string | null;
    variant_image: string | null;
    sku_code: string;
    price: string;
    stock: number;
    movement_type: IMovementType | null;
    is_active: boolean;
    created_at: number;
    updated_at: number;
    created_by_name: string;
    updated_by_name: string;
}

export interface IProductVariantsData {
    product_id: string;
    product_name: string;
    has_variant: boolean;
    variants: IVariantItem[];
}

export interface IVariantResponse {
    detail: string;
    data: IProductVariantsData;
}

export const defaultVariantItem: IVariantItem = {
    variant_id: "",
    product_id: "",
    variant_name: "",
    color_name: "",
    variant_image: null,
    sku_code: "",
    price: "0",
    stock: 0,
    movement_type: {
        id: "",
        label: "",
    },
    is_active: true,
    created_at: 0,
    updated_at: 0,
    created_by_name: "",
    updated_by_name: "",
};
export interface IMovementType {
    id: string;
    label: string;
}