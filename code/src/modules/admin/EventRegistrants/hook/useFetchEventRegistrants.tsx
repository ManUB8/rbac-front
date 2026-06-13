import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
    confirmPopupAtom,
    flashAlertAtom,
} from "../../../../shared/components/constants/OptionsAtom";
import { searchStateEventRegistrants } from "./useContext";
import type { IActivityOption } from "../interface/EventRegistrants.interface";
import { getActivityFilterInfo } from "../service/EventRegistrantsApi";
import type {
    IDeleteEventRegistrantsRequest,
    IStudentActivityJoinItem,
    IStudentActivityJoinResponse,
    IUpdateEventRegistrantsRequest,
} from "../interface/EventRegistrants.interface";
import {
    DeleteEventRegistrants,
    getAllEventRegistrants,
    UpdateEventRegistrants,
} from "../service/EventRegistrantsApi";

export const useFetchEventRegistrants = () => {
    const navigate = useNavigate();

    const [searchState, setSearchStateEventRegistrants] = useAtom(
        searchStateEventRegistrants
    );

    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const [searchInputCode, setSearchInputCode] = useState(
        searchState.student_code ?? ""
    );

    const debounceRef = useRef<number | null>(null);

    const [version, setVersion] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const [selected_data, setSelected_Data] =
        useState<IStudentActivityJoinItem | null>(null);

    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const query = useQuery<IStudentActivityJoinResponse, Error>({
        queryKey: ["event-registran", version, searchState],
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
        queryFn: async () => {
            return await getAllEventRegistrants(searchState);
        },
    });

    const activityQuery = useQuery<IActivityOption[], Error>({
        queryKey: ["activity-filter-info"],
        queryFn: getActivityFilterInfo,
    });


    const getStudentTargetGroup = (year_status?: string) => {
        if (year_status === "ปี 1") return "freshman";
        return "senior";
    };

    const getFilteredActivityOptions = useCallback(() => {
        if (!selected_data) return activityQuery.data ?? [];

        const studentGroup = getStudentTargetGroup(selected_data.year_status);

        return (activityQuery.data ?? []).filter((activity) => {
            return (
                activity.target_group === "all" ||
                activity.target_group === studentGroup
            );
        });
    }, [activityQuery.data, selected_data]);


    const handleChangeActivity = useCallback((activity: IActivityOption | null) => {
        setSelected_Data((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                activity_id: activity?.id || 0,
                activity_name: activity?.name || "",
            };
        });
    }, []);

    const handleChangeSearch = useCallback(
        (text: string) => {
            setSearchInput(text);

            if (debounceRef.current) {
                window.clearTimeout(debounceRef.current);
            }

            debounceRef.current = window.setTimeout(() => {
                setSearchStateEventRegistrants((prev) => ({
                    ...prev,
                    search: text || "",
                    page: 1,
                }));
            }, 800);
        },
        [setSearchStateEventRegistrants]
    );

    useEffect(() => {
        setSearchInput(searchState.search ?? "");
    }, [searchState.search]);

    const handleChangeSearchCode = useCallback(
        (text: string) => {
            setSearchInputCode(text);

            if (debounceRef.current) {
                window.clearTimeout(debounceRef.current);
            }

            debounceRef.current = window.setTimeout(() => {
                setSearchStateEventRegistrants((prev) => ({
                    ...prev,
                    student_code: text || "",
                    page: 1,
                }));
            }, 800);
        },
        [setSearchStateEventRegistrants]
    );

    useEffect(() => {
        setSearchInputCode(searchState.student_code ?? "");
    }, [searchState.student_code]);

    const handleOpenEdit = useCallback((row: IStudentActivityJoinItem) => {
        console.log("open edit", row);
        setSelected_Data(row);
        setOpenModal(true);
    }, []);

    const handleChangeAttendanceStatus = useCallback((status: string) => {
        setSelected_Data((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                check_detail: {
                    ...prev.check_detail,
                    attendance_status: status,
                },
            };
        });
    }, []);

    const saveHandler = useCallback(async () => {
        const name_by = localStorage.getItem("account_name") || "";

        if (!selected_data) return;

        try {
            const data_update: IUpdateEventRegistrantsRequest = {
                updated_by_name: name_by,
                student_activity_id: selected_data.student_activity_id,
                activity_id: selected_data.activity_id,
                attendance_status:
                    selected_data.check_detail.attendance_status || "เข้าร่วม",
            };

            console.log("Update activity", data_update);

            await UpdateEventRegistrants(data_update);

            reload();
            setOpenModal(false);
            setSelected_Data(null);

            setFlash({
                type_severity: "success",
                title: "",
                content: "การแก้ไขข้อมูลสำเร็จ",
            });
        } catch (error) {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [selected_data, reload, setFlash]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูล",
            content:
                "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูล",
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
        async (student_activity_id?: number) => {
            if (!student_activity_id) return;

            try {
                const name_by = localStorage.getItem("account_name") || "";

                const data_delete: IDeleteEventRegistrantsRequest = {
                    updated_by_name: name_by,
                    student_activity_id,
                };

                await DeleteEventRegistrants(data_delete);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลสำเร็จ",
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
        (student_activity_id?: number) => {
            setConfirmPopup({
                type: "warning",
                title: "ท่านต้องการลบข้อมูล !!",
                content:
                    "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await handleDelete(student_activity_id);
                    setConfirmPopup(null);
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [handleDelete, setConfirmPopup]
    );

    return {
        navigate,
        reload,

        selected_data,
        setSelected_Data,

        handleOpenEdit,
        handleChangeAttendanceStatus,

        openModal,
        setOpenModal,

        searchInput,
        searchInputCode,
        handleChangeSearch,
        handleChangeSearchCode,

        searchState,
        setSearchStateEventRegistrants,

        event_data: query.data?.data ?? [],
        total_all: query.data?.total_all ?? 0,
        event_loading: query.isLoading,
        event_fetch: query.isFetched,
        activity_options: getFilteredActivityOptions(),
        activity_loading: activityQuery.isLoading,
        handleChangeActivity,

        onSubmitMaster,
        onClickDeleteMaster,
    };
};

export type IuseFetchEventRegistrants = ReturnType<
    typeof useFetchEventRegistrants
>;