import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as R from 'ramda';
import Swal from "sweetalert2";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";
import { IActivityDataDefault, type IActivityDelete, type IActivityItem } from "../interface/ActivityManage.interface";
import {
    getAllActivity,
    getOneActivity,
    CreateActivity,
    UpdateActivity,
    DeleteActivity,
    getActivityStatus,
} from "../service/ActivityManageApi";
import { ActivityZod } from "../utils/ValidationActivity";

export const useActivityFetch = () => {

    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | 0>(0);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IActivityItem[], Error>({
        queryKey: ["activity", version],
        retry: 1,
        queryFn: async () => {
            return await getAllActivity();
        },
    });
    const handleOpenAdd = useCallback(() => {
        setFormMode("create");
        setSelectedId(0);
        setOpenModal(true);
    }, [setFormMode, setSelectedId, setOpenModal]);

    const handleOpenEdit = useCallback((id: number) => {
        setFormMode("edit");
        setSelectedId(id);
        setOpenModal(true);
    }, [setFormMode, setSelectedId, setOpenModal]);

    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        formMode,
        setFormMode,
        handleOpenAdd,
        handleOpenEdit,
        openModal,
        setOpenModal,
        activity_data: Activityquery.data ?? [],
        total: Activityquery.data?.length ?? 0,
        activityLoading: Activityquery.isLoading,
        activityFetching: Activityquery.isFetching,
        activityError: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};

export type IuseActivityFetch = ReturnType<typeof useActivityFetch>;


export const useMasterFunctionActivityFromFetch = ({
    id = 0,
    openModal,
    formMode,
    activity_id,
    setOpenModal,
    reload
}: {
    id?: number;
    activity_id: number;
    formMode: "create" | "edit";
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const Id = id ?? 0;
    const isCreate = formMode === "create";
    const [actype, setActype] = useState<"create" | "edit">("create");
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const methods = useForm<IActivityItem>({
        resolver: zodResolver(ActivityZod as any) as Resolver<IActivityItem>,
        defaultValues: IActivityDataDefault,
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
        queryKey: ["activity-one", Id],
        enabled: openModal && formMode === "edit" && !!Id,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            return await getOneActivity(Id);
        },
    });

    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

    useEffect(() => {
        if (isCreate && openModal) {
            reset(IActivityDataDefault);
        }
    }, [isCreate, openModal, reset]);

    const didInitRef = useRef(false);

    useEffect(() => {
        didInitRef.current = false;
    }, [Id, openModal]);

    useEffect(() => {
        if (isCreate) return;
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
    }, [query.data, isCreate, reset]);

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
            if (formMode === "create") {
                const data_create: IActivityItem = {
                    ...IActivityDataDefault,
                    ...form,
                    activity_id: activity_id,
                    activity_name: form.activity_name,
                    created_by_name: name_by,
                };
                console.log("Create activity", data_create);
                await CreateActivity(data_create);
                reload();
                setOpenModal(false);
            } else {
                const data_update: IActivityItem = {
                    ...IActivityDataDefault,
                    ...form,
                    activity_id: activity_id,
                    activity_name: form.activity_name,
                    updated_by_name: name_by,
                };
                console.log("Update activity", data_update);
                await UpdateActivity(data_update);
                reload();
                setOpenModal(false);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: formMode === "edit" ? "การสร้างข้อมูลสำเร็จ" : "การแก้ไขข้อมูลสำเร็จ",
                });
            }
            setOpenModal(false);
            reset(IActivityDataDefault);
            // return;
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [formMode, activity_id, getValues, isCreate, reset, setFlash, setOpenModal]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูล",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูล",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await saveHandler();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [saveHandler, setConfirmPopup]);



    const handleDelete = useCallback(
        async (activityId?: number) => {
            try {
                const name_by = localStorage.getItem("account_name") || "";

                console.log("deleteactivity",activityId)
                const data_delete: IActivityDelete = {
                    activity_id: Number(activityId),
                    updated_by_name: name_by,
                };
                await DeleteActivity(data_delete);


                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลสำเร็จ",
                });
                reload();
                setOpenModal(false);

            } catch (error) {
                console.error(error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
                });
            }
        },
        [activity_id, isCreate, Id, getValues, setFlash, setOpenModal, reload]
    );
    const onClickDeleteMaster = useCallback((activity_id?: number) => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูล !!",
            content: "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await handleDelete(activity_id);
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });

    },
        [handleDelete, setConfirmPopup]
    );


    return {
        register,
        handleSubmit,
        reset,
        setValue,
        actype,
        watch,
        getValues,
        control,
        formMode,
        loading,
        errors,
        setError,
        clearErrors,
        setFlash,
        setConfirmPopup,
        navigate,
        theme,
        methods,
        onClickDeleteMaster,
        onSubmitMaster,
        handleErrorSubmit,
        handleDelete,
        refetch: query.refetch,
        queryError: query.error,

        openModal,
        setOpenModal,

        id: Id,
        activity_id, // ✅ เพิ่ม
        isCreate,
    };
};

export type IuseMasterFunctionActivityFromFetch = ReturnType<typeof useMasterFunctionActivityFromFetch>;



export const useActivityStatusFetch = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IActivityItem[], Error>({
        queryKey: ["activity", version],
        retry: 1,
        queryFn: async () => {
            return await getActivityStatus();
        },
    });

    return {
        navigate,
        reload,
        activity_data: Activityquery.data ?? [],
        total: Activityquery.data?.length ?? 0,
        activityLoading: Activityquery.isLoading,
        activityFetching: Activityquery.isFetching,
        activityError: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};
