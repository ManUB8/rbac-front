import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { IProductVariantsData, IVariantItem, IVariantResponse } from "../interface/MasterVariants.interface";

export const getAllVariant = async (product_id:string): Promise<IProductVariantsData> => {
    const res = await api.get<IVariantResponse>(
        ApiConfig.MASETR_SHOP_API + `/products/${product_id}/variants`
    );
    return res.data;
};

export const CreateVariant = async (body: IVariantItem): Promise<IVariantItem> => {
    const res = await api.post<IVariantItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/products/${body.product_id}/variants/create`,
        body
    );
    return res;
};

export const UpdateVariant = async (body: IVariantItem): Promise<IVariantItem> => {
    const res = await api.patch<IVariantItem>(
        ApiConfig.MASETR_SHOP_API + `admin/variants/${body.variant_id}`,
        body
    );
    return res;
};
