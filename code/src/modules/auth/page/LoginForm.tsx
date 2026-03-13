import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router';
import * as R from 'ramda';
import { AppRoutes } from '../../../router/router';
import { useAuth } from '../hook/useAuth';
import type { ILoginAdminBody } from '../interface/Login.interface';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm: React.FC = () => {
    const { getAuthToken, handleLogin } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<ILoginAdminBody>({
        defaultValues: { username: '', password: '' },
        mode: 'onSubmit',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [banner, setBanner] = useState<string | null>(null);
    const toggleShowPassword = useCallback(() => setShowPassword(v => !v), []);


    // ถ้ามี token แล้ว ให้เด้งเข้าหน้า dashboard
    if (R.isNotEmpty(getAuthToken())) {
        // return <Navigate to={AppRoutes.dashboard} replace />;
        return <Navigate to={AppRoutes.default} replace />;
    }

    const onSubmit = async (payload: ILoginAdminBody) => {
        console.log('payload', payload)
        setBanner(null);
        const ok = await handleLogin(payload); // ⬅️ รอผลจาก Promise
        if (!ok) {
            setBanner('เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านให้ถูกต้อง');
            setError('username', { message: 'ชื่อผู้ใช้ไม่ถูกต้อง' });
            setError('password', { message: 'รหัสผ่านไม่ถูกต้อง' });
        }
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            // sx={{
            //     minHeight: '100dvh',       // สูงเต็มจอ (รองรับ mobile browser bars)
            //     display: 'grid',
            //     placeItems: 'center',      // จัดกึ่งกลางทั้งแนวตั้ง/นอน
            //     px: 2,                     // กันชิดขอบจอเล็กน้อย
            // }}
            sx={{
                minHeight: '100dvh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pt: { xs: '12vh', md: '16vh' },
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                // sx={{
                //     width: 'min(720px, 92vw)',
                //     borderRadius: 2,
                //     p: { xs: 3, md: 6 },
                //     mx: 'auto',
                //     mt: { xs: -3, md: -5 }, // -24px และ -40px ตาม breakpoint
                //     transform: { xs: 'translateY(-6vh)', md: 'translateY(-8vh)' }
                // }}
                sx={{
                    width: 'min(720px, 92vw)',
                    borderRadius: 2,
                    p: { xs: 3, md: 6 },
                }}
            >
                <Typography fontSize={32} fontWeight={500} sx={{ mb: 3 }}>
                    {"ลงชื่อเข้าใช้"}
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="บัญชีผู้ใช้"
                        fullWidth
                        variant="filled"
                        autoComplete="username"
                        {...register('username', { required: 'กรุณากรอกบัญชี' })}
                        error={!!errors.username}
                        // helperText={errors.username?.message ?? ''}
                        sx={{
                            // ตอน error ให้เปลี่ยนสีกรอบจาก theme
                            '& .MuiInputBase-root.Mui-error': {
                                borderColor: (t) => t.palette.error.main,
                                backgroundColor: 'transparent',
                            },

                            // (สำคัญ) ปิด underline ของ filled ไม่ให้กวนสายตา
                            '& .MuiFilledInput-root:before, & .MuiFilledInput-root:after': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: 'none',
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: errors.username ? (
                                    <InputAdornment position="end">
                                        <ErrorOutline color="error" fontSize="small" />
                                    </InputAdornment>
                                ) : null,
                            },
                        }}
                    />

                    <TextField
                        label="รหัสผ่าน"
                        fullWidth
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
                        error={!!errors.password}
                        // helperText={errors.password?.message ?? ''}
                        sx={{
                            // ตอน error ให้เปลี่ยนสีกรอบจาก theme
                            '& .MuiInputBase-root.Mui-error': {
                                borderColor: (t) => t.palette.error.main,
                                backgroundColor: 'transparent',
                            },

                            // (สำคัญ) ปิด underline ของ filled ไม่ให้กวนสายตา
                            '& .MuiFilledInput-root:before, & .MuiFilledInput-root:after': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: 'none',
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {errors.password && (
                                            <ErrorOutline color="error" fontSize="small" />
                                        )}
                                        <IconButton
                                            onClick={toggleShowPassword}
                                            edge="end"
                                            size="small"
                                            sx={{ ml: 0.5 }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Stack>

                {/* แถวล่าง: ลิงก์ซ้าย / ปุ่มขวา */}
                <Box
                    sx={{
                        mt: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'space-between',
                    }}
                >
                    <Link
                        component="button"
                        type="button"
                        underline="hover"
                        sx={{ fontSize: 18, fontWeight: 500, color: 'black' }}
                    // onClick={() => ... ไปหน้า forget password }
                    >
                        {"ลืมรหัสผ่านใช่ไหม?"}
                    </Link>

                    <Button
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        loadingPosition="start"
                        sx={{ width: '160px', height: '55px' }}
                        // sx={{ width: 120, height: 40 }}
                        color='secondary'
                        disabled={isSubmitting}
                    >
                        <Typography fontSize={18} fontWeight={500}>{"เข้าสู่ระบบ"}</Typography>
                    </Button>
                </Box>

                {/* แถบแจ้งเตือนสีแดงด้านล่าง */}
                {banner && (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ mt: 4, borderRadius: 1.5 }}
                    >
                        {banner}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default LoginForm;