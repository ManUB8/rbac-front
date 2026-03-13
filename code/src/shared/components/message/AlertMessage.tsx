// AlertMessage.tsx
import React from "react";
import { Alert, Snackbar, type AlertColor } from "@mui/material";
import type { ITextAlert } from "./Alert.interface";

export interface IAlertMessageProps {
  open: boolean;
  popupValue?: ITextAlert | null;   // ← เผื่อ undefined/null
  autoHideDuration?: number;
}

const AlertMessage: React.FC<IAlertMessageProps> = ({
  open,
  popupValue,
  autoHideDuration = 3000,
}) => {
  if (!popupValue) return null;

  const mapSeverity = (s?: ITextAlert["type_severity"]): AlertColor => {
    switch (s) {
      case "success":
      case "info":
      case "warning":
      case "error":
        return s;
      case "normal":
      default:
        return "info";
    }
  };

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    popupValue.onClose?.(); // เรียกตัวที่หน้าปลายทางส่งมา
  };

  return (
    <Snackbar
      key={`${popupValue.title ?? ""}-${popupValue.content}`} // รีสตาร์ท timer เมื่อข้อความ/ชื่อเปลี่ยน
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: popupValue.type_vertical ?? "bottom",
        horizontal: popupValue.type_horizontal ?? "left",
      }}
    >
      <Alert
        // อย่าใส่ onClose ซ้ำที่ Alert ถ้าไม่ต้องการปุ่มกากบาทของ Alert
        // ถ้าอยากให้มี “x” ปิด ให้ใส่ onClose={handleClose}
        severity={mapSeverity(popupValue.type_severity)}
        // variant="filled"
        sx={{
          width: { xs: '100%', sm: 520, md: 680 },
          alignItems: 'center',
        }}
      >
        {popupValue.title ? <strong style={{ display:'block', marginBottom: 4 }}>{popupValue.title}</strong> : null}
        {popupValue.content}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;