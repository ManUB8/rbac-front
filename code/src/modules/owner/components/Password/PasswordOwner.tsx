import { Box, Button, Dialog, DialogContent, DialogContentText, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import CloseIcon from '../../../../assets/svg/icon/close.svg'
import { usePasswordFields } from '../../hook/handleFunction';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export interface IPasswordOwnerProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
};

const PasswordOwner: React.FunctionComponent<IPasswordOwnerProps> = ({
    isOpen,
    setIsOpen,
    getValues,
    setValue
}) => {
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
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={isOpen}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 2.5,
                            p: 3,
                        }
                    }
                }}
            >
                {/* แถบด้านบน: ซ้ายปุ่มปิด, ขวาปุ่มยกเลิก/ยืนยัน */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <IconButton
                        onClick={() => setIsOpen(false)}
                        sx={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 2,
                            bgcolor: "#F3F5F7",
                            "&:hover": { bgcolor: "#E9ECEF" },
                        }}
                    >
                        <img
                            src={CloseIcon}
                            alt="close"
                        />
                    </IconButton>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            size='large'
                            variant="contained"
                            color='warning'
                            onClick={() => setIsOpen(false)}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            size='large'
                            variant="contained"
                            color='secondary'
                            onClick={() => setIsOpen(false)}
                        >
                            ยืนยัน
                        </Button>
                    </Box>
                </Box>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            fontSize: '28px',
                            fontWeight: 500,
                            textAlign: 'left',
                            color: "#1C1B1B"
                        }}
                    >

                        {'เปลี่ยนรหัสผ่าน'}
                    </DialogContentText>
                    <Stack sx={{ mt: 2 }} >
                        <>
                            <TextField
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
                                error={passwordError}
                                helperText={passwordError ? 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' : ' '}
                                value={getValues('password') || ''}
                                onChange={(e) => handlePasswordChange('password', e.target.value)}
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
                                }}
                                error={passwordConfirmError}
                                helperText={passwordConfirmError ? 'รหัสผ่านไม่ตรงกัน' : ' '}
                                value={getValues('confirm_password') || ''}
                                onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                            />
                        </>
                    </Stack>
                </DialogContent>

            </Dialog>
        </>
    )
};

export default PasswordOwner;