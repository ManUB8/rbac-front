import { useState } from "react";
import { isAxiosError } from "axios";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { IForgotPasswordStudentBody } from "../interface/Login.interface";
import { ForgotPasswordStudent } from "../service/LoginApi";

interface Props {
  studentCode: string;
  onClose: () => void;
  onSuccess: (studentCode: string) => void;
}

interface ForgotPasswordForm extends IForgotPasswordStudentBody {
  confirm_password: string;
}

const ForgotPasswordStudentDialog = ({ studentCode, onClose, onSuccess }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      student_code: studentCode,
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordForm) => {
    setError(null);
    try {
      await ForgotPasswordStudent({
        student_code: values.student_code,
        new_password: values.new_password,
      });
      onSuccess(values.student_code);
    } catch (err: unknown) {
      const detail = isAxiosError(err) ? err.response?.data?.detail : undefined;
      setError(
        typeof detail === "string"
          ? detail
          : "เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    }
  };

  return (
    <Dialog
      open
      fullWidth
      maxWidth="xs"
      aria-labelledby="forgot-password-title"
      onClose={() => { if (!isSubmitting) onClose(); }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id="forgot-password-title">ลืมรหัสผ่านนิสิต</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            กรอกรหัสนิสิตและตั้งรหัสผ่านใหม่ เพื่อกลับไปเข้าสู่ระบบ
          </DialogContentText>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              autoFocus
              label="รหัสนิสิต"
              autoComplete="username"
              disabled={isSubmitting}
              {...register("student_code", {
                required: "กรุณากรอกรหัสนิสิต",
                pattern: { value: /^\d{8}$/, message: "กรุณากรอกรหัสนิสิตเป็นตัวเลข 8 หลัก" },
              })}
              slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 8 } }}
              error={!!errors.student_code}
              helperText={errors.student_code?.message}
            />
            <TextField
              label="รหัสผ่านใหม่"
              type="password"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("new_password", {
                required: "กรุณากรอกรหัสผ่านใหม่",
                validate: (value) => value.trim().length > 0 || "กรุณากรอกรหัสผ่านใหม่",
              })}
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
            />
            <TextField
              label="ยืนยันรหัสผ่านใหม่"
              type="password"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("confirm_password", {
                required: "กรุณายืนยันรหัสผ่านใหม่",
                validate: (value) => value === getValues("new_password") || "รหัสผ่านไม่ตรงกัน",
              })}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button type="button" disabled={isSubmitting} onClick={onClose}>ยกเลิก</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPasswordStudentDialog;
