import React, { useState } from "react";
import {
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
import type { IuseMasterFunctionStudentFromFetch } from "../../hook/useFetchStudentMange";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NumericFormat } from "react-number-format";

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
    } = MasterStudent;

    const [showPassword, setShowPassword] = useState(false);

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
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
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