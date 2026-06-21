import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { data, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from "sweetalert2";
import { confirmPopupAtom, flashAlertAtom } from "../../../../../shared/components/constants/OptionsAtom";
import { ICategoryItemDefule, type ICategoryDeletePayload, type ICategoryItem } from "../interface/MasterCategories.interface";
import { CreateCategories, DeleteCategories, getAllCategories, UpdateCategories } from "../service/MasterCategoriesApi";
import { MasterCategoryZod } from "../utils/ValidationMasterCategories";
import { getAllErrorPaths } from "../../../../../shared/components/error/FunctionError";


export const useFetchMasterCategoryList = () => {
    const navigate = useNavigate();
    type ViewMode = "card" | "table";
    const [view, setView] = useState<ViewMode>("card");
    const showCard = view === "card";
    const showTable = view === "table";
    const setFlash = useSetAtom(flashAlertAtom);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState<ICategoryItem>(ICategoryItemDefule);
    const [openSearch, setopenSearch] = useState<boolean>(false);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);

    const query = useQuery<ICategoryItem[]>({
        queryKey: ["category-list"],
        queryFn: async () => {
            const res = await getAllCategories();
            console.log('cate-res', res)
            return res;
        },
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    const category_data = query.data ?? [];
    const loading_category = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: ["category-list"]
        });
    }, [queryClient]);

    const handleCreate = useCallback(() => {
        console.log("String")
        setSelectedId(ICategoryItemDefule)
        setOpenModel(true)
    }, []);

    const handleEdit = useCallback((data: ICategoryItem) => {
        console.log("open product id", data);
        setSelectedId(data);
        setOpenModel(true);
    }, []);

    const handleDelete = useCallback(
        async (category_id: string) => {
            console.log("handleDelete", category_id);

            try {
                if (!category_id) {
                    setFlash({
                        type_severity: "error",
                        title: "",
                        content: "ไม่พบรหัสหมวดหมู่ที่ต้องการลบ",
                    });
                    return;
                }

                const name_by = localStorage.getItem("account_name") || "";
                const data_delete: ICategoryDeletePayload = {
                    category_id: "",
                    updated_by_name: ""
                };

                await DeleteCategories(data_delete);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลหมวดหมู่สำเร็จ",
                });

                queryClient.invalidateQueries({ queryKey: ["category-list"] });
            } catch (error) {
                console.error(error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
                });
            }
        },
        [setFlash, queryClient]
    );

    const onClickDeleteMaster = (category_id: string) => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูลหมวดหมู่ !!",
            content: "ยืนยันหากต้องการลบข้อมูลหมวดหมู่",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await handleDelete(category_id);
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    };



    return {
        setConfirmPopup,
        navigate,
        selectedId,
        setSelectedId,
        handleEdit,
        reload,
        refetch: query.isFetched,
        setFlash,
        category_data,
        loading_category,
        handleDelete,
        onClickDeleteMaster,
        openSearch,
        openModel,
        setOpenModel,
        setopenSearch,
        handleCreate,

        // view
        view,
        setView,
        showCard,
        showTable,
    };
};
export type IuseFetchMasterCategoryList = ReturnType<typeof useFetchMasterCategoryList>;


export const useFetchMasterCategoryFrom = (getOneCategory: ICategoryItem, setOpenModel: Dispatch<SetStateAction<boolean>>, openModel: boolean) => {
    const category_id = getOneCategory.category_id ?? "";
    const isCreate = getOneCategory.category_id === "";
    const [actype, setActype] = useState<"create" | "edit">("create");
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<ICategoryItem>({
        resolver: zodResolver(MasterCategoryZod as any) as Resolver<ICategoryItem>,
        defaultValues: ICategoryItemDefule,
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
    } = methods;



    // ✅ handle create mode
    useEffect(() => {
        if (isCreate) {
            setActype("create");

            reset({
                ...getOneCategory,
                actype: "create",
            });
        }
    }, [isCreate, reset, getValues]);

    // ✅ handle edit mode (เมื่อ data มา)
    useEffect(() => {
        if (!isCreate && getOneCategory) {
            if (!getOneCategory || (Array.isArray(getOneCategory) && getOneCategory.length === 0)) {
                Swal.fire({
                    title: `ไม่พบข้อมูล`,
                    text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }

            setActype("edit");
            console.log('data', getOneCategory)
            reset({
                ...getOneCategory,
                actype: "edit"
            });
        }
    }, [getOneCategory, isCreate, reset]);

    // debug
    useEffect(() => {
        console.log("Valuse Set", getValues());
    }, [watch()]);

    // ✅ 2) ตั้ง actype จาก id
    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

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

    const saveHandler = useCallback(async () => {
        const form = getValues();
        const name_by = localStorage.getItem("account_name") || "";

        try {
            if (isCreate) {


                const data_create = { ...form, created_by_name: name_by };
                console.log("Create-form", data_create);

                await CreateCategories(data_create);
                queryClient.invalidateQueries({ queryKey: ["category-list"] });
                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างหมวดหมู่เมนูสำเร็จ",
                });
                setOpenModel(false)
                // navigate(AppRoutes.owner_management);
                return;
            }

            console.log("Update-form", form);
            const data_update = { ...form, updated_by_name: name_by };
            await UpdateCategories(data_update);

            queryClient.invalidateQueries({ queryKey: ["category-list"] });
            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขบันทึกหมวดหมู่เมนูสำเร็จ",
            });
            setOpenModel(false)
            // navigate(AppRoutes.owner_management);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [getValues, isCreate, navigate, setFlash, setOpenModel]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูลหมวดหมู่เมนู",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูลหมวดหมู่เมนู",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await saveHandler();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [saveHandler, setConfirmPopup]);


    return {
        methods,
        actype,
        navigate,
        onSubmitMaster,
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
export type IuseFetchMasterCategoryFrom = ReturnType<typeof useFetchMasterCategoryFrom>;