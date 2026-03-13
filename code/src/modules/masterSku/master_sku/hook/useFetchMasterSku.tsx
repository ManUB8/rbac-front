import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import * as R from 'ramda';
import Swal from "sweetalert2";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchStateSku } from "./AtomSku";
import { IMasterSkuDefaul, type ICategoryFilter, type ICategoryItem, type IGroupOption, type IMasterItem, type IMasterItemResponse, type IMasterSkuData, type IMasterSkuUpdateData, type IStorageTypeItem, type IUnitItem } from "../interface/MadterSku.interface";
import { CreateMasterSku, DeleteMasterSkuByOne, getAllMasterSku, getCreateMasterSku, getFilterMasterSku, getGroupMasterSku, getMasterSkuByOne, UpdateMasterSku } from "../service/MasterSkuApi";
import { MasterSkuZod } from "../../../../shared/components/FieldValidation";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { useNavigate, useParams } from "react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material";
import { AppRoutes } from "../../../../router/router";
import Cookies from 'js-cookie'
import { useMasterSkuFilterRenderers } from "./useFilter";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";

export const useFetchCategory = () => {
    const [category, setCategory] = useState<ICategoryFilter[]>([]);
    const [loading_category, setLoading_Category] = useState(true);
    const [version, setVersion] = useState(0);

    const reload = () => setVersion(v => v + 1);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setLoading_Category(true);
            try {
                const res = await getFilterMasterSku();
                const rows = res?.filter_by.category ?? [];

                if (!cancelled) setCategory(rows);
            } finally {
                if (!cancelled) setLoading_Category(false);
            }
        };

        run();

        return () => { cancelled = true; };
    }, [version]);  // ❗️เอา searchState ออกไป

    return { category, loading_category, reload };
};

export const useFetchInfo = () => {
    const [categories, setCategories] = useState<ICategoryItem[]>([]);
    const [storage_types, setStorage_types] = useState<IStorageTypeItem[]>([]);
    const [units_data, setUnits_Data] = useState<IUnitItem[]>([]);
    const [loading_info, setLoading_Info] = useState(true);
    const [version, setVersion] = useState(0);

    const reload = () => setVersion(v => v + 1);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setLoading_Info(true);
            try {
                const res = await getCreateMasterSku();
                const cate = res?.categories ?? [];
                const storage = res?.storage_types ?? [];
                const units = res?.units ?? [];
                setCategories(cate)
                setStorage_types(storage)
                setUnits_Data(units)
                if (!cancelled) setCategories(cate);
            } finally {
                if (!cancelled) setLoading_Info(false);
            }
        };

        run();

        return () => { cancelled = true; };
    }, [version]);

    return { categories, storage_types, units_data, loading_info, reload };
};

export const useFetchGroup = (search: string, opt?: { enabled?: boolean }) => {
    const enabled = opt?.enabled ?? true;

    const q = useQuery({
        queryKey: ["group", search],
        queryFn: () => getGroupMasterSku(search),
        enabled,
        placeholderData: (prev) => prev,
    });

    return {
        group: q.data ?? [],
        loading_group: q.isFetching,
        error_group: q.error,
        refetch_group: q.refetch,
    };
};

export const useMasterFunctionSkuFetch = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [searchStateSKU, setSearchStateSKU] = useAtom(searchStateSku);

    const [version, setVersion] = useState(0);
    const searchTimeoutRef = useRef<number | null>(null);

    const { FILTERS, renderBox } = useMasterSkuFilterRenderers();

    const reload = useCallback(() => setVersion((v) => v + 1), []);

    const handleCreateMasterSku = useCallback(() => {
        navigate(`${AppRoutes.master_sku}/create/0`);
    }, [navigate]);

    const handleOpenFilter = (open: boolean) => {
        console.log("open", open);
    };

    const [searchInput, setSearchInput] = useState(searchStateSKU.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            setSearchStateSKU((prev) => ({
                ...prev,
                search: text || "",
                page: '1',
            }));
        }, 800);
    }, [setSearchStateSKU]);

    useEffect(() => {
        setSearchInput(searchStateSKU.search ?? "");
    }, [searchStateSKU.search]);



    type MasterSkuListResult = { rows: IMasterItem[]; total: number };

    const skuQuery = useQuery<MasterSkuListResult>({
        queryKey: ["master-sku-list", searchStateSKU, version],
        queryFn: async () => {
            const res = await getAllMasterSku(searchStateSKU);
            const rows = res?.items ?? [];
            const total = Number(res?.total_items ?? rows.length);
            return { rows, total: Number.isFinite(total) ? total : 0 };
        },
        placeholderData: keepPreviousData,
        retry: 1,
        staleTime: 0,
    });

    const master_sku = skuQuery.data?.rows ?? [];
    const total_sku = skuQuery.data?.total ?? 0
    const loading_sku = skuQuery.isLoading || skuQuery.isFetching;

    return {
        handleChangeSearch,
        navigate,
        reload,
        FILTERS,
        renderBox,
        master_sku,
        loading_sku,
        total_sku,
        searchStateSKU,
        setSearchStateSKU,
        handleCreateMasterSku,
        handleOpenFilter,
        theme,
        refetch: skuQuery.refetch,
        isFetching: skuQuery.isFetching,
        error: skuQuery.error,
        searchInput,
    };
};

