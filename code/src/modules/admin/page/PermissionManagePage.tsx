import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import { usePermission } from "../../auth/hook/usePermission";
import type { IStudentPermissions } from "../../../shared/types/menu";

const PermissionManagePage: React.FC = () => {
  const { getStudentPermissions, setStudentPermissions } = usePermission();

  const [permissions, setPermissions] = useState<IStudentPermissions>(
    getStudentPermissions()
  );

  const handleToggle = (key: keyof IStudentPermissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setStudentPermissions(permissions);
    window.location.reload();
  };

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={800} mb={2}>
            ตั้งค่าสิทธิ์การมองเห็นของนิสิต
          </Typography>

          <Typography color="text.secondary" mb={3}>
            กำหนดว่านิสิตจะสามารถเห็นเมนูหรือหน้าใดได้บ้าง
          </Typography>

          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={permissions.student_card}
                  onChange={() => handleToggle("student_card")}
                />
              }
              label="หน้าบัตรนิสิต"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={permissions.student_register}
                  onChange={() => handleToggle("student_register")}
                />
              }
              label="หน้าลงทะเบียนกิจกรรม"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={permissions.student_summary}
                  onChange={() => handleToggle("student_summary")}
                />
              }
              label="หน้าดูผลรวมเข้ากิจกรรม"
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            บันทึก
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PermissionManagePage;