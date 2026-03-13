import React, { useState } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useCheckUsername, usePasswordFields } from '../../hook/handleFunction';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ENUM } from '../../../../shared/components/Enum';
import PasswordBranch from '../Password/PasswordBranch';
import PinBranche from '../Password/PinBranch';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
export interface IUserBranchProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    setError: UseFormSetError<IBranchItem>
    clearErrors: UseFormClearErrors<IBranchItem>
    actype: string;
};

const UserBranch: React.FunctionComponent<IUserBranchProps> = ({
    getValues,
    setValue,
    setError,
    clearErrors,
    errors,
    actype
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenPin, setIsOpenPin] = useState<boolean>(false);
    const { checkUsername, isCheckingUsername } = useCheckUsername(setValue, setError, clearErrors, 800);
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
            <PasswordBranch getValues={getValues} setValue={setValue} isOpen={isOpen} setIsOpen={setIsOpen} />
            <PinBranche getValues={getValues} setValue={setValue} isOpenPin={isOpenPin} setIsOpenPin={setIsOpenPin} />
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'ข้อมูลบัญชีผู้ใช้สาขา'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={1} >
                        <TextField
                            label="ชื่อบัญชี"
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            // required
                            value={getValues('username') || ''}
                            onChange={(e) => {
                                const v = e.target.value;
                                setValue('username', v);
                                checkUsername(v);
                            }}
                            error={!!errors?.username}
                            helperText={errors?.username?.message || ' '}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }} >
                        {actype === 'create' ? (
                            <>
                                {/* <TextField
                                    label="รหัสผ่าน (Password)"
                                    fullWidth
                                    variant="filled"
                                    autoComplete="off"
                                    slotProps={{
                                        input: {
                                            name: 'password',
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
                                            name: 'password',
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
                                        htmlInput: {
                                            minLength: 8,
                                        },
                                    }}
                                    error={passwordError || !!errors?.password}
                                    helperText={
                                        errors?.password?.message
                                            ? errors.password.message
                                            : passwordError
                                                ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
                                                : " "
                                    }
                                    value={getValues("password") || ""}
                                    onChange={(e) => handlePasswordChange("password", e.target.value)}
                                />

                                <TextField
                                    label="ยืนยันรหัสผ่าน (Confirm Password)"
                                    fullWidth
                                    variant="filled"
                                    autoComplete="off"
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
                                        passwordConfirmError
                                            ? "รหัสผ่านไม่ตรงกัน"
                                            : errors?.confirm_password?.message
                                                ? errors.confirm_password.message
                                                : " "
                                    }
                                    value={getValues('confirm_password') || ''}
                                    onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <Stack width="100%" spacing={4}>
                                    {/* ===== แถว รหัสผ่าน ===== */}
                                    <Stack>
                                        <Typography variant="subtitle1" sx={{ mb: 1, mt: 1 }}>
                                            {"รหัสผ่าน (Password)"}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{ width: '100%' }}
                                        >
                                            {/* ซ้าย: ดาว */}
                                            <Typography variant="body1">********</Typography>

                                            {/* ขวา: ปุ่มเปลี่ยนรหัสผ่าน */}
                                            <Button
                                                variant="contained"
                                                color="info"
                                                startIcon={<LockOutlinedIcon fontSize="small" />}
                                                onClick={() => setIsOpen(true)}   // modal สำหรับเปลี่ยน password
                                                sx={{ textTransform: 'none', width: 160, }}
                                            >
                                                <Typography fontWeight={500}>{"เปลี่ยนรหัสผ่าน"}</Typography>
                                            </Button>
                                        </Stack>
                                    </Stack>

                                    {/* ===== แถว PIN ===== */}
                                    <Stack>
                                        <Typography variant="subtitle1" sx={{ mb: 1, mt: 1 }}>
                                            {"PIN"}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{ width: '100%' }}
                                        >
                                            {/* ซ้าย: ดาว PIN */}
                                            <Typography variant="body1">{"******"}</Typography>

                                            {/* ขวา: ปุ่มเปลี่ยน PIN */}
                                            <Button
                                                variant="contained"
                                                color="info"
                                                startIcon={<LockOutlinedIcon fontSize="small" />}
                                                onClick={() => setIsOpenPin(true)}  // << สร้าง state ใหม่สำหรับ PIN
                                                sx={{ textTransform: 'none', width: 160, }}
                                            >
                                                <Typography fontWeight={500}>{"เปลี่ยน PIN"}</Typography>
                                            </Button>
                                        </Stack>
                                    </Stack>
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
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={getValues("active_type")}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    const act = event.target.value;
                                    setValue("active_type", Number(act));
                                }}
                            >
                                {ENUM.OPTION_ACTIVE.map((ac: any) => (
                                    <FormControlLabel
                                        key={ac.value}
                                        value={ac.value}
                                        control={<Radio />}
                                        label={
                                            <Typography variant='subtitle1'>
                                                {ac.label}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default UserBranch;