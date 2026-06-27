import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { IAddToCartRequest, IAddToCartVariantRequest, IProductListResponse, IProductOneData, IProductOneResponse, IProductResponse, IStudentProductSearchRequest } from "../interface/ShopStudent.interface";

export const getAllShopStudentProduct = async (body: IStudentProductSearchRequest): Promise<IProductListResponse> => {
    const res = await api.post<IProductListResponse>(
        `${ApiConfig.MASETR_SHOP_API}/student/products`, body
    );
    return res;
};

export const getOneShopStudentProduct = async (product_id: string): Promise<IProductOneData> => {
    const res = await api.get<IProductOneResponse>(
        ApiConfig.MASETR_SHOP_API + `/student/products/${product_id}`
    );
    return res.data;
};

export const CreateShopProduct = async (body: IAddToCartRequest): Promise<IProductResponse> => {
    const res = await api.post<IProductResponse>(
        ApiConfig.MASETR_SHOP_API + `/cart/add`,
        body
    );
    return res;
};
export const CreateShopProductVariant = async (body: IAddToCartVariantRequest): Promise<IProductResponse> => {
    const res = await api.post<IProductResponse>(
        ApiConfig.MASETR_SHOP_API + `/cart/add`,
        body
    );
    return res;
};