import React from "react";
import { Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import type { IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";
import dayjs from "dayjs";
import "dayjs/locale/th";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export interface IActivityDetailProps {
    MasterController: IuseMasterFunctionActivityFromFetch;
}

const ActivityDetail: React.FC<IActivityDetailProps> = ({
    MasterController,
}) => {
    const { control, errors } = MasterController;

    return (
        <Stack spacing={2}>
            <Controller
                name="activity_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        id="activity_name"
                        label="ชื่อกิจกรรม *"
                        placeholder="เช่น ปฐมนิเทศนักศึกษาใหม่ 2568"
                        error={!!errors?.activity_name}
                        helperText={errors?.activity_name?.message || ""}

                    />
                )}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
                    <Controller
                        name="activity_date"
                        control={control}
                        render={({ field }) => (
                            <DesktopDatePicker
                                label="วันที่ *"
                                format="DD/MM/YYYY"
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(newValue) => {
                                    field.onChange(newValue ? newValue.format("YYYY-MM-DD") : "");
                                }}
                                dayOfWeekFormatter={(date) => {
                                    const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
                                    return days[date.day()];
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: !!errors?.activity_date,
                                        helperText: errors?.activity_date?.message || "",
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
                <Controller
                    name="hours"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="hours"
                            label="จำนวนชั่วโมง *"
                            type="number"
                            value={field.value ?? ""}
                            error={!!errors?.hours}
                            helperText={errors?.hours?.message as string }
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? "" : Number(val));
                            }}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 0.5,
                                },
                            }}
                        />
                    )}
                />
                <Controller
                    name="volunteer_hours"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="volunteer_hours"
                            label="ชั่วโมงจิตอาสา"
                            type="number"
                            value={field.value ?? ""}
                            error={!!errors?.volunteer_hours}
                            helperText={errors?.volunteer_hours?.message  as string}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? null : Number(val));
                            }}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 0.5,
                                },
                            }}
                        />
                    )}
                />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Controller
                    name="start_time"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="start_time"
                            label="เวลาเริ่ม *"
                            placeholder="08.00"
                            error={!!errors.start_time}
                            helperText={errors.start_time?.message as string}
                        />
                    )}
                />

                <Controller
                    name="end_time"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="end_time"
                            label="เวลาสิ้นสุด *"
                            placeholder="12.00"
                            error={!!errors.end_time}
                            helperText={errors.end_time?.message as string}
                        />
                    )}
                />
            </Stack>

            <Controller
                name="location"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        id="location"
                        label="สถานที่ *"
                        placeholder="เช่น หอประชุมใหญ่ ชั้น 5 อาคาร A"
                        error={!!errors.location}
                        helperText={errors.location?.message as string}

                    />
                )}
            />

            <Controller
                name="activity_img"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        id="activity_img"
                        label="URL รูปภาพกิจกรรม"
                        placeholder="https://example.com/image.jpg"
                        error={!!errors.activity_img}
                        helperText={errors.activity_img?.message as string}

                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        id="description"
                        label="รายละเอียด *"
                        placeholder="กรอกรายละเอียดกิจกรรม"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message as string}

                    />
                )}
            />
        </Stack>
    );
};

export default ActivityDetail;
