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
import { IActivityDataDefault, type IActivityItem } from "../interface/ActivityManage.interface";
import { getActivityStatus, getAllActivity, getOneActivity } from "../service/ActivityManageApi";
import { ActivityZod } from "../utils/ValidationActivity";

export const useActivityFetch = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | 0>(0);
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
    const handleOpenAdd = () => {
        setSelectedId(0);
        setOpenModal(true);
    };

    const handleOpenEdit = (activity_id: number) => {
        setSelectedId(activity_id);
        setOpenModal(true);
    };

    const handleDelete = (activity_id: number) => {

    };
    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        handleOpenAdd,
        handleOpenEdit,
        handleDelete,
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
    setOpenModal,
}: {
    id?: number;
    facultyId?: number | null;
    majorId?: number | null;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const Id = id ?? 0;
    const isCreate = Id === 0;
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
        enabled: openModal && !isCreate && !!Id,
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

        try {
            if (isCreate) {
                console.log("Create-form", form);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างข้อมูลสำเร็จ",
                });

                setOpenModal(false);
                reset(IActivityDataDefault);
                return;
            }

            console.log("Update-form", form);

            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขบันทึกข้อสำเร็จ",
            });

            setOpenModal(false);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [getValues, isCreate, reset, setFlash, setOpenModal]);

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

    const handleDelete = useCallback(async () => {
        try {
            const idToDelete = !isCreate ? Id : getValues("activity_id");

            console.log("delete id", idToDelete);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลบข้อมูลสำเร็จ",
            });

            setOpenModal(false);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
            });
        }
    }, [getValues, isCreate, Id, setFlash, setOpenModal]);

    const onClickDeleteMaster = useCallback(() => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูล !!",
            content: "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
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
        loading,
        errors,
        actype,
        setError,
        clearErrors,
        setFlash,
        setConfirmPopup,
        navigate,
        theme,
        methods,
        onSubmitMaster,
        onClickDeleteMaster,
        handleErrorSubmit,
        refetch: query.refetch,
        queryError: query.error,
        openModal,
        setOpenModal,
        id: Id,
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
