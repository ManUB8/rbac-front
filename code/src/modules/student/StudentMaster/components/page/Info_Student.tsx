import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import type { IuseStudentFetch } from "../../hook/useFetchStudent";

export interface IInfo_StudentProps {
  Master_Student: IuseStudentFetch;
}

const Info_Student: React.FC<IInfo_StudentProps> = ({ Master_Student }) => {
  const studentCode = Master_Student.Student_data?.student_code || "";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const qrSize = isMobile ? 190 : 240;

  const [qrRefreshKey, setQrRefreshKey] = useState(0);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrPayload, setQrPayload] = useState("");
  const [locationText, setLocationText] = useState("");

  const createQrPayload = (lat?: number | null, lng?: number | null) => {
    if (!lat || !lng) {
      return studentCode;
    }

    return `${studentCode}|${lat}|${lng}`;
  };

  const handleRefreshQrCode = () => {
    if (!studentCode) return;

    if (!navigator.geolocation) {
      alert("อุปกรณ์นี้ไม่รองรับการดึงตำแหน่ง GPS");
      return;
    }

    setQrLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setQrPayload(createQrPayload(lat, lng));
        setLocationText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        setQrRefreshKey((prev) => prev + 1);
        setQrLoading(false);
      },
      (error) => {
        console.error(error);
        setQrLoading(false);
        alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาอนุญาต Location");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // useEffect(() => {
  //   if (!studentCode) return;

  //   setQrPayload(studentCode);
  //   setLocationText("");
  //   setQrRefreshKey((prev) => prev + 1);
  // }, [studentCode]);

  useEffect(() => {
    if (!studentCode) return;

    setQrPayload("");
    setLocationText("");
    setQrRefreshKey((prev) => prev + 1);
  }, [studentCode]);

  return (
    <Container maxWidth="sm">
      <Card
        elevation={0}
        sx={{
          borderRadius: "22px",
          overflow: "hidden",
          border: "1px solid #dbe3f0",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 3,
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <SchoolOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
              บัตรข้อมูลนิสิต
            </Typography>
          </Stack>
        </Box>

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            <InfoRow
              icon={<PersonOutlineOutlinedIcon sx={iconSx} />}
              label="ชื่อ-นามสกุล"
              value={`${Master_Student.Student_data?.first_name || ""} ${Master_Student.Student_data?.last_name || ""
                }`}
            />

            <InfoRow
              icon={<TagOutlinedIcon sx={iconSx} />}
              label="รหัสนิสิต"
              value={studentCode || "-"}
            />

            <InfoRow
              icon={<AccountBalanceOutlinedIcon sx={iconSx} />}
              label="คณะ"
              value={Master_Student.Student_data?.faculty_name || "-"}
            />

            <InfoRow
              icon={<AutoStoriesOutlinedIcon sx={iconSx} />}
              label="สาขา"
              value={Master_Student.Student_data?.major_name || "-"}
            />

            <Divider />

            <Box
              sx={{
                border: "1px solid #dbe3f0",
                borderRadius: "18px",
                px: { xs: 1.5, sm: 3 },
                py: 3,
                textAlign: "center",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              {/* <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <QrCode2OutlinedIcon sx={{ color: "#1d4ed8" }} />
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  QR Code สำหรับเข้าร่วมกิจกรรม
                </Typography>
              </Stack> */}

              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  maxWidth: "100%",
                  mx: "auto",
                  p: { xs: 1.2, sm: 2 },
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                  overflow: "hidden",
                }}
              >
                {studentCode && qrPayload ? (
                  <>
                    {/* <QRCodeCanvas
                      key={qrRefreshKey}
                      value={qrPayload}
                      size={qrSize}
                      level="H"
                      includeMargin
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        height: "auto",
                        opacity: qrLoading ? 0.25 : 1,
                        transition: "0.2s",
                      }}
                    /> */
                      <QRCodeCanvas
                        key={qrRefreshKey}
                        value={qrPayload}
                        size={qrSize}
                        level="H"
                        includeMargin
                        style={{
                          display: "block",
                          maxWidth: "100%",
                          height: "auto",
                          opacity: qrLoading ? 0.25 : 1,
                          transition: "0.2s",
                        }}
                      />}

                    {qrLoading && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(255,255,255,0.72)",
                          backdropFilter: "blur(1px)",
                        }}
                      >
                        <Stack
                          spacing={1}
                          sx={{
                            alignItems: "center",
                            color: "#1d4ed8",
                          }}
                        >
                          <CircularProgress size={28} thickness={5} />
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#1d4ed8",
                            }}
                          >
                            {"กำลังดึงตำแหน่ง"}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  </>
                ) : (
                  // <Typography color="text.secondary">
                  //   {"กรุณากด Refresh QR Code เพื่อสร้าง QR"}
                  // </Typography>
                  <QRCodeCanvas
                    value="placeholder"
                    size={qrSize}
                    level="H"
                    includeMargin
                    fgColor="#D1D5DB"
                    bgColor="#FFFFFF"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      height: "auto",
                      opacity: 0.35,
                      filter: "grayscale(1)",
                    }}
                  />
                )}
              </Box>

              {locationText && (
                <Stack
                  direction="row"
                  spacing={0.8}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1.5,
                  }}
                >
                  <MyLocationOutlinedIcon
                    sx={{ fontSize: 18, color: "#1d4ed8" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ตำแหน่งล่าสุด: {locationText}
                  </Typography>
                </Stack>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1.5 }}
              >
                รูปแบบ QR: รหัสนิสิต|ละติจูด|ลองจิจูด
              </Typography>

              <Button
                variant="contained"
                startIcon={!qrLoading ? <RefreshIcon /> : undefined}
                onClick={handleRefreshQrCode}
                disabled={!studentCode || qrLoading}
                sx={{
                  mt: 2,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#1d4ed8",
                  "&:hover": {
                    bgcolor: "#1e40af",
                  },
                }}
              >
                {qrLoading ? "กำลังอัปเดต QR Code..." : "Refresh QR Code"}
              </Button>
              
              <Stack
                direction="row"
                spacing={0.25}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 1,
                  mt: 2,
                  
                }}
              >
                {/* <QrCode2OutlinedIcon sx={{ color: "#1d4ed8" }} /> */}
                <Typography
                  sx={{
                   
                    fontSize: { xs: 16, sm: 18  },
                    fontWeight: 800,
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                  
                >
                  QR Code สำหรับเข้าร่วมกิจกรรม
                </Typography>
              </Stack>

            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Info_Student;

const iconSx = {
  color: "#1d4ed8",
  mt: "2px",
  fontSize: 22,
};

interface IInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow: React.FC<IInfoRowProps> = ({ icon, label, value }) => {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
      {icon}

      <Box>
        <Typography
          sx={{
            fontSize: 15,
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            // color: "#0f172a",
            mt: 0.5,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};