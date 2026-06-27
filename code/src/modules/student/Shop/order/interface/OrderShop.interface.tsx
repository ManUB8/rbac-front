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
    branch: string;
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