export interface ICartItem {
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

export interface ICartData {
    cart_id: string;
    student_id: number;
    student_code: string;
    total_amount: string;
    total_items: number;
    items: ICartItem[];
}

export interface ICartResponse {
    detail: string;
    data: ICartData;
}

export interface IUpdateCartQuantityItem {
    cart_item_id: string;
    student_code: string;
    quantity: number;
}

export interface IDeleteCartItem {
    cart_item_id: string;
    student_code: string;
}