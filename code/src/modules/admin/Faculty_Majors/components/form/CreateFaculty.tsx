import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { inputSx } from '../../utils/faculty_major_sx';
import { Controller, useFormContext } from 'react-hook-form';
import type { IuseFacultyFormFetch } from '../../hook/useFetchFaculty_Majors';

export interface ICreateFacultyProps {
    open: boolean;
    onClose: () => void;
    Master_Controller: IuseFacultyFormFetch
}

const CreateFaculty: React.FunctionComponent<ICreateFacultyProps> = ({ open, onClose, Master_Controller }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<any>();
    return (
        <>
            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "22px",
                            p: 1,
                        },
                    },
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: "text.primary",
                                }}
                            >
                                เพิ่มคณะใหม่
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 1,
                                    color: "#6b7280",
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}
                            >
                                กรอกข้อมูลให้ครบถ้วน
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={onClose}
                        >
                            <CloseIcon sx={{ color: "#52525b" }} />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ pt: 4 }}>
                    <Typography sx={{ mb: 1.2, fontWeight: 700  , mt: 2 }}>
                        ชื่อคณะ *
                    </Typography>

                    <Controller
                        name="faculty_name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="เช่น คณะวิศวกรรมศาสตร์"
                                sx={inputSx}
                                error={!!errors.faculty_name}
                                helperText={errors.faculty_name?.message as string}
                            />
                        )}
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            mt: 6,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant="outlined" onClick={onClose} color='error'>
                            ยกเลิก
                        </Button>

                        <Button
                            variant="contained"
                            type="button"
                            onClick={() => {
                                console.log("click submit");

                                Master_Controller.handleSubmit(
                                    Master_Controller.onSubmitMaster,
                                    (errs: any) => {
                                        console.log("submit errors", errs);
                                        Master_Controller.handleErrorSubmit(
                                            errs,
                                            Master_Controller.methods.setFocus
                                        );
                                    }
                                )();
                            }}
                        >
                            เพิ่ม
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>);
};
export default CreateFaculty;