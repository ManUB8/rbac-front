import React from "react";
import {
    Box,
    Card,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/th";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { IuseFetchProductFrom } from "../../../hook/useFetchMasterProduct";


interface Props {
    controller: IuseFetchProductFrom;
}

const unixToDayjs = (timestamp?: number | string) => {
    const value = Number(timestamp || 0);
    if (!value) return null;

    return dayjs.unix(value);
};

const dayjsToUnix = (value: dayjs.Dayjs | null) => {
    if (!value) return 0;

    return value.startOf("day").unix();
};

const ProductPreorderSection: React.FC<Props> = ({ controller }) => {
    const isPreorder = !!controller.watch("is_preorder" as any);

    const {
        control,
        formState: { errors },
    } = controller.methods;

    const setValue = (key: string, value: string | number | boolean) => {
        controller.setValue(key as any, value);
    };

    const dayOfWeekFormatter = (date: dayjs.Dayjs) => {
        const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
        return days[date.day()];
    };

    return (
        <Card
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 1,
                border: "1px solid",
                borderColor: isPreorder ? "primary.main" : "divider",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: isPreorder ? 2 : 0,
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                        ระบบพรีออเดอร์
                    </Typography>

                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        ใช้สำหรับสินค้าที่รับจองก่อน แล้วจัดส่งหรือรับของภายหลัง
                    </Typography>
                </Box>

                <FormControlLabel
                    sx={{
                        mr: 0,
                        "& .MuiFormControlLabel-label": {
                            fontWeight: 700,
                        },
                    }}
                    control={
                        <Switch
                            checked={isPreorder}
                            onChange={(e) => {
                                const checked = e.target.checked;

                                setValue("is_preorder", checked);

                                if (!checked) {
                                    setValue("preorder_note", "");
                                    setValue("preorder_start_at", 0);
                                    setValue("preorder_end_at", 0);
                                    setValue("preorder_expected_ship_at", 0);
                                    setValue("preorder_limit_qty", "");
                                }
                            }}
                        />
                    }
                    label={isPreorder ? "เปิดพรีออเดอร์" : "ปิด"}
                />
            </Stack>

            {isPreorder && (
                <Stack spacing={2}>
                    <TextField
                        label="หมายเหตุพรีออเดอร์"
                        placeholder="เช่น จัดส่งหลังปิดรอบพรีออเดอร์"
                        fullWidth
                        multiline
                        minRows={3}
                        value={controller.watch("preorder_note" as any) ?? ""}
                        onChange={(e) =>
                            setValue("preorder_note", e.target.value)
                        }
                    />

                    <TextField
                        label="จำนวนจำกัดในรอบพรีออเดอร์"
                        type="number"
                        fullWidth
                        value={
                            controller.watch("preorder_limit_qty" as any) ?? ""
                        }
                        onChange={(e) =>
                            setValue(
                                "preorder_limit_qty",
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                            )
                        }
                    />

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="th"
                    >
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <Controller
                                name={"active_preorder_round.start_at"}
                                control={control}
                                render={({ field }) => (
                                    <DesktopDatePicker
                                        label="วันที่เปิดรับพรีออเดอร์"
                                        format="DD/MM/YYYY"
                                        value={unixToDayjs(field.value)}
                                        onChange={(newValue) => {
                                            field.onChange(dayjsToUnix(newValue));
                                        }}
                                        dayOfWeekFormatter={dayOfWeekFormatter}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: !!(errors as any)
                                                    ?.preorder_start_at,
                                                helperText:
                                                    (errors as any)
                                                        ?.preorder_start_at
                                                        ?.message || "",
                                            },
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name={"active_preorder_round.end_at"}
                                control={control}
                                render={({ field }) => (
                                    <DesktopDatePicker
                                        label="วันที่ปิดรับพรีออเดอร์"
                                        format="DD/MM/YYYY"
                                        value={unixToDayjs(field.value)}
                                        onChange={(newValue) => {
                                            field.onChange(dayjsToUnix(newValue));
                                        }}
                                        dayOfWeekFormatter={dayOfWeekFormatter}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: !!(errors as any)
                                                    ?.preorder_end_at,
                                                helperText:
                                                    (errors as any)
                                                        ?.preorder_end_at
                                                        ?.message || "",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Stack>

                        <Controller
                            name={"active_preorder_round.expected_ship_at"}
                            control={control}
                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="วันที่คาดว่าจะจัดส่ง / รับสินค้า"
                                    format="DD/MM/YYYY"
                                    value={unixToDayjs(field.value)}
                                    onChange={(newValue) => {
                                        field.onChange(dayjsToUnix(newValue));
                                    }}
                                    dayOfWeekFormatter={dayOfWeekFormatter}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!(errors as any)
                                                ?.preorder_expected_ship_at,
                                            helperText:
                                                (errors as any)
                                                    ?.preorder_expected_ship_at
                                                    ?.message || "",
                                        },
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Stack>
            )}
        </Card>
    );
};

export default ProductPreorderSection;