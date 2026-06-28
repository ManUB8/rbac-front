import { data } from "react-router-dom";
import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { ICancelOrderRequest, IOrderDetailResponse, IOrderFilterRequest, IOrderListResponse, IOrderRejectPaymentRequest, IOrderShippingRequest, IOrderStatusRequest } from "../interface/MasterOrder.interface";

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

export const UpdateConfirmPayment = async (updated_by_name: string, order_id: string): Promise<IOrderDetailResponse> => {
    const body = {
        updated_by_name: updated_by_name
    }
    const res = await api.patch<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/payment/${order_id}`,
        body
    );
    return res;
};

export const UpdateChangeOrderStatus = async (body: IOrderStatusRequest): Promise<IOrderDetailResponse> => {
    const res = await api.patch<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/status/${body.order_id}`,
        body
    );
    return res;
};

export const UpdateChangeShippingStatus = async (body: IOrderShippingRequest): Promise<IOrderDetailResponse> => {
    const res = await api.patch<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/shipping/${body.order_id}`,
        body
    );
    return res;
};

export const UpdateChangeRejectPayment = async (body: IOrderRejectPaymentRequest): Promise<IOrderDetailResponse> => {
    const res = await api.patch<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/reject-payment/${body.order_id}`,
        body
    );
    return res;
};

export const UpdateCancelOrder = async (body: ICancelOrderRequest): Promise<IOrderDetailResponse> => {
    const res = await api.patch<IOrderDetailResponse>(
        ApiConfig.MASETR_SHOP_API + `/admin/orders/cancel/${body.order_id}`,
        body
    );
    return res;
};
