import React, { useState } from "react";
import { useFetchActivityFilterAll, type IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";
import {
    Autocomplete,
    Box,
    Button,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import { NumericFormat } from "react-number-format";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Controller } from "react-hook-form";

export interface IActivityPositionProps {
    MasterController: IuseMasterFunctionActivityFromFetch;
}

const ActivityPosition: React.FunctionComponent<IActivityPositionProps> = ({
    MasterController,
}) => {
    const { control, errors, getValues, setValue, watch } = MasterController;
    const [mapsUrl, setMapsUrl] = useState("");
    const { hour_type, check_type } = useFetchActivityFilterAll()
    const selectedCheckType = watch("check_type");
    const showCheckinWindow =
        selectedCheckType === "checkin_only" || selectedCheckType === "checkin_checkout";
    const showCheckoutWindow =
        selectedCheckType === "checkout_only" || selectedCheckType === "checkin_checkout";

    return (
        <>
            <Stack
                spacing={2}
                direction="row"
                sx={{
                    mt: 2,
                }}
            >
                <Autocomplete
                    fullWidth
                    options={check_type}
                    getOptionLabel={(option) => option.label}
                    value={
                        check_type.find(
                            (item) => item.id === getValues("check_type")
                        ) ?? null
                    }
                    onChange={(_, v) => {
                        setValue("check_type", v?.id ?? "");
                    }}
                    renderInput={(p) => (
                        <TextField
                            {...p}
                            label="ประเภทการเช็ค"
                            id="check_type"
                            variant="outlined"
                            error={!!errors?.check_type}
                            helperText={errors?.check_type?.message || ""}
                        />
                    )}
                />

                <NumericFormat
                    label="จำนวนรับผู้เข้าร่วมกิจกรรม"
                    id="max_participants"
                    customInput={TextField}
                    fullWidth
                    allowNegative={false}
                    decimalScale={0}
                    value={getValues("max_participants") ?? 0}
                    onValueChange={(values) => {
                        setValue("max_participants", values.floatValue ?? 0);
                    }}
                    error={!!errors?.max_participants}
                    helperText={errors?.max_participants?.message || ""}
                    slotProps={{
                        htmlInput: {
                            maxLength: 8,
                        },
                    }}
                />
            </Stack>

            {(showCheckinWindow || showCheckoutWindow) && (
                <Box sx={{ mt: 2 }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                        }}
                    >
                        ช่วงเวลาสแกน
                    </Typography>
                    {showCheckinWindow && (
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
                            <Controller
                                name="checkin_open_time"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="checkin_open_time"
                                        label="เปิดเช็คอิน"
                                        error={!!errors?.checkin_open_time}
                                        helperText={errors?.checkin_open_time?.message as string }
                                    />
                                )}
                            />

                            <Controller
                                name="checkin_close_time"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="checkin_close_time"
                                        label="ปิดเช็คอิน"
                                        error={!!errors?.checkin_close_time}
                                        helperText={errors?.checkin_close_time?.message  as string }
                                    />
                                )}
                            />
                        </Stack>
                    )}

                    {showCheckoutWindow && (
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <Controller
                                name="checkout_open_time"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="checkout_open_time"
                                        label="เปิดเช็คเอาท์"
                                        error={!!errors?.checkout_open_time}
                                        helperText={errors?.checkout_open_time?.message as string }
                                    />
                                )}
                            />

                            <Controller
                                name="checkout_close_time"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="checkout_close_time"
                                        label="ปิดเช็คเอาท์"
                                        error={!!errors?.checkout_close_time}
                                        helperText={errors?.checkout_close_time?.message as string }
                                    />
                                )}
                            />
                        </Stack>
                    )}
                </Box>
            )}

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                sx={{
                    mt: 2,
                    width: "100%",
                    alignItems: {
                        xs: "stretch",
                        md: "center",
                    },
                }}
            >
                <FormControlLabel
                    sx={{
                        m: 0,
                        minWidth: 220,

                        ".MuiFormControlLabel-label": {
                            ml: 1,
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                        },
                    }}
                    control={
                        <Switch
                            checked={!!getValues("require_registration")}
                            onChange={(e) => {
                                setValue("require_registration", e.target.checked);
                            }}
                        />
                    }
                    label="ต้องลงทะเบียนก่อน"
                />

                <FormControlLabel
                    sx={{
                        m: 0,
                        minWidth: 200,

                        ".MuiFormControlLabel-label": {
                            ml: 1,
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                        },
                    }}
                    control={
                        <Switch
                            checked={!!getValues("activity_status")}
                            onChange={(e) => {
                                setValue("activity_status", e.target.checked);
                            }}
                        />
                    }
                    label="เปิดให้เข้าร่วม"
                />

                <Box
                    sx={{
                        minWidth: 240,
                        flex: 1,
                    }}
                >
                    <Autocomplete
                        fullWidth
                        options={hour_type}
                        getOptionLabel={(option) => option.label}
                        value={
                            hour_type.find(
                                (item) => item.id === getValues("hour_type_id")
                            ) ?? null
                        }
                        onChange={(_, v) => {
                            setValue("hour_type_id", v?.id ?? "");
                        }}
                        renderInput={(p) => (
                            <TextField
                                {...p}
                                label="ประเภทชั่วโมง"
                                variant="outlined"
                                error={!!errors?.hour_type_id}
                                helperText={errors?.hour_type_id?.message as string }
                            />
                        )}
                    />
                </Box>
            </Stack>

            <Box
                sx={{
                    mt: 2,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    ตำแหน่งกิจกรรม
                </Typography>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Google Maps URL"
                        placeholder="วางลิงก์ Google Maps"
                        value={mapsUrl}
                        onChange={(e) => {
                            setMapsUrl(e.target.value);
                        }}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            const url = mapsUrl;

                            let match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

                            if (!match) {
                                match = url.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
                            }

                            if (match) {
                                const lat = parseFloat(match[1]);
                                const lng = parseFloat(match[2]);

                                setValue("activity_lat", lat);
                                setValue("activity_lng", lng);
                            } else {
                                alert("ไม่สามารถอ่าน Latitude / Longitude ได้");
                            }
                        }}
                    >
                        <CheckCircleOutlineIcon />
                    </Button>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 2,
                    }}
                >
                    <NumericFormat
                        label="Latitude"
                        customInput={TextField}
                        fullWidth
                        allowNegative
                        decimalScale={6}
                        value={getValues("activity_lat") ?? ""}
                        onValueChange={(values) => {
                            setValue("activity_lat", values.floatValue ?? 0);
                        }}
                        error={!!errors?.activity_lat}
                        helperText={errors?.activity_lat?.message as string  }
                    />

                    <NumericFormat
                        label="Longitude"
                        customInput={TextField}
                        fullWidth
                        allowNegative
                        decimalScale={6}
                        value={getValues("activity_lng") ?? ""}
                        onValueChange={(values) => {
                            setValue("activity_lng", values.floatValue ?? 0);
                        }}
                        error={!!errors?.activity_lng}
                        helperText={errors?.activity_lng?.message as string  }
                    />

                    <NumericFormat
                        label="รัศมี (เมตร)"
                        customInput={TextField}
                        fullWidth
                        allowNegative={false}
                        decimalScale={0}
                        value={getValues("activity_radius_meter") ?? 0}
                        onValueChange={(values) => {
                            setValue("activity_radius_meter", values.floatValue ?? 0);
                        }}
                        error={!!errors?.activity_radius_meter}
                        helperText={errors?.activity_radius_meter?.message as string  }
                    />
                </Stack>


                <Button
                    sx={{ mt: 2 }}
                    startIcon={<MyLocationOutlinedIcon />}
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition((position) => {
                            setValue("activity_lat", position.coords.latitude);
                            setValue("activity_lng", position.coords.longitude);
                        });
                    }}
                >
                    ใช้ตำแหน่งปัจจุบัน
                </Button>
            </Box>
        </>
    );
};

export default ActivityPosition;
