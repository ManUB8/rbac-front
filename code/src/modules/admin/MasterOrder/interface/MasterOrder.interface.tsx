
export type IOrderStatus =
    | "pending_payment"
    | "paid"
    | "preparing"
    | "ready_for_pickup"
    | "shipping"
    | "completed"
    | "cancelled";

export type IPaymentStatus =
    | "waiting_payment"
    | "pending_verification"
    | "paid"
    | "rejected"
    | "expired"
    | "cancelled";

export type IDeliveryType =
    | "pickup"
    | "shipping";

export interface IOrderFilterRequest {
    search: string;
    student_code: string;
    order_status: IOrderStatus | "";
    payment_status: IPaymentStatus | "";
    delivery_type: IDeliveryType | "";
    page: number;
    limit: number;
}
export interface IOrderListResponse {
    detail: string;
    total_all: number;
    page: number;
    limit: number;
    data: IOrderItem[];
}

export interface IOrderItem {
    order_id: string;
    order_no: string;

    student_id: number;

    total_amount: number;
    product_total_amount: number;
    shipping_fee: number;

    order_status: IOrderStatus;
    payment_status: IPaymentStatus;

    delivery_type: IDeliveryType;

    pickup_code: string;

    receiver_name: string;
    receiver_phone: string;
    shipping_address: string;

    carrier: string;
    tracking_no: string;

    created_at: number;
    updated_at: number;
    shipping_at: number;

    items: IOrderProductItem[];

    payment: IOrderPayment;
}

export interface IOrderProductItem {
    order_item_id: string;
    order_id: string;

    product_id: string;
    variant_id: string;

    product_name_snapshot: string;
    variant_name_snapshot: string;
    color_name_snapshot: string;

    quantity: number;

    price_snapshot: number;
    total_price: number;

    created_at: number;
    updated_at: number;
}

export interface IOrderPayment {
    payment_id: string;
    order_id: string;

    amount: number;

    payment_status: IPaymentStatus;

    promptpay_payload: string;
    qr_code: string;

    slip_image: string;

    paid_at: number;
    slip_uploaded_at: number;

    created_at: number;
    updated_at: number;
}

export interface IOrderDetailResponse {
    detail: string;
    data: IOrderDetail;
}

export interface IOrderDetail {
    order_id: string;
    order_no: string;

    student_id: number;

    total_amount: string;
    product_total_amount: string;
    shipping_fee: string;

    order_status: IOrderStatus;
    payment_status: IPaymentStatus;

    delivery_type: IDeliveryType;

    pickup_code: string;

    receiver_name: string;
    receiver_phone: string;
    shipping_address: string;

    carrier: string;
    tracking_no: string;

    shipping_at: number;
    created_at: number;
    updated_at: number;

    items: IOrderDetailItem[];

    payment: IOrderDetailPayment;
}

export interface IOrderDetailItem {
    order_item_id: string;

    product_id: string;
    variant_id: string;

    product_name_snapshot: string;
    variant_name_snapshot: string;
    color_name_snapshot: string;

    price_snapshot: string;
    quantity: number;
    total_price: string;
}

export interface IOrderDetailPayment {
    payment_id: string;
    order_id: string;

    amount: string;

    promptpay_payload: string;
    qr_code: string;

    payment_status: IPaymentStatus;

    paid_at: number;

    slip_image: string;
    slip_uploaded_at: number;
}
