import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NumericFormat } from "react-number-format";
import type { IuseMasterFunctionStudentFromFetch } from "../../hook/useFetchStudent";
import { useFetchFacultyMajors } from "../../../Faculty_Majors/hook/useFetchFaculty_Majors";
import { useFetchPosition } from "../../../Position/hook/useFetchPosition";
import { Year_type } from "../../utils/student_option";

export interface IDateilStudentProps {
    MasterStudent: IuseMasterFunctionStudentFromFetch;
}

const DateilStudent: React.FunctionComponent<IDateilStudentProps> = ({
    MasterStudent,
}) => {
    const {
        control,
        errors,
        openStudentModal,
        setOpenStudentModal,
        actype,
        getValues,
        setValue
    } = MasterStudent;

    const [showPassword, setShowPassword] = useState(false);
    const { faculty_majors, faculty_loading } = useFetchFacultyMajors()
    const { position_data, loading_position } = useFetchPosition()

    const selectedFaculty = faculty_majors.find(
        (item) => item.faculty_id === getValues('faculty_id')
    );

    const majorOptions = selectedFaculty?.majors ?? [];

    return (
        <Dialog
            open={openStudentModal}
            onClose={() => setOpenStudentModal(false)}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ fontWeight: 800, pr: 6 }}>
                {actype === "create" ? "เพิ่มนิสิต" : "แก้ไขข้อมูลนิสิต"}

                <IconButton
                    onClick={() => setOpenStudentModal(false)}
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="student_code"
                            control={control}
                            render={({ field }) => (
                                <NumericFormat
                                    customInput={TextField}
                                    fullWidth
                                    label="รหัสนิสิต"
                                    value={field.value ?? ""}
                                    allowNegative={false}
                                    decimalScale={0}
                                    allowLeadingZeros
                                    isAllowed={(values) => values.value.length <= 8}
                                    onValueChange={(values) => {
                                        const value = values.value.slice(0, 8);

                                        field.onChange(value);
                                        MasterStudent.setValue("user.username", value, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        });
                                    }}
                                    onBlur={field.onBlur}
                                    error={!!errors?.student_code}
                                    helperText={errors?.student_code?.message || ""}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 8,
                                            inputMode: "numeric",
                                        },
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            options={Year_type}
                            getOptionLabel={(option) => option.label}
                            value={
                                Year_type?.find(
                                    (item) => item.id === getValues('year_status')
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                setValue("year_status", v?.id ?? '')
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="ชั้นปี" variant="outlined" />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            options={position_data}
                            getOptionLabel={(option) => option.position_name}
                            value={
                                position_data?.find(
                                    (item) => item.position_id === getValues('position.position_id')
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                setValue("position.position_id", v?.position_id ?? 0)
                                setValue("position.position_name", v?.position_name ?? '')
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="ตำแหน่ง" variant="outlined" />
                            )}
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="prefix"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    id="prefix"
                                    label="คำนำหน้า"
                                    error={!!errors.prefix}
                                    helperText={errors.prefix?.message as string}
                                >
                                    <MenuItem value="นาย">นาย</MenuItem>
                                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                                </TextField>
                            )}
                        />

                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    id="gender"
                                    label="เพศ"
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message as string}
                                >
                                    <MenuItem value="ชาย">ชาย</MenuItem>
                                    <MenuItem value="หญิง">หญิง</MenuItem>
                                    <MenuItem value="LGBTQ">LGBTQ</MenuItem>

                                </TextField>
                            )}
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="first_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="first_name"
                                    label="ชื่อ"
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message as string}
                                />
                            )}
                        />

                        <Controller
                            name="last_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="last_name"
                                    label="นามสกุล"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message as string}
                                />
                            )}
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={faculty_majors}
                                getOptionLabel={(option) => option.faculty_name}
                                value={
                                    faculty_majors.find(
                                        (item) => item.faculty_id === getValues('faculty_id')
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    setValue("faculty_id", v?.faculty_id ?? 0)
                                    setValue("faculty_name", v?.faculty_name ?? '')
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="คณะ" variant="outlined" />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={majorOptions}
                                getOptionLabel={(option) => option.major_name}
                                value={
                                    majorOptions.find(
                                        (item) => item.major_id === getValues('major_id')
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    setValue("faculty_id", v?.major_id ?? 0)
                                    setValue("faculty_name", v?.major_name ?? '')
                                }}
                                disabled={!getValues('major_id')}
                                renderInput={(p) => (
                                    <TextField {...p} label="สาขา" variant="outlined" />
                                )}
                            />
                        </Box>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="user.username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    disabled
                                    id="user.username"
                                    label="ชื่อผู้ใช้"
                                    error={!!errors.user?.username}
                                    helperText={errors.user?.username?.message as string}
                                />
                            )}
                        />

                        <Controller
                            name="user.password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="user.password"
                                    label="รหัสผ่าน"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.user?.password}
                                    helperText={errors.user?.password?.message as string}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword((prev) => !prev)
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1.5,
                            pt: 1,
                        }}
                    >
                        <Button
                            onClick={() => setOpenStudentModal(false)}
                            variant="outlined"
                            color="error"
                        >
                            ยกเลิก
                        </Button>

                        <Button type="submit" variant="contained" form="student-form">
                            {actype === "create" ? "บันทึก" : "อัปเดต"}
                        </Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default DateilStudent;