export type IuseMasterFunctionSkuFetch = ReturnType<typeof useMasterFunctionSkuFetch>;

export const useMasterFunctionSkuFromFetch = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { id: routeId } = useParams<{ id?: string }>();
    const master_item_id = routeId ?? "0";
    const isCreate = master_item_id === "0";

    const [actype, setActype] = useState<"create" | "edit">("create");
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);
    const [valueTab, setValueTab] = useState<string>("1");

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     setValue,
    //     watch,
    //     getValues,
    //     control,
    //     setError,
    //     clearErrors,
    //     formState: { errors },
    // } = useForm<IMasterSkuData>({
    //     resolver: zodResolver(MasterSkuZod as any) as Resolver<IMasterSkuData>,
    //     defaultValues: IMasterSkuDefaul,
    // });

    const methods = useForm<IMasterSkuData>({
        resolver: zodResolver(MasterSkuZod as any) as Resolver<IMasterSkuData>,
        defaultValues: IMasterSkuDefaul,
        shouldFocusError: true,
    });
    const { register, handleSubmit, reset, setValue, watch, getValues, control, setError, clearErrors, formState: { errors }, setFocus } = methods;


    const handleChangeTab = useCallback((_: any, newValue: string) => {
        setValueTab(newValue);
    }, []);

    // ✅ 1) useQuery ดึงข้อมูลแทน useEffect(async)
    const query = useQuery({
        queryKey: ["master-sku", master_item_id],
        enabled: !!master_item_id, // กัน undefined
        retry: 1,
        queryFn: async () => {
            if (isCreate) return await getCreateMasterSku();
            return await getMasterSkuByOne(master_item_id);
        },
    });

    // ✅ 2) ตั้ง actype จาก id
    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

    // ✅ 3) กัน reset ซ้ำตอน refetch (ถ้าไม่อยากกัน ลบ ref นี้ได้)
    const didInitRef = useRef(false);
    useEffect(() => {
        didInitRef.current = false;
    }, [master_item_id]);

    // ✅ 4) reset form เมื่อ data มา
    useEffect(() => {
        if (!query.data) return;
        if (didInitRef.current) return;
        didInitRef.current = true;

        if (isCreate) {
            const code = (query.data as any).master_item_code;
            const currentForm = getValues();
            reset({ ...currentForm, master_item_code: code });
            return;
        }

        const getData = query.data as any;

        if (R.isEmpty(getData) || R.isNil(getData)) {
            Swal.fire({
                title: `ไม่พบข้อมูล`,
                text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then(() => navigate(AppRoutes.master_sku));
            return;
        }

        reset(getData);
    }, [query.data, isCreate, getValues, reset, navigate]);

    // ✅ 5) error จาก query (optional)
    useEffect(() => {
        if (!query.isError) return;
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", query.error);
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลได้", "error");
    }, [query.isError, query.error]);

    // ✅ loading ใช้จาก query
    const loading = query.isLoading;

    // debug
    const values = watch();
    useEffect(() => console.log("Values Set", values), [values]);

    // const handleErrorSubmit = async (element: any) => {
    //     console.log("errorZod", element);
    // };

    const handleErrorSubmit = async <T extends Record<string, any>>(
        errors: FieldErrors<T>,
        setFocus: UseFormSetFocus<T>
    ) => {
        const paths = getAllErrorPaths(errors);
        if (!paths.length) return;
        console.log("paths", paths)
        // ✅ เลือก path แรกที่ "มี element อยู่จริง" ก่อน
        const pick =
            paths.find((p) => document.getElementById(p) || document.querySelector(`[name="${p}"]`)) ??
            paths[0];

        console.log(pick)
        setFocus(pick as Path<T>, { shouldSelect: true });

        requestAnimationFrame(() => {
            const el =
                (document.getElementById(pick) as HTMLElement | null) ||
                (document.querySelector(`[name="${pick}"]`) as HTMLElement | null);

            if (!el) return;

            // ✅ หา container ที่ scroll จริง (DialogContent)
            const container = (el.closest(".MuiDialogContent-root") as HTMLElement | null);

            if (!container) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            const elRect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();

            const top = container.scrollTop + (elRect.top - cRect.top) - 80; // -80 เผื่อหัว sticky
            container.scrollTo({ top, behavior: "smooth" });
        });
    };


    const mapFormToUpdateData = useCallback((form: IMasterSkuData): IMasterSkuUpdateData => {
        const name_by = Cookies.get("accountName") || "";
        return {
            master_item_id: form.master_item_id,
            master_item_code: form.master_item_code,
            master_item_name: form.master_item_name,
            image: form.image ?? "",
            category_id: form.category?.category_id ?? "",
            sub_category_id: form.sub_category?.sub_category_id ?? "",
            group_id: form.group?.group_id ?? "",
            stock_unit_id: form.stock_unit?.stock_unit_id ?? "",
            stock_unit_ratio: form.stock_unit?.stock_unit_ratio ?? "",
            small_units: form.small_units,
            warehouse_shelf_life: form.warehouse_shelf_life ?? "",
            warehouse_storage_type_id: form.warehouse_storage_type?.warehouse_storage_type_id ?? "",
            branch_shelf_life: form.branch_shelf_life ?? "",
            branch_storage_type_id: form.branch_storage_type?.branch_storage_type_id ?? "",
            is_active: Boolean(form.is_active),
            updated_by: name_by,
        };
    }, []);

    const saveHandler = useCallback(async () => {
        const form = getValues();

        try {
            if (isCreate) {
                const name_by = Cookies.get("accountName") || "";
                const data_create = { ...form, created_by: name_by };

                await CreateMasterSku(data_create);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างข้อมูลสินค้ากลางสำเร็จ",
                });
                navigate(AppRoutes.master_sku);
                return;
            }

            const data_update = mapFormToUpdateData(form);
            await UpdateMasterSku(data_update);

            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขบันทึกข้อมูลสินค้ากลางสำเร็จ",
            });
            navigate(AppRoutes.master_sku);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [getValues, isCreate, mapFormToUpdateData, navigate, setFlash]);

    const onSubmitMasterSku = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูลสินค้ากลาง",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูลสินค้ากลาง",
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
            const idToDelete = !isCreate ? master_item_id : getValues("master_item_id");

            await DeleteMasterSkuByOne(idToDelete);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลบข้อมูลสินค้ากลางสำเร็จ",
            });
            navigate(AppRoutes.master_sku);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
            });
        }
    }, [getValues, isCreate, master_item_id, navigate, setFlash]);

    const onClickDeleteMasterSku = useCallback(() => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูลสินค้ากลาง !!",
            content: "ยืนยันหากต้องการลบข้อมูลสินค้ากลาง ข้อมูลสินค้ากลางที่ลบไม่สามารถนำกลับมาได้",
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
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        loading, // ✅ มาจาก useQuery แล้ว
        errors,
        actype,
        setError,
        clearErrors,
        setFlash,
        setConfirmPopup,
        navigate,
        valueTab,
        setValueTab,
        handleChangeTab,
        theme,

        methods,
        onSubmitMasterSku,
        onClickDeleteMasterSku,
        handleErrorSubmit,

        // (optional) ถ้าอยากใช้ที่หน้า UI
        refetch: query.refetch,
        queryError: query.error,

    };
};
export type IuseMasterFunctionSkuFromFetch = ReturnType<typeof useMasterFunctionSkuFromFetch>;