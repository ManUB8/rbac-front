import React from "react";
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export interface IStudentActivityPageProps {}

interface IActivityItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  chipColor: "primary" | "success";
}

const activityList: IActivityItem[] = [
  {
    id: 1,
    title: "กิจกรรมปฐมนิเทศนิสิตใหม่",
    description: "กิจกรรมต้อนรับนิสิตใหม่ แนะนำการใช้ชีวิตในมหาวิทยาลัย",
    date: "15 มกราคม 2026",
    time: "09:00 - 16:00",
    location: "หอประชุมใหญ่",
    category: "พัฒนาทักษะ",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    chipColor: "primary",
  },
  {
    id: 2,
    title: "การแข่งขันกีฬาภายใน",
    description: "การแข่งขันกีฬาระหว่างคณะ เพื่อส่งเสริมความสามัคคี",
    date: "22 มกราคม 2026",
    time: "08:00 - 17:00",
    location: "สนามกีฬามหาวิทยาลัย",
    category: "กีฬา",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80",
    chipColor: "success",
  },
  {
    id: 3,
    title: "สัมมนาการพัฒนาซอฟต์แวร์",
    description: "เรียนรู้เทคนิคและเครื่องมือในการพัฒนาซอฟต์แวร์สมัยใหม่",
    date: "5 กุมภาพันธ์ 2026",
    time: "13:00 - 16:00",
    location: "ห้องประชุม A201",
    category: "พัฒนาทักษะ",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    chipColor: "primary",
  },
];

const iconSx = {
  fontSize: 20,
  color: "#2563eb",
};

const StudentActivityPage: React.FunctionComponent<
  IStudentActivityPageProps
> = () => {
  return (
    <>
      <Box p={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">หน้ากิจกรรมนิสิต</Typography>
            <Typography sx={{ mt: 1 }}>Student Activity page</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#eef2f7",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2.5}>
            {activityList.map((activity) => (
              <Card
                key={activity.id}
                elevation={0}
                sx={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #d7dee8",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    minHeight: 220,
                  }}
                >
                  {/* Image */}
                  <CardMedia
                    component="img"
                    image={activity.image}
                    alt={activity.title}
                    sx={{
                      width: { xs: "100%", md: 190 },
                      height: { xs: 220, md: "auto" },
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  {/* Content */}
                  <Box
                    sx={{
                      flex: 1,
                      px: 2.5,
                      py: 2.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "2rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          lineHeight: 1.25,
                          mb: 1,
                        }}
                      >
                        {activity.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "#475569",
                          mb: 2,
                        }}
                      >
                        {activity.description}
                      </Typography>

                      <Stack spacing={1.2}>
                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <CalendarMonthOutlinedIcon sx={iconSx} />
                          <Typography
                            sx={{ fontSize: "1rem", color: "#334155" }}
                          >
                            {activity.date}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <AccessTimeOutlinedIcon sx={iconSx} />
                          <Typography
                            sx={{ fontSize: "1rem", color: "#334155" }}
                          >
                            {activity.time}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <LocationOnOutlinedIcon sx={iconSx} />
                          <Typography
                            sx={{ fontSize: "1rem", color: "#334155" }}
                          >
                            {activity.location}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* Chip */}
                    <Chip
                      label={activity.category}
                      color={activity.chipColor}
                      size="small"
                      sx={{
                        mt: 0.5,
                        fontWeight: 600,
                        borderRadius: "999px",
                        alignSelf: "flex-start",
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default StudentActivityPage;
