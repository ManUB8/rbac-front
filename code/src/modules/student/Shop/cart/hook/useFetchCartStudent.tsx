import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
    DeleteCartProduct,
    getOneCartStudent,
    UpdateCartQuantityStudent,
} from "../service/CartStudentApi";
import type {
    ICartItem,
    ICartResponse,
    IDeleteCartItem,
    IUpdateCartQuantityItem,
} from "../interface/CartStudent.interface";
import type { ICheckoutSummaryData, IOrderCart } from "../../order/interface/OrderShop.interface";
import { CreateOrderShopProduct } from "../../order/service/OrderShopApi";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../../router/router";

export const useCartStudentFetch = () => {
     const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
    const [receiverName, setReceiverName] = useState("");
    const [receiverPhone, setReceiverPhone] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [deliveryType, setDeliveryType] =
        useState<"shipping" | "pickup">("pickup");

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const query = useQuery<ICartResponse, Error>({
        queryKey: ["cart-student"],
        retry: 1,
        queryFn: async () => {
            return await getOneCartStudent();
        },
    });

    const cart_id = query.data?.data.cart_id || "";
    const student_id = query.data?.data.student_id || 0;
    const student_code = query.data?.data.student_code || "";
    const total_amount = query.data?.data.total_amount || "0.00";
    const total_items = query.data?.data.total_items || 0;
    const cart_data = query.data?.data.items || [];
    const cart_loading = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["cart-student"] });
    }, [queryClient]);

    const handleUpdateQuantity = useCallback(
        async (item: ICartItem, quantity: number) => {
            if (quantity <= 0) return;

            const body: IUpdateCartQuantityItem = {
                cart_item_id: item.cart_item_id,
                student_code,
                quantity,
            };

            await UpdateCartQuantityStudent(body);
            reload();
        },
        [student_code, reload]
    );

    const handleIncreaseQty = useCallback(
        async (item: ICartItem) => {
            const nextQty = item.quantity + 1;
            if (nextQty > item.stock) return;

            await handleUpdateQuantity(item, nextQty);
        },
        [handleUpdateQuantity]
    );

    const handleDecreaseQty = useCallback(
        async (item: ICartItem) => {
            const nextQty = item.quantity - 1;
            if (nextQty < 1) return;

            await handleUpdateQuantity(item, nextQty);
        },
        [handleUpdateQuantity]
    );

    const handleDeleteCartItem = useCallback(
        async (cart_item_id: string) => {
            const body: IDeleteCartItem = {
                cart_item_id,
                student_code,
            };

            await DeleteCartProduct(body);
            reload();
        },
        [student_code, reload]
    );

    const [checkoutSummary, setCheckoutSummary] =
        useState<ICheckoutSummaryData | null>(null);

    const [paymentMethod, setPaymentMethod] =
        useState<"promptpay" | "bank_transfer">("promptpay");

    const handleCreateOrder = useCallback(async () => {
        if (!student_code) return;
        if (total_items <= 0) return;

        try {
            setCheckoutLoading(true);

            const data: IOrderCart = {
                student_code,
                delivery_type: deliveryType,
            };

            // const res = await CreateOrderShopProduct(data);

            // setCheckoutSummary(res.data);
            // setOpenCheckoutDialog(true);
            const res = await CreateOrderShopProduct(data);

            sessionStorage.setItem(
                "checkout_summary",
                JSON.stringify(res.data)
            );

            navigate(`${AppRoutes.studentShop}/cart/payment`);

            queryClient.invalidateQueries({ queryKey: ["cart-student"] });
        } finally {
            setCheckoutLoading(false);
        }
    }, [student_code, total_items, deliveryType, queryClient]);

    return {
        reload,

        cart_data,
        cart_loading,
        total_items,
        total_amount,
        student_code,
        student_id,
        cart_id,

        deliveryType,
        setDeliveryType,

        checkoutLoading,
        handleCreateOrder,

        handleIncreaseQty,
        handleDecreaseQty,
        handleDeleteCartItem,

        cart_Error: query.error,
        cart_refetch: query.refetch,
        checkoutSummary,
        setCheckoutSummary,
        paymentMethod,
        setPaymentMethod,
        openCheckoutDialog,
        setOpenCheckoutDialog,
        receiverName,
        setReceiverName,
        receiverPhone,
        setReceiverPhone,
        shippingAddress,
        setShippingAddress,
    };
};

export type IuseCartStudentFetch = ReturnType<typeof useCartStudentFetch>;