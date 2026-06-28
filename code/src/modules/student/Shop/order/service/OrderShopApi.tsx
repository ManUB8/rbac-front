import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import Cookies from "js-cookie";
import type { ICheckoutSummaryResponse, IOrderCart, IOrderDetailResponse, IOrderHistoryResponse, IOrdersCreateRequest, IStudentCancelOrderRequest, IStudentSlipOrderRequest } from "../interface/OrderShop.interface";
const user_code = localStorage.getItem("user_code") || Cookies.get('user_code');


export const getOrderStudent = async (): Promise<IOrderHistoryResponse> => {
    console.log(user_code)
    const res = await api.get<IOrderHistoryResponse>(
        ApiConfig.MASETR_SHOP_API + `/orders/my/${user_code}`
    );
    return res;
};

export const getOneOrderStudent = async (order_id: string): Promise<IOrderDetailResponse> => {
    console.log(user_code)
    const res = await api.get<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/orders/${order_id}?student_code=${user_code}`
    );
    return res;
};

export const CreateOrderShopProduct = async (body: IOrderCart): Promise<ICheckoutSummaryResponse> => {
    const res = await api.post<ICheckoutSummaryResponse>(
        ApiConfig.MASETR_SHOP_API + `/orders/checkout-summary`,
        body
    );
    return res;
};

export const CreateOrderShop = async (body: IOrdersCreateRequest): Promise<any> => {
    const res = await api.post<any>(
        ApiConfig.MASETR_SHOP_API + `/orders/create`,
        body
    );
    return res;
};


export const UpdateCancleOrderStudent = async (body: IStudentCancelOrderRequest): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.MASETR_SHOP_API + `/orders/${body.order_id}/cancel`,
        body
    );
    return res;
};

export const UpdateOrderStudentSlip = async (body: IStudentSlipOrderRequest): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.MASETR_SHOP_API + `/payments/slip/${body.order_id}`,
        body
    );
    return res;
};

