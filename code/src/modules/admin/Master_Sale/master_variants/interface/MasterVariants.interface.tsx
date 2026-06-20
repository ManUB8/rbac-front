export interface IVariantItem {
    variant_id: string;
    product_id: string;
    variant_name: string;
    color_name: string | null;
    variant_image: string | null;
    sku_code: string;
    price: string;
    stock: number;
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