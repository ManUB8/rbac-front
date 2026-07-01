import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as R from 'ramda';
import Swal from "sweetalert2";
import { IProductItemmDefule, type IProductItem, type IProductVariant } from '../interface/MasterProduct.interface';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { searchStateProductContext } from './useContext';
import { CreateProduct, CreateProductVariant, getAllProduct, getOneProduct, UpdateProduct } from '../service/MasterProductApi';
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MasterProductZod } from '../utils/ValidationMasterProduct';
import { getAllErrorPaths } from '../../../../../shared/components/error/FunctionError';

export const useFetchMasterFunctionProduct = () => {
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const queryClient = useQueryClient();
    const [searchStateProduct, setSearchStateProduct] = useAtom(searchStateProductContext);
    const [openModal, setOpenModal] = useState(false);
    const [openViewPage, setopenViewPage] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [searchInput, setSearchInput] = useState(searchStateProduct.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const query = useQuery({
        queryKey: ["product_list", searchStateProduct],
        queryFn: async () => {
            const res = await getAllProduct(searchStateProduct);
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
        queryClient.invalidateQueries({ queryKey: ["product_list"] });
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

    const handleCreate = useCallback(() => {
        setSelectedId("0")
        setOpenModal(true)
    }, [selectedId]);

    const handleEdit = useCallback((id: string) => {
        console.log("open product id", id);
        setSelectedId(id);
        setOpenModal(true);
    }, []);

    return {
        setConfirmPopup,
        handleChangeSearch,
        searchInput,
        setSearchInput,
        searchStateProductContext,
        setSearchStateProduct,
        searchStateProduct,
        navigate,
        handleCreate,
        setSelectedId,
        selectedId,
        openModal,
        handleEdit,
        setOpenModal,
        setopenViewPage,
        openViewPage,
        reload,
        setFlash,
        openRows,
        setOpenRows,
        product_data,
        total_product,
        loading_product
    };
};
export type IuseFetchMasterFunctionProduct = ReturnType<typeof useFetchMasterFunctionProduct>;

export const useFetchProductFrom = (
    getOneId: string,
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
    const product_id = getOneId || "0";
    const isCreate = product_id === "0";
    const shouldFetchProduct =
        product_id !== "0" &&
        product_id.trim() !== "" &&
        openModal;
    const [actype, setActype] = useState<"create" | "edit">("create");
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<IProductItem>({
        resolver: zodResolver(MasterProductZod as any) as Resolver<IProductItem>,
        defaultValues: IProductItemmDefule,
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
        queryKey: ["product_data", product_id],
        queryFn: async () => {
            return getOneProduct(product_id);
        },
        enabled: shouldFetchProduct,
        staleTime: 0,
        refetchOnMount: "always",
    });

    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

    useEffect(() => {
        if (isCreate) {
            reset(IProductItemmDefule);
        }
    }, [isCreate, reset]);

    const didInitRef = useRef(false);

    useEffect(() => {
        didInitRef.current = false;
    }, [product_id]);

    useEffect(() => {
        if (!shouldFetchProduct) return;
        if (!query.data) return;
        if (didInitRef.current) return;

        didInitRef.current = true;

        const getData = query.data as any;

        if (R.isEmpty(getData) || R.isNil(getData)) {
            Swal.fire({
                title: "ไม่พบข้อมูล",
                text: "เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            return;
        }

        reset(getData);
    }, [query.data, shouldFetchProduct, reset]);

    useEffect(() => {
        if (isCreate) return;
        if (!query.isError) return;

        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", query.error);
    }, [isCreate, query.isError, query.error]);

    const loading = query.isLoading;

    const values = watch();
    useEffect(() => {
        console.log("Values Set", values);
    }, [values]);

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
        const form = getValues();
        const name_by = localStorage.getItem("account_name") || "";

        try {
            if (isCreate) {
                console.log("Create-form", form);

                const dataCreate = {
                    ...form,
                    created_by_name: name_by,
                    base_price: form.has_variant ? 0 : form.base_price,
                    base_stock: form.has_variant ? 0 : form.base_stock,
                    variants: form.has_variant ? form.variants ?? [] : [],
                };

                if (form.has_variant) {
                    await CreateProductVariant(dataCreate);
                } else {
                    await CreateProduct(dataCreate);
                }

                queryClient.invalidateQueries({ queryKey: ["product_list"] });

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างข้อมูลสินค้าสำเร็จ",
                });

                return;
            }

            console.log("Update-form", form);

            await UpdateProduct({
                ...form,
                updated_by_name: name_by,
            });

            queryClient.invalidateQueries({ queryKey: ["product_list"] });

            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขข้อมูลสินค้าสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [getValues, isCreate, queryClient, setFlash]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูลบัญชีร้านค้า",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูลบัญชีร้านค้า",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await saveHandler();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [saveHandler, setConfirmPopup]);

    const handleDelete = useCallback(async () => {
        try {
            // const idToDelete = isCreate ? getValues("owner.owner_id") : owner_id;
            // await DeleteOwnerByOne(idToDelete);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลบข้อมูลบัญชีร้านค้าสำเร็จ",
            });

        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
            });
        }
    }, [getValues, isCreate, product_id, navigate, setFlash]);

    const onClickDeleteMaster = useCallback(() => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูลบัญชีร้านค้า !!",
            content: "ยืนยันหากต้องการลบข้อมูลบัญชีร้านค้า ข้อมูลบัญชีร้านค้าที่ลบไม่สามารถนำกลับมาได้",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await handleDelete();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [handleDelete, setConfirmPopup]);

    return {
        methods,
        actype,
        loading,
        navigate,
        onSubmitMaster,
        onClickDeleteMaster,
        handleErrorSubmit,
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
    };
};
export type IuseFetchProductFrom = ReturnType<typeof useFetchProductFrom>;
