import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ENUM } from '../../../../shared/components/Enum';
import { useCheckEmail, usePasswordFields } from '../../hook/handleFunction';
import PasswordOwner from '../Password/PasswordOwner';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export interface IUserOwnerProps {
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
    errors: FieldErrors<IOwnerItem>;
    watch: UseFormWatch<IOwnerItem>;
    setError: UseFormSetError<IOwnerItem>
    clearErrors: UseFormClearErrors<IOwnerItem>
    actype: string;
};

const UserOwner: React.FunctionComponent<IUserOwnerProps> = ({
    getValues,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // ✅ ใช้ hook เช็คอีเมลแบบ debounce
    const { checkEmail, isCheckingEmail } = useCheckEmail(setValue, setError, clearErrors, 800);
    // ✅ ใช้ hook รหัสผ่าน (ย้ายออกจากคอมโพเนนต์แล้ว)
    const {
        showPassword,
        showConfirmPassword,
        passwordError,
        passwordConfirmError,
        toggleShowPassword,
        toggleShowConfirm,
        handlePasswordChange,
    } = usePasswordFields(getValues, setValue, 8);

    return (
        <>
            <PasswordOwner getValues={getValues} setValue={setValue} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'ข้อมูลบัญชีผู้ใช้'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={1} >
                        <TextField
                            placeholder="อีเมล"
                            fullWidth
                            value={getValues('email') || ''}
                            variant="outlined"
                            onChange={(e) => {
                                const v = e.target.value;
                                setValue('email', v);
                                checkEmail(v);
                            }}
                            error={!!errors?.email}
                            helperText={errors?.email?.message || ' '}
                            slotProps={{
                                input: {
                                    endAdornment: isCheckingEmail ? (
                                        <InputAdornment position="end">
                                            <CircularProgress size={16} />
                                        </InputAdornment>
                                    ) : undefined,
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ position: "absolute", top: 6, left: 14 }}>
                                            <Typography
                                                color="onSurface" sx={{ fontWeight: 500, fontSize: '14px', }}
                                                component="span"
                                            >
                                                {"อีเมล"}{" "}
                                                <Typography
                                                    component="span"
                                                    color="error"
                                                    variant="subtitle2"
                                                >
                                                    {"*"}
                                                </Typography>
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        paddingTop: "16px", // ขยับพื้นที่ให้ label ที่อยู่ด้านในไม่ชนกับข้อความ
                                    },
                                }
                            }}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }} >
                        {actype === 'create' ? (
                            <>
                                {/* <TextField
                                    label="รหัสผ่าน (Password)"
                                    fullWidth
                                    variant="filled"
                                    autoComplete="off"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowPassword} edge="end" aria-label="toggle password visibility">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                minLength: 8,
                                                type: showPassword ? 'text' : 'password',
                                            },
                                        },
                                    }}
                                    // ถ้าคุณมี error state ภายนอก
                                    error={passwordError || !!errors?.password}
                                    helperText={
                                        errors?.password?.message // ถ้า zod มี error จะใช้ข้อความนี้ก่อน
                                            ? errors.password.message
                                            : passwordError // ถ้าไม่มี error จาก zod แต่ state error ภายในเป็น true
                                                ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
                                                : " "
                                    }
                                    value={getValues('password') || ''}
                                    onChange={(e) => handlePasswordChange('password', e.target.value)}
                                /> */}
                                <TextField
                                    label="รหัสผ่าน (Password)"
                                    fullWidth
                                    variant="filled"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowPassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                minLength: 8,
                                                type: showPassword ? 'text' : 'password',
                                            },
                                        },
                                        htmlInput: { minLength: 8 },
                                    }}
                                    error={passwordError || !!errors?.password}
                                    helperText={errors?.password?.message ?? (passwordError ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" : " ")}
                                    value={getValues("password") || ""}
                                    onChange={(e) => handlePasswordChange("password", e.target.value)}
                                />

                                <TextField
                                    label="ยืนยันรหัสผ่าน (Confirm Password)"
                                    fullWidth
                                    variant="filled"
                                    autoComplete="new-password"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowConfirm} edge="end" aria-label="toggle confirm password visibility">
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                minLength: 8,
                                                type: showConfirmPassword ? 'text' : 'password',
                                            },
                                        },
                                        htmlInput: { minLength: 8 },
                                    }}
                                    error={passwordConfirmError || !!errors?.confirm_password}
                                    helperText={
                                        errors?.confirm_password?.message // ถ้า zod มี error จะใช้ข้อความนี้ก่อน
                                            ? errors.confirm_password.message
                                            : passwordConfirmError // ถ้าไม่มี error จาก zod แต่ state error ภายในเป็น true
                                                ? "รหัสผ่านไม่ตรงกัน"
                                                : " "
                                    }
                                    value={getValues('confirm_password') || ''}
                                    onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <Stack width={'100%'}>
                                    <Box  >
                                        <Typography variant="subtitle1" sx={{ mb: 1, mt: 1 }}>
                                            {"รหัสผ่าน (Password)"}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"   // << ดันให้ซ้าย-ขวา
                                            sx={{ width: '100%' }}
                                        >
                                            <Box>
                                                {/* ซ้าย: ******** */}
                                                <Typography variant="body1">********</Typography>
                                            </Box>
                                            <Box>
                                                {/* ขวา: ปุ่ม */}
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    startIcon={<LockOutlinedIcon fontSize="small" />}
                                                    onClick={() => setIsOpen(true)}
                                                    sx={{
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    <Typography fontWeight={500}> {"เปลี่ยนรหัสผ่าน"}</Typography>

                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </>
                        )}
                    </Stack>
                    <Stack marginTop={1} >
                        <FormControl>
                            <FormLabel
                                id="active-type-label"
                                sx={{
                                    color: 'text.primary',
                                    '&.Mui-focused': { color: 'text.primary' },   // กันหายตอนโฟกัส
                                    mb: 1, mt: 1,
                                }}
                            >
                                <Typography variant="subtitle2" component="span">
                                    {"สถานะการใช้งาน"}
                                </Typography>
                            </FormLabel>

                            <RadioGroup
                                row
                                aria-labelledby="active-type-label"   // ชี้ label ให้ถูกต้อง
                                name="row-radio-buttons-group"
                                value={getValues('active_type')}
                                onChange={(e) => setValue('active_type', Number(e.target.value))}
                            >
                                {ENUM.OPTION_ACTIVE.map((ac: any) => (
                                    <FormControlLabel
                                        key={ac.value}
                                        value={ac.value}
                                        control={<Radio />}
                                        label={<Typography variant="subtitle1">{ac.label}</Typography>}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
};

export default UserOwner;