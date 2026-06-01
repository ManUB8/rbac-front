import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    Switch,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { IuseMasterFunctionUserFromFetch } from "../../hook/useFetchUser";
import { roleOptions } from "../../utils/User_option";

export interface IDateilUserProps {
    MasterUser: IuseMasterFunctionUserFromFetch;
}

const DateilUser: React.FunctionComponent<IDateilUserProps> = ({
    MasterUser,
}) => {
    const {
        control,
        errors,
        openUserModal,
        setOpenUserModal,
        actype,
        getValues,
    } = MasterUser;

    const [showPassword, setShowPassword] = useState(false);
    return (
        <Dialog
            open={openUserModal}
            onClose={() => setOpenUserModal(false)}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ fontWeight: 1000, pr: 6 }}>
                {actype === "create" ? "เพิ่มแอดมิน" : "แก้ไขข้อมูลแอดมิน"}
                <IconButton
                    onClick={() => setOpenUserModal(false)}
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="username"
                                    label="ชื่อผู้ใช้"
                                    error={!!errors.username}
                                    helperText={errors.username?.message as string}
                                />
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    id="role"
                                    label="Role"
                                    error={!!errors.role}
                                    helperText={errors.role?.message as string}
                                >
                                    {roleOptions.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        sx={{
                            alignItems: {
                                md: "flex-start",
                            },
                        }}
                    >
                        {/* ชื่อ */}
                        <Box sx={{ flex: 9 }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="name"
                                        label="ชื่อ - นามสกุล"
                                        error={!!errors.name}
                                        helperText={errors.name?.message as string}
                                    />
                                )}
                            />
                        </Box>

                        {/* switch */}
                        <Box
                            sx={{
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: {
                                    xs: "flex-start",
                                    md: "center",
                                },
                                pt: {
                                    md: 1,
                                },
                            }}
                        >
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        sx={{
                                            ml: 0,
                                            gap: 1,
                                            "& .MuiFormControlLabel-label": {
                                                ml: 0.75,
                                                fontWeight: 600,
                                            },
                                        }}
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                color="success"
                                            />
                                        }
                                        label={field.value ? "Active" : "Inactive"}
                                    />
                                )}
                            />
                        </Box>
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="password"
                                    label="รหัสผ่าน"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.password}
                                    helperText={errors.password?.message as string}
                                    slotProps={{
                                        input: {
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
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="confirm_password"
                            control={control}
                            rules={{
                                required: "กรุณายืนยันรหัสผ่าน",
                                validate: (value) =>
                                    value === getValues("password") || "รหัสผ่านไม่ตรงกัน",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="confirm_password"
                                    label="ยืนยันรหัสผ่าน"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.confirm_password}
                                    helperText={errors.confirm_password?.message as string}
                                    slotProps={{
                                        input: {
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
                            onClick={() => setOpenUserModal(false)}
                            variant="outlined"
                            color="error"
                        >
                            ยกเลิก
                        </Button>

                        <Button type="submit"
                            variant="contained"
                            form="User-form">
                            {actype === "create" ? "บันทึก" : "อัปเดต"}
                        </Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default DateilUser;