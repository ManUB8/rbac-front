import { ApiConfig } from "../../../../../shared/service/ApiConfig";
import { api } from "../../../../../shared/service/axiosInstance";
import type { IPaymentSlip } from "../interface/Payment.interface";
const user_code = localStorage.getItem("user_code");

export const UpdatePaymentSlip = async (body: IPaymentSlip, order_id: string): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.MASETR_SHOP_API + `/payments/slip/${order_id}`,
        body
    );
    return res;
};

// export const CreateOrderShop= async (body: IOrdersCreateRequest): Promise<any> => {
//     const res = await api.post<any>(
//         ApiConfig.MASETR_SHOP_API + `/orders/create`,
//         body
//     );
//     return res;
// };

// export const CreateShopProductVariant = async (body: IAddToCartVariantRequest): Promise<IProductResponse> => {
//     const res = await api.post<IProductResponse>(
//         ApiConfig.MASETR_SHOP_API + `/cart/add`,
//         body
//     );
//     return res;
// };


// export const UpdateCartQuantityStudent = async (body: IUpdateCartQuantityItem): Promise<any> => {
//     const res = await api.patch<any>(
//         ApiConfig.MASETR_SHOP_API + `/cart/item/${body.cart_item_id}`,
//         body
//     );
//     return res;
// };

// export const DeleteCartProduct = async (body: IDeleteCartItem): Promise<any> => {
//     const res = await api.delete<any>(
//         ApiConfig.MASETR_SHOP_API + `/cart/item/${body.cart_item_id}?student_code=${body.student_code}`
//     );
//     return res;
// };

