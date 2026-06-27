import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as R from 'ramda';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { searchStateStudentProductContext } from './useContext';
import { CreateShopProduct, CreateShopProductVariant, getAllShopStudentProduct, getOneShopStudentProduct } from '../service/ShopStudentApi';
import { useFetchMasterCategoryListActive } from '../../../../admin/Master_Sale/master_categories/hook/useFetchMasterCategories';
import { getAllErrorPaths } from '../../../../../shared/components/error/FunctionError';
import { MasterShopStudentZod } from '../utils/FieldValidationShopStudent';
import type { IAddToCartRequest, IAddToCartVariantRequest, IProductOneData } from '../interface/ShopStudent.interface';
import { AppRoutes } from '../../../../../router/router';

export const useFetchMasterFunctionShopStudent = () => {
    const { category_data, loading_category } = useFetchMasterCategoryListActive()
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const queryClient = useQueryClient();
    const [searchStateProduct, setSearchStateProduct] = useAtom(searchStateStudentProductContext);
    const [openModal, setOpenModal] = useState(false);
    const [openViewPage, setopenViewPage] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [searchInput, setSearchInput] = useState(searchStateProduct.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const query = useQuery({
        queryKey: ["student-product_list", searchStateProduct],
        queryFn: async () => {
            const res = await getAllShopStudentProduct(searchStateProduct);
            console.log('res', res)
            return res;
        },
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    const product_data = query.data?.data ?? [];
    const total_product = query.data?.total_all ?? 0;
    const loading_product = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["student-product_list"] });
    }, [queryClient]);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateProduct((prev) => ({
                ...prev,
                search: text || "",
                page: 1,
            }));
        }, 800);
    }, [setSearchStateProduct]);

    useEffect(() => {
        setSearchInput(searchStateProduct.search ?? "");
    }, [searchStateProduct.search]);

    const handleOpenProduct = useCallback((id: string) => {
        console.log("open product id", id);
        setSelectedId(id);
        setOpenModal(true);
    }, []);

    return {
        setConfirmPopup,
        handleChangeSearch,
        searchInput,
        setSearchInput,
        searchStateStudentProductContext,
        setSearchStateProduct,
        searchStateProduct,
        navigate,
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
        product_data,
        total_product,
        loading_product,
        category_data,
        loading_category,
        handleOpenProduct
    };
};
export type IuseFetchMasterFunctionShopStudent = ReturnType<typeof useFetchMasterFunctionShopStudent>;


export const useFetchShopStudentProductFrom = (
    getOneId: string,
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
    const product_id = getOneId || "0";

    const [saving, setSaving] = useState(false);

    const setFlash = useSetAtom(flashAlertAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["product_one", product_id],
        queryFn: async () => getOneShopStudentProduct(product_id),
        enabled: openModal && product_id !== "0",
        staleTime: 0,
        refetchOnMount: "always",
    });

    const product = query.data ?? null;
    const loading = query.isLoading || query.isFetching;

    const addCartHandler = useCallback(
        async ({
            product,
            quantity,
            variant_id,
            goCart,
        }: {
            product: IProductOneData;
            quantity: number;
            variant_id?: string;
            goCart: boolean;
        }) => {
            // const student_code = localStorage.getItem("student_code") || "";
            const student_code = localStorage.getItem("user_code") || "";
            try {
                setSaving(true);

                if (product.has_variant) {
                    const dataCreateVariant: IAddToCartVariantRequest = {
                        student_code,
                        product_id: product.product_id,
                        quantity,
                        variant_id: variant_id || "",
                    };

                    await CreateShopProductVariant(dataCreateVariant);
                } else {
                    const dataCreate: IAddToCartRequest = {
                        student_code,
                        product_id: product.product_id,
                        quantity,
                    };

                    await CreateShopProduct(dataCreate);
                }

                setOpenModal(false);

                queryClient.invalidateQueries({
                    queryKey: ["student-product_list"],
                });

                queryClient.invalidateQueries({
                    queryKey: ["cart-student_id"],
                });

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "เพิ่มสินค้าลงตะกร้าสำเร็จ",
                });

                if (goCart) {
                    navigate(`${AppRoutes.studentShop}/cart`);
                }
            } catch (error: any) {
                console.error(error);

                const message =
                    error?.response?.data?.detail ||
                    "เกิดข้อผิดพลาด ไม่สามารถเพิ่มสินค้าลงตะกร้าได้";

                setFlash({
                    type_severity: "error",
                    title: "",
                    content: message,
                });
            } finally {
                setSaving(false);
            }
        },
        [navigate, queryClient, setFlash, setOpenModal]
    );

    const onAddToCart = useCallback(
        (quantity: number, variant_id?: string) => {
            if (!product) return;

            return addCartHandler({
                product,
                quantity,
                variant_id,
                goCart: false,
            });
        },
        [product, addCartHandler]
    );

    const onBuyNow = useCallback(
        (quantity: number, variant_id?: string) => {
            if (!product) return;

            return addCartHandler({
                product,
                quantity,
                variant_id,
                goCart: true,
            });
        },
        [product, addCartHandler]
    );

    return {
        product,
        loading,
        saving,
        onAddToCart,
        onBuyNow,
    };
};

export type IuseFetchShopStudentProductFrom = ReturnType<typeof useFetchShopStudentProductFrom>;
