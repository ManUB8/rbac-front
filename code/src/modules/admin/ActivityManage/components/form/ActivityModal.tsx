import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
import type { IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";
import ActivityDetail from "./ActivityDetail";
import ActivityPosition from "./ActivityPosition";
import { ActivityPhoto } from "./ActivityPhoto";
import NoImg from '../../../../../assets/image/nophoto.jpg';

interface IActivityModalProps {
  MasterController: IuseMasterFunctionActivityFromFetch;
}


const ActivityModal: React.FC<IActivityModalProps> = ({ MasterController }) => {
  const { control, errors, openModal, setOpenModal, actype, getValues, setValue } = MasterController;

  return (
    <Dialog
      open={openModal}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            px: 1,
            py: 1,
          },
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
        <ActivityPhoto
          value={getValues('activity_img') || NoImg}
          onChange={(url) => {
            setValue('activity_img', url || '');
          }}
          label="No Photo"
        />
        <ActivityDetail MasterController={MasterController} />
        <ActivityPosition MasterController={MasterController} />
      </DialogContent>
      <DialogActions>
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
              color:'error.main'
            }}
          >
            {"ยกเลิก"}
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
              boxShadow: "none",
            }}
          >
            {actype === "create" ? "เพิ่มกิจกรรม" : "บันทึกการแก้ไข"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog >
  );
};

export default ActivityModal;