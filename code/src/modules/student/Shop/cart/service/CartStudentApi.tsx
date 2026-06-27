import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { ICartResponse, IDeleteCartItem, IUpdateCartQuantityItem } from "../interface/CartStudent.interface";
const user_code = localStorage.getItem("user_code");

export const getOneCartStudent = async (): Promise<ICartResponse> => {
    const res = await api.get<ICartResponse>(
        ApiConfig.MASETR_SHOP_API + `/cart/${Number(user_code)}`
    );
    return res;
};

export const UpdateCartQuantityStudent = async (body: IUpdateCartQuantityItem): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.MASETR_SHOP_API + `/cart/item/${body.cart_item_id}`,
        body
    );
    return res;
};

export const DeleteCartProduct = async (body: IDeleteCartItem): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.MASETR_SHOP_API + `/cart/item/${body.cart_item_id}?student_code=${body.student_code}`
    );
    return res;
};

