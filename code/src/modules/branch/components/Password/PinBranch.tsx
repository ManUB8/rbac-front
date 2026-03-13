import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogContentText, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import type { IBranchItem } from '../../interface/Branch.interface';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '../../../../assets/svg/icon/close.svg'
import { usePINFields } from '../../hook/handleFunction';

export interface IPinBrancheProps {
    isOpenPin: boolean
    setIsOpenPin: React.Dispatch<React.SetStateAction<boolean>>
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
};

const PinBranche: React.FunctionComponent<IPinBrancheProps> = ({
    isOpenPin,
    setIsOpenPin,
    getValues,
    setValue
}) => {
    const {
        showPIN,
        showConfirmPIN,
        pinError,
        pinConfirmError,
        toggleShowPIN,
        toggleShowConfirmPIN,
        handlePINChange,
    } = usePINFields(getValues, setValue, 6);
    return (
        <>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={isOpenPin}
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
                        onClick={() => setIsOpenPin(false)}
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
                            onClick={() => setIsOpenPin(false)}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            size='large'
                            variant="contained"
                            color='secondary'
                            onClick={() => setIsOpenPin(false)}
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

                        {'เปลี่ยนรหัส PIN'}
                    </DialogContentText>
                    <Stack sx={{ mt: 2 }} >
                        <>
                            <TextField
                                label="รหัสผ่าน (PIN)"
                                fullWidth
                                variant="filled"
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleShowPIN} edge="end" aria-label="toggle password visibility">
                                                    {showPIN ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            minLength: 6,
                                            type: showPIN ? 'text' : 'password',
                                        },
                                    },
                                }}
                                error={pinError}
                                helperText={pinError ? 'รหัส PIN ต้องมีอย่างน้อย 6 ตัวอักษร' : ' '}
                                value={getValues('pin') || ''}
                                onChange={(e) => handlePINChange('pin', e.target.value)}
                            />

                            <TextField
                                label="ยืนยันรหัสผ่าน (Confirm PIN)"
                                fullWidth
                                variant="filled"
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleShowConfirmPIN} edge="end" aria-label="toggle confirm password visibility">
                                                    {showConfirmPIN ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            minLength: 6,
                                            type: showConfirmPIN ? 'text' : 'password',
                                        },
                                    },
                                }}
                                error={pinConfirmError}
                                helperText={pinConfirmError ? 'รหัส PIN ไม่ตรงกัน' : ' '}
                                value={getValues('confirm_pin') || ''}
                                onChange={(e) => handlePINChange('confirm_pin', e.target.value)}
                            />
                        </>
                    </Stack>
                </DialogContent>

            </Dialog>
        </>
    )
};

export default PinBranche;