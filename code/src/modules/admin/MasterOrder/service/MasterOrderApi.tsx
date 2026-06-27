import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IOrderDetailResponse, IOrderFilterRequest, IOrderListResponse } from "../interface/MasterOrder.interface";

export const getAllOrder = async (body: IOrderFilterRequest): Promise<IOrderListResponse> => {
    const res = await api.post<IOrderListResponse>(
        `${ApiConfig.MASETR_SHOP_API}/admin/orders/get-all`, body
    );
    return res;
};

export const getOneOrder = async (order_id: string): Promise<IOrderDetailResponse> => {
    const res = await api.get<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/${order_id}`
    );
    return res;
};

// export const UpdateProduct = async (body: IProductItem): Promise<IProductItem> => {
//     const res = await api.patch<IProductItem>(
//         ApiConfig.MASETR_SHOP_API + `/admin/products/update/${body.product_id}`,
//         body
//     );
//     return res;
// };
