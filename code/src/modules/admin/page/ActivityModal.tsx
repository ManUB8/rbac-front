import React, { useEffect, useState } from "react";
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

export interface IActivityFormData {
  activity_name: string;
  activity_date: string;
  hours: string;
  start_time: string;
  end_time: string;
  location: string;
  image_url: string;
  description: string;
}

interface IActivityModalProps {
  open: boolean;
  handleClose: () => void;
  formData: IActivityFormData;
  setFormData: React.Dispatch<React.SetStateAction<IActivityFormData>>;
  onSubmit: (data: IActivityFormData) => void;
  mode: "add" | "edit";
}

const ActivityModal: React.FC<IActivityModalProps> = ({
  open,
  handleClose,
  formData,
  setFormData,
  onSubmit,
  mode,
}) => {
  const [localForm, setLocalForm] = useState<IActivityFormData>(formData);

  useEffect(() => {
    setLocalForm(formData);
  }, [formData, open]);

  const handleChange =
    (field: keyof IActivityFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setLocalForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSave = () => {
    setFormData(localForm);
    onSubmit(localForm);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography fontSize={32} fontWeight={700}>
              {mode === "edit" ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม"}
            </Typography>
            <Typography color="text.secondary">
              กรอกข้อมูลกิจกรรมให้ครบถ้วน
            </Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2.5} mt={3}>
          <TextField
            label="ชื่อกิจกรรม *"
            fullWidth
            value={localForm.activity_name}
            onChange={handleChange("activity_name")}
          />

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="วันที่ *"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={localForm.activity_date}
              onChange={handleChange("activity_date")}
            />
            <TextField
              label="จำนวนชั่วโมง *"
              fullWidth
              value={localForm.hours}
              onChange={handleChange("hours")}
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="เวลาเริ่ม *"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={localForm.start_time}
              onChange={handleChange("start_time")}
            />
            <TextField
              label="เวลาสิ้นสุด *"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={localForm.end_time}
              onChange={handleChange("end_time")}
            />
          </Stack>

          <TextField
            label="สถานที่ *"
            fullWidth
            value={localForm.location}
            onChange={handleChange("location")}
          />

          <TextField
            label="URL รูปภาพกิจกรรม"
            fullWidth
            value={localForm.image_url}
            onChange={handleChange("image_url")}
          />

          <TextField
            label="รายละเอียด *"
            fullWidth
            multiline
            rows={4}
            value={localForm.description}
            onChange={handleChange("description")}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} pt={2}>
            <Button variant="outlined" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="contained" onClick={handleSave}>
              {mode === "edit" ? "บันทึกการแก้ไข" : "เพิ่มกิจกรรม"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityModal;