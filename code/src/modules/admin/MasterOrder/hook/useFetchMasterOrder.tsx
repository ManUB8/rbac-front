import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as R from 'ramda';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPopupAtom, flashAlertAtom } from '../../../../shared/components/constants/OptionsAtom';
import { searchStateOrderContext } from './useContext';
import { getAllOrder, getOneOrder } from '../service/MasterOrderApi';
import { getAllErrorPaths } from '../../../../shared/components/error/FunctionError';
import type { IOrderDetail } from '../interface/MasterOrder.interface';
import { MasterOrderZod } from '../utils/ValidationMasterOrder';
import {
    UpdateCancelOrder,
    UpdateChangeOrderStatus,
    UpdateChangeRejectPayment,
    UpdateChangeShippingStatus,
    UpdateConfirmPayment,
} from "../service/MasterOrderApi";
import type {
    IOrderStatus,
    IOrderStatusRequest,
    IOrderShippingRequest,
    IOrderRejectPaymentRequest,
    ICancelOrderRequest,
} from "../interface/MasterOrder.interface";

export const useFetchMasterFunctionOrder = () => {
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const queryClient = useQueryClient();
    const [searchStateOrder, setSearchStateOrder] = useAtom(searchStateOrderContext);
    const [openModal, setOpenModal] = useState(false);
    const [openViewPage, setopenViewPage] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [searchInput, setSearchInput] = useState(searchStateOrder.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const query = useQuery({
        queryKey: ["order_list", searchStateOrder],
        queryFn: async () => {
            const res = await getAllOrder(searchStateOrder);
            console.log('res', res)
            return res;
        },
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    const order_data = query.data?.data ?? [];
    const total_order = query.data?.total_all ?? 0;
    const loading_order = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["order_list"] });
    }, [queryClient]);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateOrder((prev) => ({
                ...prev,
                search: text || "",
                page: 1,
            }));
        }, 800);
    }, [setSearchStateOrder]);

    useEffect(() => {
        setSearchInput(searchStateOrder.search ?? "");
    }, [searchStateOrder.search]);

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
        setConfirmPopup,
        handleChangeSearch,
        searchInput,
        setSearchInput,
        searchStateOrderContext,
        setSearchStateOrder,
        searchStateOrder,
        navigate,
        handleOpenModal,
        setSelectedId,
        selectedId,
        openModal,
        setOpenModal,
        setopenViewPage,
        openViewPage,
        reload,
        setFlash,
        openRows,
        setOpenRows,
        order_data,
        total_order,
        loading_order,
        handleCloseModal
    };
};
export type IuseFetchMasterFunctionOrder = ReturnType<typeof useFetchMasterFunctionOrder>;


