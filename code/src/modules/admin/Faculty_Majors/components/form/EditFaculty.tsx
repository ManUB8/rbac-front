import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { inputSx } from "../../utils/faculty_major_sx";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext } from 'react-hook-form';
import type { IuseFacultyFormFetch } from '../../hook/useFetchFaculty_Majors';
export interface IEditFacultyProps {
    open: boolean;
    onClose: () => void;
    Master_Controller: IuseFacultyFormFetch
};
const EditFaculty: React.FunctionComponent<IEditFacultyProps> = ({ open, onClose, Master_Controller }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<any>();


    return (<>

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

            <DialogTitle sx={{ pb: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 800,
                                color: "#111827",
                            }}
                        >
                            แก้ไขคณะ
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
                <Typography sx={{ mb: 1.2, fontWeight: 700 }}>
                    ชื่อคณะ *
                </Typography>

                <Controller
                    name="faculty_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="กรอกชื่อคณะ"
                            sx={inputSx}
                            error={!!errors.faculty_name}
                            helperText={errors.faculty_name?.message as string}
                        />
                    )}
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 6 }}>
                    <Button variant="outlined" onClick={onClose}>
                        ยกเลิก
                    </Button>

                    {/* <Button
                        variant="contained"
                        type="submit"
                        form='faculty-form'
                        onClick={Master_Controller.handleSubmit(
                            Master_Controller.onSubmitMaster,
                            (errs: any) =>
                                Master_Controller.handleErrorSubmit(
                                    errs,
                                    Master_Controller.methods.setFocus
                                )
                        )}
                    >
                        บันทึกการแก้ไข
                    </Button> */}
                    <Button
                        variant="contained"
                        type="button"
                        onClick={() => {
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
                        บันทึกการแก้ไข
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    </>);
};
export default EditFaculty;

