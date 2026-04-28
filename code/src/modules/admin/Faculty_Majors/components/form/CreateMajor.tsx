import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext } from "react-hook-form";
import { inputSx } from "../../utils/faculty_major_sx";

export interface ICreateMajorProps {
    open: boolean;
    onClose: () => void;
    Master_Controller: any;
}

const CreateMajor: React.FC<ICreateMajorProps> = ({
    open,
    onClose,
    Master_Controller,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<any>();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Typography fontSize={24} fontWeight={800}>
                            เพิ่มสาขาใหม่
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#6b7280" }}>
                            กรอกข้อมูลสาขาวิชา
                        </Typography>
                    </Box>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ pt: 4 }}>
                <Typography sx={{ mb: 1.2, fontWeight: 700 }}>
                    ชื่อสาขา *
                </Typography>

                <Controller
                    name="major_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="เช่น สาขาวิชาการตลาดดิจิทัล"
                            sx={inputSx}
                            error={!!errors.major_name}
                            helperText={errors.major_name?.message as string}
                        />
                    )}
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 6 }}>
                    <Button variant="outlined" onClick={onClose}>
                        ยกเลิก
                    </Button>

                    <Button
                        variant="contained"
                        type="button"
                        onClick={() => {
                            Master_Controller.handleSubmit(
                                Master_Controller.onSubmitMaster,
                                (errs: any) =>
                                    Master_Controller.handleErrorSubmit(
                                        errs,
                                        Master_Controller.methods.setFocus
                                    )
                            )();
                        }}
                    >
                        เพิ่มสาขา
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default CreateMajor;