import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { FormProvider, useForm } from "react-hook-form";
import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { useActivityStatusFetch } from "../../../ActivityManage/hook/useFetchActivity";
import {
    CreateStudentActivities
} from "../../service/StudentActivitiesApi";
import type { IStudentActivityBody, IStudentActivityResponse } from "../../interface/StudentActivities.interface";

export interface IStudentActivitiesFromProps {

}

interface IFormInput {
    activity_id: number | "";
    student_code: string;
}

interface IActivityOption {
    activity_id: number;
    activity_name: string;
    activity_date?: string;
}

const inputSx = {
    "& .MuiFilledInput-root, & .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#f7f7f8",
    },
};

const StudentActivitiesFrom: React.FunctionComponent<IStudentActivitiesFromProps> = ({

}) => {
    const methods = useForm<IFormInput>({
        defaultValues: {
            activity_id: "",
            student_code: "",
        },
        mode: "onChange",
    });

    const {
        handleSubmit,
        watch,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = methods;

    const { activity_data, activityLoading } = useActivityStatusFetch();

    const [submitLoading, setSubmitLoading] = useState(false);
    const [result, setResult] = useState<IStudentActivityResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const studentCode = watch("student_code");
    const activityId = watch("activity_id");

    const inputRef = useRef<HTMLInputElement | null>(null);
    const autoSubmitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activityOptions: IActivityOption[] = useMemo(() => {
        if (!Array.isArray(activity_data)) return [];

        return activity_data.map((item: any) => ({
            activity_id: item.activity_id,
            activity_name: item.activity_name,
            activity_date: item.activity_date,
        }));
    }, [activity_data]);

    useEffect(() => {
        setTimeout(() => {
            setFocus("student_code");
            inputRef.current?.focus();
        }, 200);
    }, [setFocus]);

    const submitRegister = async (values: IFormInput) => {
        if (!values.activity_id || !values.student_code.trim()) return;
        const createdByName = localStorage.getItem("accountType") || "mangpo";
        try {
            setSubmitLoading(true);
            setErrorMessage("");
            setResult(null);

            const body: IStudentActivityBody = {
                activity_id: Number(values.activity_id),
                student_code: values.student_code.trim(),
                created_by_name: createdByName,
            };

            const res = await CreateStudentActivities(body);

            setResult(res);
            setValue("student_code", "");

            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } catch (error: any) {
            const message =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                "เกิดข้อผิดพลาด";

            setErrorMessage(message);
            setValue("student_code", "");

            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } finally {
            setSubmitLoading(false);
        }
    };

    const onManualSubmit = handleSubmit(submitRegister);

    const handleScanKeyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
        // if (e.key === "Enter") {
        //     e.preventDefault();
        //     await onManualSubmit();
        // }
    };

    useEffect(() => {
        if (autoSubmitTimer.current) {
            clearTimeout(autoSubmitTimer.current);
        }

        const cleanCode = (studentCode || "").trim();

        if (!activityId || !cleanCode) return;

        if (cleanCode.length < 8) return;

        autoSubmitTimer.current = setTimeout(() => {
            onManualSubmit();
        }, 300);

        return () => {
            if (autoSubmitTimer.current) {
                clearTimeout(autoSubmitTimer.current);
            }
        };
    }, [studentCode, activityId]); // intentionally depend on current form values

    if (activityLoading) {
        return <LoadingDisplayLast loading={activityLoading} />;
    }

    return (
        <FormProvider {...methods}>
            <Box sx={{ maxWidth: 920, mx: "auto" }}>
                <Card
                    sx={{
                        borderRadius: "20px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        mb: 3,
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" spacing={1.2} alignItems="center" mb={3}>
                            <AppRegistrationOutlinedIcon sx={{ color: "#2563eb" }} />
                            <Typography fontSize={28} fontWeight={700}>
                                ลงทะเบียน
                            </Typography>
                        </Stack>

                        <Box component="form" onSubmit={onManualSubmit}>
                            <Stack spacing={2.2}>
                                <TextField
                                    select
                                    fullWidth
                                    label="เลือกกิจกรรม *"
                                    value={activityId}
                                    onChange={(e) =>
                                        setValue("activity_id", Number(e.target.value), {
                                            shouldValidate: true,
                                        })
                                    }
                                    sx={inputSx}
                                >
                                    {activityOptions.map((item) => (
                                        <MenuItem key={item.activity_id} value={item.activity_id}>
                                            {item.activity_name}
                                            {item.activity_date ? ` (${item.activity_date})` : ""}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    label="รหัสนิสิต *"
                                    value={studentCode}
                                    inputRef={inputRef}
                                    onChange={(e) =>
                                        setValue("student_code", e.target.value, {
                                            shouldValidate: true,
                                        })
                                    }
                                    onKeyDown={handleScanKeyDown}
                                    placeholder="สแกน QR / Barcode รหัสนิสิต"
                                    sx={inputSx}
                                    autoComplete="off"
                                />

                                <Typography variant="body2" color="text.secondary">
                                    กด Enter หรือสแกนบัตร/QR เพื่อส่งอัตโนมัติ
                                </Typography>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={submitLoading || isSubmitting || !activityId || !studentCode.trim()}
                                    sx={{
                                        height: 48,
                                        borderRadius: "12px",
                                        backgroundColor: "#020617",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        boxShadow: "none",
                                    }}
                                >
                                    {submitLoading ? (
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CircularProgress size={20} sx={{ color: "#fff" }} />
                                            <span>กำลังลงทะเบียน...</span>
                                        </Stack>
                                    ) : (
                                        "ลงทะเบียนเข้าร่วมกิจกรรม"
                                    )}
                                </Button>

                                {errorMessage ? (
                                    <Alert severity="error" sx={{ borderRadius: "12px" }}>
                                        {errorMessage}
                                    </Alert>
                                ) : null}
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

                {result?.data ? (
                    <Card
                        sx={{
                            borderRadius: "20px",
                            boxShadow: "none",
                            border: "1px solid #bbf7d0",
                            backgroundColor: "#f0fdf4",
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack direction="row" spacing={1.2} alignItems="center" mb={2}>
                                <CheckCircleOutlineRoundedIcon sx={{ color: "#16a34a" }} />
                                <Typography fontSize={28} fontWeight={700} color="#15803d">
                                    ลงทะเบียนสำเร็จ!
                                </Typography>
                            </Stack>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: "16px",
                                    backgroundColor: "#fff",
                                    border: "1px solid #e5e7eb",
                                    mb: 3,
                                }}
                            >
                                <Typography color="text.secondary" mb={0.5}>
                                    ชื่อ-นามสกุล
                                </Typography>
                                <Typography fontSize={28} fontWeight={700} mb={2}>
                                    {result.data.full_name}
                                </Typography>

                                <Typography color="text.secondary" mb={0.5}>
                                    รหัสนิสิต
                                </Typography>
                                <Typography fontSize={24} fontWeight={700}>
                                    {result.data.student_code}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography fontSize={28} fontWeight={700} mb={2}>
                                ข้อมูลกิจกรรม
                            </Typography>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography color="text.secondary">ชื่อกิจกรรม</Typography>
                                    <Typography fontSize={24} fontWeight={600}>
                                        {result.data.activity_name}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <CalendarMonthOutlinedIcon sx={{ color: "#2563eb", mt: 0.2 }} />
                                    <Box>
                                        <Typography color="text.secondary">วันที่</Typography>
                                        <Typography fontSize={22} fontWeight={600}>
                                            {result.data.activity_date}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <AccessTimeOutlinedIcon sx={{ color: "#2563eb", mt: 0.2 }} />
                                    <Box>
                                        <Typography color="text.secondary">เวลา</Typography>
                                        <Typography fontSize={22} fontWeight={600}>
                                            {result.data.activity_time_text}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <LocationOnOutlinedIcon sx={{ color: "#2563eb", mt: 0.2 }} />
                                    <Box>
                                        <Typography color="text.secondary">สถานที่</Typography>
                                        <Typography fontSize={22} fontWeight={600}>
                                            {result.data.location}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>

                            <Box
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    borderRadius: "14px",
                                    backgroundColor: "#eff6ff",
                                }}
                            >
                                <Typography color="#1d4ed8" fontWeight={600}>
                                    บันทึกเมื่อ
                                </Typography>
                                <Typography color="#1d4ed8" fontSize={18}>
                                    {result.data.registered_at_text}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : null} 
            </Box>
        </FormProvider>
    );
};

export default StudentActivitiesFrom;