export const useFetcOrderFrom = (
    getOneId: string,
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
    const order_id = getOneId || "0";

    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<IOrderDetail>({
        resolver: zodResolver(MasterOrderZod as any) as Resolver<IOrderDetail>,
        shouldFocusError: true,
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        setError,
        clearErrors,
        formState: { errors },
        setFocus,
    } = methods;

    const query = useQuery({
        queryKey: ["order_list_one", order_id],
        queryFn: async () => {
            return getOneOrder(order_id);
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
            return;
        }
    }, [getOneId, openModal, setOpenModal]);

    useEffect(() => {
        if (!query.data?.data) return;

        reset(query.data.data);
    }, [query.data, reset]);

    const loading = query.isLoading || query.isFetching;

    const handleErrorSubmit = async <T extends Record<string, any>>(
        errors: FieldErrors<T>,
        setFocus: UseFormSetFocus<T>
    ) => {
        const paths = getAllErrorPaths(errors);
        if (!paths.length) return;

        const pick =
            paths.find(
                (p) =>
                    document.getElementById(p) ||
                    document.querySelector(`[name="${p}"]`)
            ) ?? paths[0];

        setFocus(pick as Path<T>, { shouldSelect: true });

        requestAnimationFrame(() => {
            const el =
                (document.getElementById(pick) as HTMLElement | null) ||
                (document.querySelector(`[name="${pick}"]`) as HTMLElement | null);

            if (!el) return;

            const container = el.closest(".MuiDialogContent-root") as HTMLElement | null;

            if (!container) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            const elRect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();

            const top = container.scrollTop + (elRect.top - cRect.top) - 80;
            container.scrollTo({ top, behavior: "smooth" });
        });
    };

    const saveHandler = useCallback(async () => {
        try {
            queryClient.invalidateQueries({ queryKey: ["order_list"] });
            queryClient.invalidateQueries({ queryKey: ["order_data_one", order_id] });

            setFlash({
                type_severity: "success",
                title: "",
                content: "บันทึกข้อมูลคำสั่งซื้อสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [queryClient, setFlash, order_id]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูลคำสั่งซื้อ",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการบันทึกข้อมูลคำสั่งซื้อ",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await saveHandler();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [saveHandler, setConfirmPopup]);

    const currentOrder = watch();

    const refetchOrder = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ["order_list"] });
        await queryClient.invalidateQueries({
            queryKey: ["order_list_one", order_id],
        });
        await query.refetch();
    }, [queryClient, query, order_id]);

    const getUpdatedByName = () =>
        localStorage.getItem("account_name") || "admin";

    const handleConfirmPayment = useCallback(async () => {
        if (!currentOrder?.order_id) return;

        try {
            const updated_by_name = getUpdatedByName();

            const res = await UpdateConfirmPayment(
                updated_by_name,
                currentOrder.order_id
            );

            reset(res.data);

            await refetchOrder();

            setFlash({
                type_severity: "success",
                title: "",
                content: "ยืนยันการชำระเงินสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "ไม่สามารถยืนยันการชำระเงินได้",
            });
        }
    }, [currentOrder?.order_id, reset, refetchOrder, setFlash]);

    const handleRejectPayment = useCallback((cancel_note: string) => {
        if (!currentOrder?.order_id) return;

        setConfirmPopup({
            type: "normal",
            title: "ปฏิเสธสลิป",
            content: "ยืนยันการปฏิเสธหลักฐานการชำระเงินนี้หรือไม่",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                try {
                    const body: IOrderRejectPaymentRequest = {
                        order_id: currentOrder.order_id,
                        cancel_note,
                        updated_by_name: getUpdatedByName(),
                    };

                    const res = await UpdateChangeRejectPayment(body);

                    reset(res.data);
                    await refetchOrder();

                    setFlash({
                        type_severity: "success",
                        title: "",
                        content: "ปฏิเสธสลิปสำเร็จ",
                    });
                } catch (error) {
                    console.error(error);

                    setFlash({
                        type_severity: "error",
                        title: "",
                        content: "ไม่สามารถปฏิเสธสลิปได้",
                    });
                } finally {
                    setConfirmPopup(null);
                }
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [currentOrder?.order_id, reset, refetchOrder, setConfirmPopup, setFlash]);

    const handleChangeOrderStatus = useCallback(async (order_status: IOrderStatus) => {
        if (!currentOrder?.order_id) return;

        try {
            const body: IOrderStatusRequest = {
                order_id: currentOrder.order_id,
                order_status,
                updated_by_name: getUpdatedByName(),
            };

            const res = await UpdateChangeOrderStatus(body);

            reset(res.data);

            await refetchOrder();

            setFlash({
                type_severity: "success",
                title: "",
                content: "อัปเดตสถานะคำสั่งซื้อสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "ไม่สามารถอัปเดตสถานะคำสั่งซื้อได้",
            });
        }
    }, [currentOrder?.order_id, reset, refetchOrder, setFlash]);

    const handleShipping = useCallback(async (carrier: string, tracking_no: string) => {
        if (!currentOrder?.order_id) return;

        try {
            const body: IOrderShippingRequest = {
                order_id: currentOrder.order_id,
                carrier,
                tracking_no,
                updated_by_name: getUpdatedByName(),
            };

            const res = await UpdateChangeShippingStatus(body);

            reset(res.data);

            await refetchOrder();

            setFlash({
                type_severity: "success",
                title: "",
                content: "บันทึกข้อมูลจัดส่งสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "ไม่สามารถบันทึกข้อมูลจัดส่งได้",
            });
        }
    }, [currentOrder?.order_id, reset, refetchOrder, setFlash]);

    const handleCancelOrder = useCallback((cancel_note: string) => {
        if (!currentOrder?.order_id) return;

        setConfirmPopup({
            type: "normal",
            title: "ยกเลิกคำสั่งซื้อ",
            content: "ยืนยันการยกเลิกคำสั่งซื้อนี้หรือไม่",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                try {
                    const body: ICancelOrderRequest = {
                        order_id: currentOrder.order_id,
                        cancel_note,
                        updated_by_name: getUpdatedByName(),
                    };

                    const res = await UpdateCancelOrder(body);

                    reset(res.data);
                    await refetchOrder();

                    setFlash({
                        type_severity: "success",
                        title: "",
                        content: "ยกเลิกคำสั่งซื้อสำเร็จ",
                    });
                } catch (error) {
                    console.error(error);

                    setFlash({
                        type_severity: "error",
                        title: "",
                        content: "ไม่สามารถยกเลิกคำสั่งซื้อได้",
                    });
                } finally {
                    setConfirmPopup(null);
                }
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [currentOrder?.order_id, reset, refetchOrder, setConfirmPopup, setFlash]);

    return {
        loading,
        navigate,
        onSubmitMaster,
        handleErrorSubmit,
        methods,

        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        setError,
        clearErrors,
        errors,

        order_id,
        orderData: query.data?.data,
        orderRefetch: query.refetch,

        handleConfirmPayment,
        handleRejectPayment,
        handleChangeOrderStatus,
        handleShipping,
        handleCancelOrder,
    };
};
export type IuseFetcOrderFrom = ReturnType<typeof useFetcOrderFrom>;
