import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type {
    IActivityFilterByDate,
    IStudentActivityCheckItem,
    TargetGroupFilter,
} from "../interface/StudentActivitiesPhone.interface";

import {
    CheckInStudentActivitiesPhone,
    CheckOutStudentActivitiesPhone,
} from "../service/StudentActivitiesPhoneApi";
import { getActivityFilter_BY_Date } from "../../Student_Activities_Computer/service/StudentActivitiesComputerApi";
import dayjs from "dayjs";
import Swal from "sweetalert2";

type ScanMode = "checkin" | "checkout";

interface QRPayload {
    student_code: string;
    lat?: number;
    lng?: number;
}

export const useStudentActivitiesPhoneForm = () => {
    const [openScanner, setOpenScanner] = useState(false);
    const scanTimerRef = useRef<number | null>(null);

    const [mode, setMode] = useState<ScanMode>("checkin");
    const [targetGroup, setTargetGroup] = useState<TargetGroupFilter>(null);
    const [activityId, setActivityId] = useState<number | null>(null);

    const [qrText, setQrText] = useState("");
    const [lastLat, setLastLat] = useState<number | null>(13.7521);
    const [lastLng, setLastLng] = useState<number | null>(100.65289);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [latestStudent, setLatestStudent] =
        useState<IStudentActivityCheckItem | null>(null);

    const speechUnlockedRef = useRef(false);

    const today = dayjs().format("YYYY-MM-DD");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [activityDate, setActivityDate] = useState("");

    const activityQuery = useQuery<IActivityFilterByDate[]>({
        queryKey: ["activity-filter-by-date",
            startDate,
            endDate,
            targetGroup,
            activityDate,
        ],
        queryFn: () =>
            getActivityFilter_BY_Date({
                start_date: startDate,
                end_date: endDate,
                target_group: targetGroup || "all",
                activity_date: activityDate,
            }),
        enabled: Boolean(startDate && endDate),
    });

    // const activityQuery = useQuery<IActivityFilterByDate[]>({
    //     queryKey: ["activity-filter-by-date"],
    //     queryFn: getActivityFilter_BY_Date,
    // });

    const activityFilter = activityQuery.data ?? [];

    const filteredActivities = useMemo<IActivityFilterByDate[]>(() => {
        return activityFilter;
    }, [activityFilter]);


    // const filteredActivities = useMemo<IActivityFilterByDate[]>(() => {
    //     return activityFilter.filter((item) => {
    //         return (
    //             targetGroup === "all" ||
    //             item.target_group === targetGroup
    //         );
    //     });
    // }, [activityFilter, targetGroup]);

    const selectedActivity = useMemo<IActivityFilterByDate | null>(() => {
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

    const parseQR = (value: string): QRPayload => {
        const text = value.trim();

        if (text.includes("|")) {
            const [student_code, lat, lng] = text.split("|");

            return {
                student_code: student_code.trim(),
                lat: Number(lat),
                lng: Number(lng),
            };
        }

        try {
            const parsed = JSON.parse(text);

            return {
                student_code: parsed.student_code ?? "",
                lat: Number(parsed.lat),
                lng: Number(parsed.lng ?? parsed.ng),
            };
        } catch {
            return {
                student_code: text,
            };
        }
    };

    const isReadyToSubmit = (value: string) => {
        const text = value.trim();

        return (
            text.split("|").length === 3 ||
            (text.startsWith("{") && text.endsWith("}")) ||
            /^[0-9]{8}$/.test(text)
        );
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLastLat(position.coords.latitude);
            setLastLng(position.coords.longitude);
        });
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

    const showError = (message: string) => {
        handleResultMessage("error", message);

        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: message,
            confirmButtonText: "ตกลง",
        });
    };

    const handleSubmit = async (rawValue = qrText) => {
        if (loadingSubmit) return;

        setErrorMessage("");
        setSuccessMessage("");

        // if (!activityId) {
        //     setErrorMessage("กรุณาเลือกกิจกรรมก่อน");
        //     return;
        // }

        if (!activityId) {
            showError("กรุณาเลือกกิจกรรมก่อน");
            return;
        }

        const payload = parseQR(rawValue);

        // if (!payload.student_code) {
        //     setErrorMessage("กรุณาสแกน QR หรือกรอกรหัสนิสิต");
        //     return;
        // }
        if (!payload.student_code) {
            showError("กรุณาสแกน QR หรือกรอกรหัสนิสิต");
            return;
        }

        const lat = payload.lat ?? lastLat;
        const lng = payload.lng ?? lastLng;

        // if (!lat || !lng) {
        //     setErrorMessage("ไม่พบพิกัด กรุณากดขอตำแหน่งก่อน");
        //     setQrText("");
        //     return;
        // }
        if (!lat || !lng) {
            showError("ไม่พบพิกัด กรุณากดขอตำแหน่งก่อน");
            setQrText("");
            return;
        }

        try {
            setLoadingSubmit(true);

            if (mode === "checkin") {
                const res = await CheckInStudentActivitiesPhone({
                    student_code: payload.student_code,
                    activity_id: activityId,
                    created_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkin_lat: lat,
                    checkin_lng: lng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คอินสำเร็จ");
            } else {
                const res = await CheckOutStudentActivitiesPhone({
                    student_code: payload.student_code,
                    activity_id: activityId,
                    updated_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkout_lat: lat,
                    checkout_lng: lng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คเอาท์สำเร็จ");
            }

            setLastLat(lat);
            setLastLng(lng);
            setQrText("");
        } catch (error: any) {
            const message =
                error?.response?.data?.detail || "เกิดข้อผิดพลาด";

            showError(message);
            setQrText("");
        } finally {
            setLoadingSubmit(false);
        }
        // } catch (error: any) {
        //     const message =
        //         error?.response?.data?.detail || "เกิดข้อผิดพลาด";

        //     handleResultMessage("error", message);
        //     setQrText("");
        // } finally {
        //     setLoadingSubmit(false);
        // }
    };

    const handleQrChange = (value: string) => {
        setQrText(value);

        if (scanTimerRef.current) {
            window.clearTimeout(scanTimerRef.current);
        }

        scanTimerRef.current = window.setTimeout(() => {
            const trimmed = value.trim();

            if (trimmed && isReadyToSubmit(trimmed)) {
                handleSubmit(trimmed);
            }
        }, 500);
    };

    return {
        openScanner,
        setOpenScanner,

        mode,
        setMode,

        targetGroup,
        handleChangeTargetGroup,

        activityId,
        setActivityId,
        selectedActivity,
        filteredActivities,
        activity_filter_Loading: activityQuery.isLoading,

        qrText,
        handleQrChange,

        lastLat,
        lastLng,
        handleGetLocation,

        loadingSubmit,
        errorMessage,
        successMessage,
        latestStudent,

        unlockSpeech,
        isReadyToSubmit,
        handleSubmit,
    };
};

export type IUseStudentActivitiesPhoneForm = ReturnType<
    typeof useStudentActivitiesPhoneForm
>;