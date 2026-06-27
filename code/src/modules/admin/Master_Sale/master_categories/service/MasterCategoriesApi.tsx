import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { ICategoryItem, ICategoryResponse } from "../interface/MasterCategories.interface";

export const getAllCategories = async (): Promise<ICategoryItem[]> => {
    const res = await api.get<ICategoryResponse>(
        ApiConfig.MASETR_SHOP_API + `/get-all/categories`
    );
    return res.data;
};

export const getAllCategoriesStatus = async (): Promise<ICategoryItem[]> => {
    const res = await api.get<ICategoryResponse>(
        ApiConfig.MASETR_SHOP_API + `/get-all/categories?active_only=true`
    );
    return res.data;
};

export const CreateCategories = async (body: ICategoryItem): Promise<ICategoryItem> => {
    const res = await api.post<ICategoryItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/categories/create`,
        body
    );
    return res;
};

export const UpdateCategories = async (body: ICategoryItem): Promise<ICategoryItem> => {
    const res = await api.patch<ICategoryItem>(
        ApiConfig.MASETR_SHOP_API + `/admin/categories/update/${body.category_id}`,
        body
    );
    return res;
};
