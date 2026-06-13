import React, { Activity } from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import type { IuseFetchEventRegistrants } from "../../hook/useFetchEventRegistrants";
import CloseIcon from "@mui/icons-material/Close";
import type { IActivityOption } from "../../interface/EventRegistrants.interface";
interface EventDialogProps {
    mastercontroller: IuseFetchEventRegistrants;
}

const radioSx = {
    p: 0.8,
};

const EventDialog: React.FC<EventDialogProps> = ({ mastercontroller }) => {
    const data = mastercontroller.selected_data;

    return (
        <Dialog
            open={mastercontroller.openModal}
            onClose={() => mastercontroller.setOpenModal(false)}
            fullWidth
            maxWidth="md"

        >
            <DialogTitle>แก้ไขสถานะการเข้าร่วม
                <IconButton
                    onClick={() => mastercontroller.setOpenModal(false)}
                    sx={{
                        position: "absolute", right: 12, top: 12,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 6, md: 3 }}>
                        <TextField
                            label="รหัสนิสิต"
                            value={data?.student_code || ""}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <TextField
                            label="ชั้นปี"
                            value={data?.year_status || ""}
                            disabled
                            fullWidth
                        />
                    </Grid>


                    <Grid size={{ xs: 12, md: 7 }}>
                        <TextField
                            label="ชื่อ - นามสกุล"
                            value={data?.full_name || ""}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="คณะ"
                            value={data?.faculty_name || ""}
                            disabled
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="สาขา"
                            value={data?.major_name || ""}
                            disabled
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                // fontWeight: 100,
                                // mb: 1,
                            }}
                        >
                            สถานะการเข้าร่วม
                        </Typography>
                        <RadioGroup
                            row
                            value={data?.check_detail?.attendance_status || ""}
                            onChange={(e) =>
                                mastercontroller.handleChangeAttendanceStatus(e.target.value)
                            }
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 2,
                            }}
                        >
                            <FormControlLabel
                                value="เข้าร่วม"
                                control={
                                    <Radio
                                        sx={{
                                            ...radioSx,
                                            color: "success.main",
                                            "&.Mui-checked": {
                                                color: "success.main",
                                            },
                                        }}
                                    />
                                }
                                label="เข้าร่วม"
                            />
                            <FormControlLabel
                                value="ไม่เข้าร่วม"
                                control={
                                    <Radio
                                        sx={{
                                            ...radioSx,
                                            color: "error.main",
                                            "&.Mui-checked": {
                                                color: "error.main",
                                            },
                                        }}
                                    />
                                }
                                label="ไม่เข้าร่วม"
                            />
                        </RadioGroup>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Autocomplete<IActivityOption>
                            fullWidth
                            loading={mastercontroller.activity_loading}
                            options={mastercontroller.activity_options}
                            value={
                                mastercontroller.activity_options.find(
                                    (item) => item.id === data?.activity_id
                                ) ?? {
                                    id: data?.activity_id || 0,
                                    name: data?.activity_name || "",
                                    target_group: "all",
                                }
                            }
                            getOptionLabel={(option) => option.name ?? ""}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(_, newValue) => {
                                mastercontroller.handleChangeActivity(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="ย้ายไปยังกิจกรรม"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => mastercontroller.setOpenModal(false)}>
                    ยกเลิก
                </Button>

                <Button
                    variant="contained"
                    onClick={mastercontroller.onSubmitMaster}
                >
                    บันทึก
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventDialog;