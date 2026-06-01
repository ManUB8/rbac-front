import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFetchPosition } from '../../../Position/hook/useFetchPosition';
import type { IuseMasterFunctionStudentFromFetch } from '../../hook/useFetchStudent';
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

export interface IPositionStudentProps {
    MasterStudent: IuseMasterFunctionStudentFromFetch;
};

const PositionStudent: React.FunctionComponent<IPositionStudentProps> = ({
    MasterStudent
}) => {
    const {
        errors,
        getValues,
        setValue
    } = MasterStudent;
    const { position_data} = useFetchPosition()

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                    <Autocomplete
                        fullWidth
                        options={position_data}
                        getOptionLabel={(option) => option.position_name}
                        value={
                            position_data?.find(
                                (item) => item.position_id === getValues("position.position_id")
                            ) ?? null
                        }
                        onChange={(_, v) => {
                            setValue("position.position_id", v?.position_id ?? 0);
                            setValue("position.position_name", v?.position_name ?? "");
                        }}
                        renderInput={(p) => (
                            <TextField {...p} label="ตำแหน่ง" variant="outlined" />
                        )}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
                        <DatePicker
                            label="วันที่เริ่มต้น*"
                            format="DD/MM/YYYY"
                            value={
                                getValues("position.start_date")
                                    ? dayjs(getValues("position.start_date"))
                                    : null
                            }
                            onChange={(newValue) => {
                                setValue(
                                    "position.start_date",
                                    newValue ? newValue.format("YYYY-MM-DD") : "",
                                    { shouldValidate: true }
                                );
                            }}
                            dayOfWeekFormatter={(date) => {
                                const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
                                return days[date.day()];
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!errors.position?.start_date,
                                    helperText: errors.position?.start_date?.message as string,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
                        <DatePicker
                            label="วันที่สิ้นสุด*"
                            format="DD/MM/YYYY"
                            value={
                                getValues("position.end_date")
                                    ? dayjs(getValues("position.end_date"))
                                    : null
                            }
                            onChange={(newValue) => {
                                setValue(
                                    "position.end_date",
                                    newValue ? newValue.format("YYYY-MM-DD") : "",
                                    { shouldValidate: true }
                                );
                            }}
                            dayOfWeekFormatter={(date) => {
                                const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
                                return days[date.day()];
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!errors.position?.end_date,
                                    helperText: errors.position?.end_date?.message as string,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Stack>
        </>
    )
};

export default PositionStudent;