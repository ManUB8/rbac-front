import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { IProductItem, IProductListOneResponse, IProductListResponse, IProductSearchRequest } from "../interface/MasterProduct.interface";

export const getAllProduct = async (body: IProductSearchRequest): Promise<IProductListResponse> => {
    const res = await api.post<IProductListResponse>(
        `${ApiConfig.MASETR_SHOP_API}/get-all/products`, body
    );
    return res;
};

export const getOneProduct = async (product_id: string): Promise<IProductItem> => {
    const res = await api.get<IProductListOneResponse>(
        ApiConfig.MASETR_SHOP_API + `/get-one/products/${product_id}`
    );
    return res.data;
};

export const CreateProduct = async (body: IProductItem): Promise<IProductItem> => {
    const res = await api.post<IProductItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/products/create`,
        body
    );
    return res;
};
export const CreateProductVariant = async (body: IProductItem): Promise<IProductItem> => {
    const res = await api.post<IProductItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/products/create-with-variants`,
        body
    );
    return res;
};

export const UpdateProduct = async (body: IProductItem): Promise<IProductItem> => {
    const res = await api.patch<IProductItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/products/update/${body.product_id}`,
        body
    );
    return res;
};
