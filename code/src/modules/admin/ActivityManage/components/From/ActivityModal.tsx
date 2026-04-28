import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
import type { IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";

interface IActivityModalProps {
  MasterController: IuseMasterFunctionActivityFromFetch;
}

const inputSx = (value?: string) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    "& input": {
      color: value ? "#6b7280" : "#9ca3af",
    },
    "& input:focus": {
      color: "#111827",
    },
  },
});
const ActivityModal: React.FC<IActivityModalProps> = ({ MasterController }) => {
  const { control, errors, openModal, setOpenModal, actype } = MasterController;

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          px: 1,
          py: 1,
        },
      }}
    >
      <DialogContent sx={{ px: 3, py: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 34, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
              {actype === "create" ? "เพิ่มกิจกรรมใหม่" : "แก้ไขกิจกรรม"}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 16, color: "#64748b" }}>
              กรอกข้อมูลกิจกรรมให้ครบถ้วน
            </Typography>
          </Box>

          <IconButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <Controller
            name="activity_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="activity_name"
                label="ชื่อกิจกรรม *"
                placeholder="เช่น ปฐมนิเทศนักศึกษาใหม่ 2568"
                error={!!errors.activity_name}
                helperText={errors.activity_name?.message as string}
                sx={inputSx(field.value)}
              />
            )}
          />

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Controller
              name="activity_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="activity_date"
                  label="วันที่ *"
                  type="date"
                  error={!!errors.activity_date}
                  helperText={errors.activity_date?.message as string}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx(field.value)}
                />
              )}
            />

            <Controller
              name="hours"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="hours"
                  label="จำนวนชั่วโมง *"
                  type="number"
                  value={field.value ?? ""} 
                  error={!!errors.hours}
                  helperText={errors.hours?.message as string}
                  sx={inputSx(String(field.value ?? "" ))}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  inputProps={{
                    min: 0,
                    step: 0.5,  
                  }}

                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Controller
              name="start_time"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="start_time"
                  label="เวลาเริ่ม *"
                  // type="time"
                  error={!!errors.start_time}
                  helperText={errors.start_time?.message as string}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx(field.value)}
                />
              )}
            />

            <Controller
              name="end_time"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="end_time"
                  label="เวลาสิ้นสุด *"
                  // type="time"
                  error={!!errors.end_time}
                  helperText={errors.end_time?.message as string}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx(field.value)}
                />
              )}
            />
          </Stack>

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="location"
                label="สถานที่ *"
                placeholder="เช่น หอประชุมใหญ่ ชั้น 5 อาคาร A"
                error={!!errors.location}
                helperText={errors.location?.message as string}
                sx={inputSx(field.value)}
              />
            )}
          />

          <Controller
            name="activity_img"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="activity_img"
                label="URL รูปภาพกิจกรรม"
                placeholder="https://example.com/image.jpg"
                error={!!errors.activity_img}
                helperText={errors.activity_img?.message as string}
                sx={inputSx(field.value)}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="description"
                label="รายละเอียด *"
                placeholder="กรอกรายละเอียดกิจกรรม"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message as string}
                sx={inputSx(field.value)}
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              pt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              sx={{
                minWidth: 96,
                height: 44,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                borderColor: "#d1d5db",
                color: "#111827",
              }}
            >
              ยกเลิก
            </Button>

            <Button
              variant="contained"
              type="button"
              onClick={() => {
                console.log("click submit");
                MasterController.handleSubmit(
                  MasterController.onSubmitMaster,
                  (errs: any) => {
                    console.log("submit errors", errs);
                    MasterController.handleErrorSubmit(
                      errs,
                      MasterController.methods.setFocus
                    );
                  }
                )();
              }}
              sx={{
                minWidth: 120,
                height: 44,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: "#020617",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#111827",
                  boxShadow: "none",
                },
              }}
            >
              {actype === "create" ? "เพิ่มกิจกรรม" : "บันทึกการแก้ไข"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog >
  );
};

export default ActivityModal;