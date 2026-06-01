import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    useForm,
    type FieldErrors,
    type Path,
    type Resolver,
    type UseFormSetFocus,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import * as R from "ramda";

import {
    confirmPopupAtom,
    flashAlertAtom,
} from "../../../../shared/components/constants/OptionsAtom";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";

import { searchStateUser } from "./useContext";
import { MasterUserZod } from "../utils/FieldValidationUser";
import {
    CreateUser,
    DeleteUser,
    getAllUser,
    getOneUser,
    UpdateUser,
} from "../service/User_ManageApi";

import {
    IUserItemDefault,
    type IUser,
    type IUserDeletePayload,
    type IUserTotalRole,
} from "../interface/User_Manage.interface";

export const useMasterFunctionUser = () => {
    const setFlash = useSetAtom(flashAlertAtom);
    const queryClient = useQueryClient();

    const [openUserModal, setOpenUserModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);

    const [searchState, setSearchStateUser] = useAtom(searchStateUser);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: [
            "Users-list",
            searchState.search,
            searchState.role,
            searchState.page,
            searchState.limit,
        ],
        queryFn: () =>
            getAllUser({
                search: searchState.search,
                role: searchState.role,
                page: searchState.page,
                limit: searchState.limit,
            }),
    });
    const User_data = data?.data ?? [];
    const total_User = data?.total_all ?? 0;
    const total_User_All = data?.total_user_all ?? 0;
    const total_Role: IUserTotalRole = data?.total_role ?? {
    
        temporary_admin: 0,
        student: 0,
        admin: 0,
    };

    const loading_User = isLoading || isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: ["Users-list"],
        });
    }, [queryClient]);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) {
            window.clearTimeout(debounceRef.current);
        }

        debounceRef.current = window.setTimeout(() => {
            setSearchStateUser((prev) => ({
                ...prev,
                search: text.trim(),
                page: 1,
            }));
        }, 500);
    }, [setSearchStateUser]);

    const handleCreateUser = useCallback(() => {
        setSelectedUserId(0);
        setOpenUserModal(true);
    }, []);




    const handleDelete = useCallback(
        async (user_id: number) => {
            console.log("handleDelete", user_id);

            try {
                if (!user_id) {
                    setFlash({
                        type_severity: "error",
                        title: "",
                        content: "ไม่พบรหัสผู้ใช้งานที่ต้องการลบ",
                    });
                    return;
                }

                const name_by = localStorage.getItem("account_name") || "";

                const data_delete: IUserDeletePayload = {
                    deleted_user_id: user_id,
                    deleted_by_name: name_by,
                };

                await DeleteUser(data_delete);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลผู้ใช้งานสำเร็จ",
                });

                reload();
            } catch (error) {
                console.error(error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
                });
            }
        },
        [setFlash, reload]
    );

    const onClickDeleteMaster = useCallback(
        (user_id: number) => {
            setSelectedUserId(user_id);

            setConfirmPopup({
                type: "warning",
                title: "ท่านต้องการลบข้อมูลผู้ใช้งาน !!",
                content: "ยืนยันหากต้องการลบข้อมูลผู้ใช้งาน",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await handleDelete(user_id);
                    setConfirmPopup(null);
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [handleDelete, setConfirmPopup]
    );

    const handleChangeActiveStatus = useCallback(
        async (row: IUser, status: boolean) => {
            try {
                const name_by = localStorage.getItem("account_name") || "";

                await UpdateUser({
                    ...row,
                    is_active: status,
                    updated_by_name: name_by,
                });

                queryClient.setQueriesData(
                    { queryKey: ["Users-list"] },
                    (oldData: any) => {
                        if (!oldData?.data) return oldData;

                        return {
                            ...oldData,
                            data: oldData.data.map((item: IUser) =>
                                item.user_id === row.user_id
                                    ? {
                                        ...item,
                                        is_active: status,
                                        updated_by_name: name_by,
                                    }
                                    : item
                            ),
                        };
                    }
                );
            } catch (error) {
                console.error(error);
            }
        },
        [queryClient]
    );
    return {
        User_data,
        loading_User,
        total_User,
        total_User_All,
        total_Role,
        searchInput,
        searchState,
        setSearchStateUser,
        handleChangeSearch,
        handleChangeActiveStatus,
        openUserModal,
        setOpenUserModal,
        selectedUserId,
        setSelectedUserId,
        handleCreateUser,
        onClickDeleteMaster,
        reload,
    };
};

export const useMasterFunctionUserFromFetch = ({
    id = 0,
    openUserModal,
    reload,
    setOpenUserModal,
}: {
    id?: number;
    openUserModal: boolean;
    setOpenUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
}) => {
    const queryClient = useQueryClient();

    const Id = id ?? 0;
    const isCreate = Id === 0;

    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const setFlash = useSetAtom(flashAlertAtom);

    const [actype, setActype] = useState<"create" | "edit">("create");

    const methods = useForm<IUser>({
        resolver: zodResolver(MasterUserZod as any) as Resolver<IUser>,
        defaultValues: IUserItemDefault,
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

    const query = useQuery({
        queryKey: ["User-one", Id],
        enabled: openUserModal && !isCreate && !!Id,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: () => getOneUser(Id),
    });

    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

    useEffect(() => {
        if (isCreate && openUserModal) {
            reset(IUserItemDefault);
        }
    }, [isCreate, openUserModal, reset]);

    useEffect(() => {
        if (isCreate) return;
        if (!query.data) return;

        const getData = query.data as IUser;

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

        reset({
            ...getData,
            confirm_password: getData.password ?? "",
        });
    }, [query.data, isCreate, reset]);

    const loading = query.isLoading;

    const handleErrorSubmit = async <T extends Record<string, any>>(
        errors: FieldErrors<T>,
        setFocus: UseFormSetFocus<T>
    ) => {
        const paths = getAllErrorPaths(errors);
        if (!paths.length) return;

        const pick = paths[0];
        setFocus(pick as Path<T>, { shouldSelect: true });
    };

    const saveHandler = useCallback(async () => {
        const form = getValues();
        const { confirm_password, ...payload } = form;

        try {
            if (isCreate) {
                const name_by = localStorage.getItem("account_name") || "";

                await CreateUser({
                    ...payload,
                    created_by_name: name_by,
                });

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "สร้างข้อมูลผู้ใช้งานสำเร็จ",
                });

                setOpenUserModal(false);
                reset(IUserItemDefault);
                reload();
                return;
            }

            const name_by = localStorage.getItem("account_name") || "";

            await UpdateUser({
                ...payload,
                updated_by_name: name_by,
            });

            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขข้อมูลผู้ใช้งานสำเร็จ",
            });

            setOpenUserModal(false);
            reload();

            queryClient.invalidateQueries({
                queryKey: ["User-one", Id],
            });
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [
        getValues,
        isCreate,
        reset,
        setFlash,
        setOpenUserModal,
        reload,
        queryClient,
        Id,
    ]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูล",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการบันทึกข้อมูล",
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

        methods,
        onSubmitMaster,
        handleErrorSubmit,

        openUserModal,
        setOpenUserModal,

        id: Id,
        isCreate,
    };
};

export type IuseMasterFunctionUser = ReturnType<typeof useMasterFunctionUser>;
export type IuseMasterFunctionUserFromFetch =
    ReturnType<typeof useMasterFunctionUserFromFetch>;