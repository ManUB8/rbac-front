import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ICheckoutSummaryData, IOrderCart, IOrderDetail, IOrderDetailResponse, IOrderHistoryResponse, IStudentCancelOrderRequest, IStudentSlipOrderRequest } from "../../order/interface/OrderShop.interface";
import { CreateOrderShopProduct, getOneOrderStudent, getOrderStudent, UpdateCancleOrderStudent, UpdateOrderStudentSlip } from "../../order/service/OrderShopApi";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../../router/router";
import { useAtom, useSetAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../../shared/components/constants/OptionsAtom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const useOrderStudentFetch = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string>('');

    const query = useQuery<IOrderHistoryResponse>({
        queryKey: ["order-list-stu"],
        retry: 1,
        queryFn: async () => {
            return await getOrderStudent();
        },
    });

    const order_list = query.data?.data || [];
    const total_items = query.data?.data.length || 0;
    const order_loading = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["order-list-stu"] });
    }, [queryClient]);

    const handleOpenModal = useCallback((id: string) => {
        console.log('id', id)
        setSelectedId(id);
        setOpenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
        setSelectedId("");
    }, []);

    return {
        reload,
        navigate,
        setFlash,
        openModal,
        setOpenModal,
        selectedId,
        setSelectedId,
        order_list,
        total_items,
        order_loading,
        handleOpenModal,
        handleCloseModal
    };
};

export type IuseOrderStudentFetch = ReturnType<typeof useOrderStudentFetch>;

export const useFetcOrderStudentFrom = (
    getOneId: string,
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
    const order_id = getOneId || "0";

    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const query = useQuery<IOrderDetailResponse>({
        queryKey: ["order_data_one", order_id],
        queryFn: async () => {
            return getOneOrderStudent(order_id);
        },
        enabled: openModal && order_id !== "0",
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    useEffect(() => {
        if (!openModal) return;

        if (!getOneId || getOneId === "0") {
            Swal.fire({
                title: "ไม่พบข้อมูล",
                text: "เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข",
                icon: "warning",
                confirmButtonText: "OK",
            });

            setOpenModal(false);
        }
    }, [getOneId, openModal, setOpenModal]);

    const order_date = query.data?.data;
    const loading = query.isLoading || query.isFetching;

    const refetchOrder = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ["order-list-stu"] });
        await queryClient.invalidateQueries({
            queryKey: ["order_data_one", order_id],
        });
        await query.refetch();
    }, [queryClient, query, order_id]);

    const getStudentCode = useCallback(() => {
        return (
            order_date?.student_code ||
            localStorage.getItem("user_code") ||
            Cookies.get('user_code') ||
            ""
        );
    }, [order_date?.student_code]);

    const handleUpdateSlip = useCallback(
        async (body: IStudentSlipOrderRequest) => {
            try {
                await UpdateOrderStudentSlip({
                    ...body,
                    student_code: body.student_code || getStudentCode(),
                });

                await refetchOrder();

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ส่งหลักฐานการชำระเงินสำเร็จ",
                });
            } catch (error: any) {
                console.error(error);

                setFlash({
                    type_severity: "error",
                    title: "",
                    content:
                        error?.response?.data?.detail ||
                        "ไม่สามารถส่งหลักฐานการชำระเงินได้",
                });
            }
        },
        [getStudentCode, refetchOrder, setFlash]
    );

    const handleCancelOrder = useCallback(
        (reason: string = "ยกเลิกโดยนิสิต") => {
            if (!order_date?.order_id) return;

            setConfirmPopup({
                type: "normal",
                title: "ยืนยันการยกเลิกคำสั่งซื้อ",
                content: "ต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    try {
                        const body: IStudentCancelOrderRequest = {
                            order_id: order_date.order_id,
                            student_code: getStudentCode(),
                            reason,
                        };

                        await UpdateCancleOrderStudent(body);

                        await refetchOrder();

                        setFlash({
                            type_severity: "success",
                            title: "",
                            content: "ยกเลิกคำสั่งซื้อสำเร็จ",
                        });

                        setConfirmPopup(null);
                    } catch (error: any) {
                        console.error(error);

                        setFlash({
                            type_severity: "error",
                            title: "",
                            content:
                                error?.response?.data?.detail ||
                                "ไม่สามารถยกเลิกคำสั่งซื้อได้",
                        });

                        setConfirmPopup(null);
                    }
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [order_date?.order_id, getStudentCode, refetchOrder, setConfirmPopup, setFlash]
    );

    return {
        loading,
        navigate,
        order_date,
        refetchOrder,

        handleUpdateSlip,
        handleCancelOrder,
    };
};

export type IuseFetcOrderStudentFrom = ReturnType<typeof useFetcOrderStudentFrom>;
