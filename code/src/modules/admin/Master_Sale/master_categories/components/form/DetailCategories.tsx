import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import type {
    IuseFetchMasterCategoryFrom,
    IuseFetchMasterCategoryList,
} from "../../hook/useFetchMasterCategories";
import { Controller } from "react-hook-form";

export interface IDetailCategoriesProps {
    masterController: IuseFetchMasterCategoryFrom;
    master: IuseFetchMasterCategoryList;
}

const DetailCategories: React.FC<IDetailCategoriesProps> = ({
    master,
    masterController,
}) => {
    const isEdit = masterController.actype === "edit";

    const handleClose = () => {
        master.setOpenModel(false);
    };

    return (
        <Dialog
            open={master.openModel}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden",
                    },
                },
            }}
        >
            <DialogTitle sx={{ px: 3, pt: 3, pb: 2 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800 }}
                    >
                        {isEdit ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        กรอกข้อมูลหมวดหมู่สินค้าให้ครบถ้วน
                    </Typography>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: 3, pt: 5, pb: 1 }}>
                <Grid container spacing={2} >
                    <Grid size={isEdit ? { xs: 8, md: 9 } : 12} 
                            sx={{marginTop:2}}>
                        <TextField
                            label="ชื่อหมวดหมู่"
                            fullWidth
                            value={masterController.getValues("category_name")}
                            onChange={(e) =>
                                masterController.setValue(
                                    "category_name",
                                    e.target.value
                                )
                            }
                        />
                    </Grid>

                    {isEdit && (
                        <Grid size={{ xs: 4, md: 3 }}
                            sx={{marginTop:3}}>
                            <Controller
                                name="is_active"
                                control={masterController.control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        label={field.value ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                                        sx={{
                                            m: 0,
                                            "& .MuiFormControlLabel-label": {
                                                ml: 1,
                                                fontWeight: 600,
                                            },
                                        }}
                                        control={
                                            <Switch
                                                color="success"
                                                checked={!!field.value}
                                                onChange={(e) =>
                                                    field.onChange(e.target.checked)
                                                }
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2.5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1.5,
                        pt: 1,
                    }}
                >
                    <Button
                        onClick={() => master.setOpenModel(false)}
                        variant="outlined"
                        color="error"
                    >
                        ยกเลิก
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        form="categories-form"
                    >
                        {isEdit ? "อัปเดต" : "บันทึก"}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default DetailCategories;