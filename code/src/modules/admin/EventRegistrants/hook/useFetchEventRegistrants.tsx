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
import { searchStateEventRegistrants } from "./useContext";
import type { IDeleteEventRegistrantsRequest, IEventRegistrantsAllInOneResponse, IStudentActivityJoinResponse, IUpdateEventRegistrantsRequest } from "../interface/EventRegistrants.interface";
import { DeleteEventRegistrants, getAllEventRegistrants, UpdateEventRegistrants } from "../service/EventRegistrantsApi";


export const useFetchEventRegistrants = () => {
    const navigate = useNavigate();
    const [searchState, setSearchStateEventRegistrants] = useAtom(searchStateEventRegistrants);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const [searchInputCode, setSearchInputCode] = useState(searchState.student_code ?? "");
    const debounceRef = useRef<number | null>(null);

    const [version, setVersion] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selected_data, setSelected_Data] = useState<IUpdateEventRegistrantsRequest>();
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

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateEventRegistrants((prev) => ({
                ...prev,
                search: text || "",
                page: 1,
            }));
        }, 800);
    }, [setSearchStateEventRegistrants]);

    useEffect(() => {
        setSearchInput(searchState.search ?? "");
    }, [searchState.search]);

    const handleChangeSearchCode = useCallback((text: string) => {
        setSearchInputCode(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateEventRegistrants((prev) => ({
                ...prev,
                student_code: text || "",
                page: 1,
            }));
        }, 800);
    }, [setSearchStateEventRegistrants]);

    useEffect(() => {
        setSearchInputCode(searchState.student_code ?? "");
    }, [searchState.student_code]);



    const handleOpenEdit = useCallback((body: IUpdateEventRegistrantsRequest) => {
        setSelected_Data(body);
        setOpenModal(true);
    }, [setSelected_Data, setOpenModal]);


    const saveHandler = useCallback(async () => {
        const name_by = localStorage.getItem("account_name") || "";

        try {

            const data_update: IUpdateEventRegistrantsRequest = {
                updated_by_name: name_by,
                student_activity_id: selected_data?.student_activity_id || 0,
                activity_id: selected_data?.activity_id || 0,
                attendance_status: selected_data?.attendance_status || 'เข้าร่วม'
            };
            console.log("Update activity", data_update);
            await UpdateEventRegistrants(data_update);
            reload();
            setOpenModal(false);

            setFlash({
                type_severity: "success",
                title: "",
                content: "การแก้ไขข้อมูลสำเร็จ",
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
    }, [setFlash, setOpenModal]);

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
        async (student_activity_id?: number) => {
            if (!student_activity_id) {
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "ไม่พบรหัสรายการที่ต้องการลบ",
                });
                return;
            }

            try {
                const name_by = localStorage.getItem("account_name") || "";

                const data_delete: IDeleteEventRegistrantsRequest = {
                    updated_by_name: name_by,
                    student_activity_id: student_activity_id,
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

    const onClickDeleteMaster = useCallback((student_activity_id?: number) => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูล !!",
            content: "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
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



    const event_data = query.data?.data ?? []
    const total_all = query.data?.total_all ?? 0;
    const event_loading = query.isLoading
    const event_fetch = query.isFetched


    return {
        navigate,
        reload,
        selected_data,
        setSelected_Data,
        handleOpenEdit,
        openModal,
        setOpenModal,
        searchInput,
        searchState,
        searchStateEventRegistrants,
        setSearchInput,
        handleChangeSearch,
        setConfirmPopup,
        setSearchStateEventRegistrants,
        event_data,
        event_fetch,
        event_loading,
        total_all,
        onSubmitMaster,
        onClickDeleteMaster,
        searchInputCode,
        setSearchInputCode,
        handleChangeSearchCode
    };
};
export type IuseFetchEventRegistrants = ReturnType<typeof useFetchEventRegistrants>;
