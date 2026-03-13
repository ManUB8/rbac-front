// Alert.interface.ts
import type { AlertColor, SnackbarOrigin } from "@mui/material";

export interface ITextAlert {
  title?: string;
  type_horizontal?: SnackbarOrigin["horizontal"]; // optional จะยืดหยุ่นกว่า
  type_vertical?: SnackbarOrigin["vertical"];
  type_severity?: AlertColor | "normal"; // อนุญาต "normal" แล้วไป map เป็น "info"
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onConfirm2?: () => void;
}

export const TextAlertDefault: ITextAlert = {
  title: "",
  type_vertical: "bottom",
  type_horizontal: "left",
  type_severity: "normal",
  content: "",
  onClose: () => {},
  onConfirm: () => {},
};