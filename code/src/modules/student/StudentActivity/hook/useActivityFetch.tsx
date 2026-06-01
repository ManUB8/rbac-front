import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getAllActivity, getAllActivityCode, RegisterStudentActivity } from "../service/ActivityApi";
import type { IActivityItem, IActivityListResponse, IStudentActivityRegister, IStudentActivityResponse, IStudentAvailableActivitiesResponse } from "../interface/Activity.interface";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";

export const useActivityStudentFetch = () => {
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IActivityListResponse, Error>({
        queryKey: ["activity_stu", version],
        retry: 1,
        queryFn: async () => {
            return await getAllActivity();
        },
    });

    return {
        reload,
        Activity_data: Activityquery.data?.data ?? [],
        ActivityLoading: Activityquery.isLoading,
        ActivityFetching: Activityquery.isFetching,
        ActivityError: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};

export type IuseActivityStudentFetch = ReturnType<typeof useActivityStudentFetch>;

export const useFetcheActivityStudentCode = () => {
    const stu_code = Cookies.get("user_code");
    const code = Number(stu_code);
    console.log("stu_code", code);
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IStudentAvailableActivitiesResponse, Error>({
        queryKey: ["activity_code", version, code],
        retry: 1,
        queryFn: async () => {
            return await getAllActivityCode(code);
        },
    });
    const activity_code = Activityquery.data?.student_code
    const activity_data = Activityquery.data?.data ?? []

    return {
        reload,
        activity_code,
        activity_data,
        activity_Loading: Activityquery.isLoading,
        activity_Fetching: Activityquery.isFetching,
        activity_Error: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};

export type IuseFetcheActivityStudentCode = ReturnType<typeof useFetcheActivityStudentCode>;

export const useFetcheRegisterStudentActivity = () => {
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const queryClient = useQueryClient();

    const brandMutation = useMutation({
        mutationFn: async (body: IStudentActivityRegister) => {

            return RegisterStudentActivity(body);
        },
        onSuccess: async (_, body) => {
            await queryClient.invalidateQueries({ queryKey: ["activity_code"] });

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลงทะเบียนกิจกรรมสำเร็จ",
            });
        },
        onError: (error) => {
            console.error(error);

            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลร้านค้า/แบรนด์ได้",
            });
        },
    });

    const onSubmitForm = useCallback(
        (body: IStudentActivityRegister, onSuccess?: () => void) => {
            setConfirmPopup({
                type: "normal",
                title: "ท่านต้องการลงทะเบียนกิจกรรม !!",
                content: "ยืนยันหากต้องการลงทะเบียนกิจกรรม",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await brandMutation.mutateAsync(body);
                    setConfirmPopup(null);
                    onSuccess?.();
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [brandMutation, setConfirmPopup]
    );

    return {
        onSubmitForm,
        loadingForm: brandMutation.isPending,
    };
};