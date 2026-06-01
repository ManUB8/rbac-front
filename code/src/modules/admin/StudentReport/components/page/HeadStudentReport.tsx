import React from "react";
import {
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

export interface IHeadStudentReportProps {
  onPrintPdf: () => void;
}

const HeadStudentReport: React.FC<IHeadStudentReportProps> = ({ onPrintPdf }) => {
  return (
    <Grid container>
      <Grid size={12}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 800 }}>
              รายงานกิจกรรมของนิสิต
            </Typography>

            <Button
              variant="contained"
              startIcon={<PictureAsPdfOutlinedIcon />}
              onClick={onPrintPdf}
              sx={{
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Print กยศ.
            </Button>
          </Stack>

          <Typography sx={{ color: "text.secondary" }}>
            ค้นหาและดูประวัติกิจกรรมของนิสิตรายบุคคล
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HeadStudentReport;