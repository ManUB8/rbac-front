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
import { Check_type } from "../../utils/activity_option";
import { NumericFormat } from "react-number-format";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export interface IActivityPositionProps {
    MasterController: IuseMasterFunctionActivityFromFetch;
}

const ActivityPosition: React.FunctionComponent<IActivityPositionProps> = ({
    MasterController,
}) => {
    const { errors, getValues, setValue } = MasterController;
    const [mapsUrl, setMapsUrl] = useState("");
    const { hour_type, check_type, activity_status, require_registration, activity_all_Loading } = useFetchActivityFilterAll()
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
                        <TextField {...p} label="ประเภทการเช็ค" variant="outlined" />
                    )}
                />

                <NumericFormat
                    label="จำนวนรับผู้เข้าร่วมกิจกรรม"
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
                        helperText={errors?.activity_lat?.message || ""}
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
                        helperText={errors?.activity_lng?.message || ""}
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
                        helperText={errors?.activity_radius_meter?.message || ""}
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