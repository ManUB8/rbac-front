import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";

export interface IStudentCardPageProps {}

const infoRowSx = {
  alignItems: "flex-start",
  gap: 1.5,
};

const iconSx = {
  color: "#1d4ed8",
  mt: "2px",
  fontSize: 22,
};

const StudentCardPage: React.FunctionComponent<IStudentCardPageProps> = () => {
  const studentData = {
    full_name: "สมชาย ใจดี",
    student_id: "6510123456",
    faculty_name: "คณะวิศวกรรมศาสตร์",
    major_name: "วิศวกรรมคอมพิวเตอร์",
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=6510123456",
  };

  return (
    <>
      <Box p={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">หน้าข้อมูลนิสิต</Typography>
            <Typography sx={{ mt: 1 }}>Student information page</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#eef3fb",
          py: 4,
        }}
      >
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
            {/* Header */}

            <Box
              sx={{
                px: 3,
                py: 3,
                color: "#fff",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <SchoolOutlinedIcon sx={{ fontSize: 30 }} />
                <Box>
                  <Typography fontSize={22} fontWeight={800}>
                    บัตรข้อมูลนิสิต
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {/* Content */}
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction="row" sx={infoRowSx}>
                  <PersonOutlineOutlinedIcon sx={iconSx} />
                  <Box>
                    <Typography fontSize={15} color="text.secondary">
                      ชื่อ-นามสกุล
                    </Typography>
                    <Typography
                      fontSize={18}
                      fontWeight={700}
                      color="#0f172a"
                      sx={{ mt: 0.5 }}
                    >
                      {studentData.full_name}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" sx={infoRowSx}>
                  <TagOutlinedIcon sx={iconSx} />
                  <Box>
                    <Typography fontSize={15} color="text.secondary">
                      รหัสนิสิต
                    </Typography>
                    <Typography
                      fontSize={18}
                      fontWeight={700}
                      color="#0f172a"
                      sx={{ mt: 0.5 }}
                    >
                      {studentData.student_id}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" sx={infoRowSx}>
                  <AccountBalanceOutlinedIcon sx={iconSx} />
                  <Box>
                    <Typography fontSize={15} color="text.secondary">
                      คณะ
                    </Typography>
                    <Typography
                      fontSize={18}
                      fontWeight={700}
                      color="#0f172a"
                      sx={{ mt: 0.5 }}
                    >
                      {studentData.faculty_name}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" sx={infoRowSx}>
                  <AutoStoriesOutlinedIcon sx={iconSx} />
                  <Box>
                    <Typography fontSize={15} color="text.secondary">
                      สาขา
                    </Typography>
                    <Typography
                      fontSize={18}
                      fontWeight={700}
                      color="#0f172a"
                      sx={{ mt: 0.5 }}
                    >
                      {studentData.major_name}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                {/* QR Section */}
                <Box
                  sx={{
                    border: "1px solid #dbe3f0",
                    borderRadius: "18px",
                    backgroundColor: "#f8fafc",
                    px: 3,
                    py: 3,
                    textAlign: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <QrCode2OutlinedIcon sx={{ color: "#1d4ed8" }} />
                    <Typography fontSize={16} fontWeight={600} color="#334155">
                      QR Code สำหรับเข้าร่วมกิจกรรม
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      width: "fit-content",
                      mx: "auto",
                      p: 2,
                      borderRadius: "16px",
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                    }}
                  >
                    <Box
                      component="img"
                      src={studentData.qr_url}
                      alt="student-qr-code"
                      sx={{
                        width: { xs: 220, sm: 260 },
                        height: { xs: 220, sm: 260 },
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default StudentCardPage;
