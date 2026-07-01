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

export type IDeliveryType = "pickup" | "shipping";

export interface IStudentSlipOrderRequest {
    order_id: string;
    student_code: string;
    slip_image: string;
}
export interface IStudentCancelOrderRequest {
    order_id: string;
    student_code: string;
    reason: string;
}

export interface IOrderCart {
    student_code: string;
    delivery_type: string;
}

export interface ICheckoutSummaryResponse {
    detail: string;
    data: ICheckoutSummaryData;
}

export interface ICheckoutSummaryData {
    student_id: number;
    student_code: string;
    student_name: string;

    delivery_type: "pickup" | "shipping";

    product_total_amount: string;
    shipping_fee: string;
    total_amount: string;
    total_items: number;

    items: ICheckoutSummaryItem[];

    payment_methods: ICheckoutPaymentMethods;
}

export interface ICheckoutSummaryItem {
    cart_item_id: string;
    product_id: string;
    variant_id: string;

    product_name: string;

    main_image: string;
    variant_name: string;
    color_name: string;
    variant_image: string;

    price: string;
    quantity: number;
    total_price: string;

    stock: number;
}

export interface ICheckoutPaymentMethods {
    promptpay: IPromptPayPayment;
    bank_transfer: IBankTransferPayment;
}

export interface IPromptPayPayment {
    method: "promptpay";
    is_active: boolean;

    promptpay_id: string;

    amount: string;

    promptpay_payload: string;

    qr_code: string; // base64 image
}

export interface IBankTransferPayment {
    method: "bank_transfer";
    is_active: boolean;
    bank_name: string;
    account_no: string;
    account_name: string;
    amount: string;
    qr_code: string;
}

export interface IOrdersCreateRequest {
  student_code: string;
  delivery_type: string;
  payment_method: string;
  receiver_name: string;
  receiver_phone: string;
  shipping_address: string;
}

export interface IOrdersCreateReponer {
  order_id: string;
  order_no: string;
  payment_status: string;
}

export interface IOrderHistoryResponse {
    detail: string;
    data: IOrderHistoryItem[];
}

export interface IOrderHistoryItem {
    order_id: string;
    order_no: string;
    student_id: number;
    student_code: string;

    total_amount: string;
    order_status: IOrderStatus;
    payment_status: IPaymentStatus;
    delivery_type: IDeliveryType;

    product_total_amount: string;
    shipping_fee: string;

    pickup_code: string;
    receiver_name: string;
    receiver_phone: string;
    shipping_address: string;

    carrier: string;
    tracking_no: string;
    shipping_at: number;

    created_at: number;
    updated_at: number;

    items: IOrderHistoryProductItem[];
    payment: IOrderHistoryPayment;
}

export interface IOrderHistoryProductItem {
    order_item_id: string;
    product_id: string;
    variant_id: string;

    product_name_snapshot: string;
    variant_name_snapshot: string;
    color_name_snapshot: string;

    price_snapshot: string;
    quantity: number;
    total_price: string;

    main_image: string;
    variant_image: string;
}

export interface IOrderHistoryPayment {
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


export interface IOrderDetailResponse {
    detail: string;
    data: IOrderDetail;
}

export interface IOrderDetail {
    order_id: string;
    order_no: string;
    student_code: string;
    student_id: number;

    total_amount: string;
    order_status: IOrderStatus;
    payment_status: IPaymentStatus;
    delivery_type: IDeliveryType;

    product_total_amount: string;
    shipping_fee: string;

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
    payment: IOrderPaymentDetail;
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

    main_image: string;
    variant_image: string;
}

export interface IOrderPaymentDetail {
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
