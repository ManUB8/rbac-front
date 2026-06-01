import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import { QRCodeCanvas } from "qrcode.react";

export interface IGenerateQrProps {}

const GenerateQr: React.FunctionComponent<IGenerateQrProps> = () => {
  const [link, setLink] = useState("");

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const linkEl = document.createElement("a");
    linkEl.href = url;
    linkEl.download = "qrcode.png";

    linkEl.click();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card
        sx={{
          maxWidth: 520,
          mx: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={3}>
            {/* หัวข้อ */}
            <Stack
              component="div"
              direction="row"
              spacing={1}
              sx={{ alignItems: "center" }}
            >
              <QrCode2OutlinedIcon sx={{ color: "#2952D9" }} />

              <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
                Generate QR Code
              </Typography>
            </Stack>

            {/* ช่องกรอกลิงก์ */}
            <TextField
              label="กรอกลิงก์"
              placeholder="https://example.com"
              fullWidth
              value={link}
              onChange={(e) => setLink(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: 17,
                  color: "#475569",
                },
              }}
            />

            {/* QR Code */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
            >
              {link.trim() ? (
                <QRCodeCanvas
                  value={link}
                  size={240}
                  level="H"
                  includeMargin
                />
              ) : (
                <QRCodeCanvas
                  value="placeholder"
                  size={240}
                  level="H"
                  includeMargin
                  fgColor="#D1D5DB"
                  bgColor="#FFFFFF"
                  style={{
                    opacity: 0.35,
                    filter: "grayscale(1)",
                  }}
                />
              )}
            </Box>

            {/* ปุ่มบันทึก */}
            <Button
              variant="contained"
              fullWidth
              startIcon={<DownloadOutlinedIcon />}
              onClick={handleDownloadQR}
              disabled={!link.trim()}
              sx={{
                height: 54,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 800,
                backgroundColor: "#2952D9",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#2348BF",
                  boxShadow: "none",
                },

                "&.Mui-disabled": {
                  backgroundColor: "#CBD5E1",
                  color: "#FFFFFF",
                },
              }}
            >
              บันทึก QR Code
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GenerateQr;