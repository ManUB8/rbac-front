import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type {
    IActivityFilterByDate,
    IStudentActivityCheckItem,
    TargetGroupFilter,
} from "../interface/StudentActivitiesManual.interface";

import {
    CheckInStudentActivitiesManual,
    CheckOutStudentActivitiesManual,
    getActivityFilter_BY_Date,
} from "../service/StudentActivitiesManualApi";

type ScanMode = "checkin" | "checkout";

export const useStudentActivitiesManualForm = () => {
    const [mode, setMode] = useState<ScanMode>("checkin");
    const [targetGroup, setTargetGroup] = useState<TargetGroupFilter>(null);
    const [activityId, setActivityId] = useState<number | null>(null);

    const [studentCode, setStudentCode] = useState("");
    const [lastLat, setLastLat] = useState<number | null>(null);
    const [lastLng, setLastLng] = useState<number | null>(null);

    const [loadingLocation, setLoadingLocation] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [latestStudent, setLatestStudent] =
        useState<IStudentActivityCheckItem | null>(null);

    const speechUnlockedRef = useRef(false);

    const activityQuery = useQuery<IActivityFilterByDate[]>({
        queryKey: ["manual-activity-filter-by-date"],
        queryFn: getActivityFilter_BY_Date,
    });

    const activityFilter = activityQuery.data ?? [];

    const filteredActivities = useMemo(() => {
        return activityFilter.filter((item) => {
            return (
                targetGroup === "all" ||
                item.target_group === targetGroup
            );
        });
    }, [activityFilter, targetGroup]);

    const selectedActivity = useMemo(() => {
        return (
            filteredActivities.find(
                (item) => item.activity_id === activityId
            ) ?? null
        );
    }, [filteredActivities, activityId]);

    const handleChangeTargetGroup = (value: TargetGroupFilter) => {
        setTargetGroup(value);
        setActivityId(null);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const unlockSpeech = () => {
        if (!("speechSynthesis" in window)) return;

        speechUnlockedRef.current = true;

        const utterance = new SpeechSynthesisUtterance(" ");
        utterance.lang = "th-TH";
        utterance.volume = 0;

        window.speechSynthesis.speak(utterance);
    };

    const speakMessage = (message: string) => {
        if (!message) return;
        if (!("speechSynthesis" in window)) return;
        if (!speechUnlockedRef.current) return;

        window.speechSynthesis.cancel();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = "th-TH";
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            window.speechSynthesis.speak(utterance);
        }, 150);
    };

    const handleResultMessage = (
        type: "success" | "error",
        message: string
    ) => {
        if (type === "success") {
            setSuccessMessage(message);
            setErrorMessage("");
        } else {
            setErrorMessage(message);
            setSuccessMessage("");
        }

        speakMessage(message);
    };

    const handleGetLocation = () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!navigator.geolocation) {
            handleResultMessage("error", "อุปกรณ์นี้ไม่รองรับการขอตำแหน่ง");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setLastLat(lat);
                setLastLng(lng);

                setLoadingLocation(false);
                handleResultMessage("success", "ดึงตำแหน่งสำเร็จ");
            },
            () => {
                setLoadingLocation(false);
                handleResultMessage(
                    "error",
                    "ไม่สามารถดึงตำแหน่งได้ กรุณาอนุญาต GPS"
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleChangeStudentCode = (value: string) => {
        const onlyNumber = value.replace(/\D/g, "").slice(0, 8);
        setStudentCode(onlyNumber);
    };

    const handleSubmit = async () => {
        if (loadingSubmit) return;

        setErrorMessage("");
        setSuccessMessage("");

        const code = studentCode.trim();

        if (!activityId) {
            handleResultMessage("error", "กรุณาเลือกกิจกรรมก่อน");
            return;
        }

        if (!/^\d{8}$/.test(code)) {
            handleResultMessage("error", "กรุณากรอกรหัสนิสิต 8 หลัก");
            return;
        }

        if (!lastLat || !lastLng) {
            handleResultMessage("error", "กรุณากดขอตำแหน่งก่อน");
            return;
        }

        try {
            setLoadingSubmit(true);

            if (mode === "checkin") {
                const res = await CheckInStudentActivitiesManual({
                    student_code: code,
                    activity_id: activityId,
                    created_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkin_lat: lastLat,
                    checkin_lng: lastLng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คอินสำเร็จ");
            } else {
                const res = await CheckOutStudentActivitiesManual({
                    student_code: code,
                    activity_id: activityId,
                    updated_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkout_lat: lastLat,
                    checkout_lng: lastLng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คเอาท์สำเร็จ");
            }

            setStudentCode("");
        } catch (error: any) {
            const message =
                error?.response?.data?.detail || "เกิดข้อผิดพลาด";

            handleResultMessage("error", message);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        mode,
        setMode,

        targetGroup,
        handleChangeTargetGroup,

        activityId,
        setActivityId,
        selectedActivity,
        filteredActivities,
        activity_filter_Loading: activityQuery.isLoading,

        studentCode,
        handleChangeStudentCode,

        lastLat,
        lastLng,
        loadingLocation,
        handleGetLocation,

        loadingSubmit,
        errorMessage,
        successMessage,
        latestStudent,

        unlockSpeech,
        handleSubmit,
    };
};

export type IUseStudentActivitiesManualForm = ReturnType<
    typeof useStudentActivitiesManualForm
>;