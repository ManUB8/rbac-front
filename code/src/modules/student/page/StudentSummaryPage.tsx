import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export interface IStudentSummaryPageProps {}

interface IActivityItem {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  hours: number;
  status: string;
}

const activityList: IActivityItem[] = [
  {
    id: 1,
    title: "กิจกรรมปฐมนิเทศนิสิตใหม่",
    category: "พัฒนาทักษะ",
    date: "15 มกราคม 2026",
    time: "09:00 - 16:00",
    location: "หอประชุมใหญ่",
    hours: 7,
    status: "เข้าร่วมแล้ว",
  },
  {
    id: 2,
    title: "การแข่งขันกีฬาภายใน",
    category: "กีฬา",
    date: "22 มกราคม 2026",
    time: "08:00 - 17:00",
    location: "สนามกีฬามหาวิทยาลัย",
    hours: 9,
    status: "เข้าร่วมแล้ว",
  },
  {
    id: 3,
    title: "สัมมนาการพัฒนาซอฟต์แวร์",
    category: "พัฒนาทักษะ",
    date: "5 กุมภาพันธ์ 2026",
    time: "13:00 - 16:00",
    location: "ห้องประชุม A201",
    hours: 3,
    status: "เข้าร่วมแล้ว",
  },
];

const totalActivities = activityList.length;
const totalHours = activityList.reduce((sum, item) => sum + item.hours, 0);

const summaryCardSx = {
  borderRadius: "20px",
  color: "#fff",
  px: 3,
  py: 2.5,
  minHeight: 132,
  display: "flex",
  alignItems: "center",
};

const detailIconSx = {
  fontSize: 20,
  color: "#2563eb",
};

const StudentSummaryPage: React.FunctionComponent<
  IStudentSummaryPageProps
> = () => {
  return (
    <>
      <Box p={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">หน้าการเข้าร่วมกิจกรรม</Typography>
            <Typography sx={{ mt: 1 }}>Activity participation page</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#eef3f8",
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* Summary cards */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
              <Card
                elevation={0}
                sx={{
                  ...summaryCardSx,
                  flex: 1,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <TaskAltOutlinedIcon sx={{ fontSize: 34 }} />
                  <Box>
                    <Typography fontSize={18} fontWeight={600}>
                      กิจกรรมที่เข้าร่วม
                    </Typography>
                    <Typography fontSize={26} fontWeight={800} lineHeight={1.1}>
                      {totalActivities}
                    </Typography>
                    <Typography fontSize={18}>กิจกรรม</Typography>
                  </Box>
                </Stack>
              </Card>

              <Card
                elevation={0}
                sx={{
                  ...summaryCardSx,
                  flex: 1,
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #a21caf 100%)",
                  boxShadow: "0 8px 24px rgba(162, 28, 175, 0.22)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <MilitaryTechOutlinedIcon sx={{ fontSize: 34 }} />
                  <Box>
                    <Typography fontSize={18} fontWeight={600}>
                      ชั่วโมงสะสม
                    </Typography>
                    <Typography fontSize={26} fontWeight={800} lineHeight={1.1}>
                      {totalHours}
                    </Typography>
                    <Typography fontSize={18}>ชั่วโมง</Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>

            {/* Activity list */}
            <Card
              elevation={0}
              sx={{
                borderRadius: "22px",
                border: "1px solid #dbe3ef",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <CalendarTodayOutlinedIcon sx={{ color: "#2563eb" }} />
                  <Typography fontSize={20} fontWeight={800} color="#0f172a">
                    รายการกิจกรรม
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ px: 3, pb: 2 }}>
                {activityList.map((activity, index) => (
                  <Box key={activity.id}>
                    <Box sx={{ py: 2.5 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Stack
                            direction="row"
                            spacing={1.2}
                            alignItems="center"
                          >
                            <CheckCircleOutlineIcon
                              sx={{ color: "#22c55e", fontSize: 24 }}
                            />
                            <Typography
                              fontSize={17}
                              fontWeight={800}
                              color="#0f172a"
                            >
                              {activity.title}
                            </Typography>
                          </Stack>

                          <Chip
                            label={activity.category}
                            size="small"
                            sx={{
                              mt: 1.2,
                              ml: 3.8,
                              fontWeight: 700,
                              borderRadius: "999px",
                              backgroundColor:
                                activity.category === "กีฬา"
                                  ? "#dcfce7"
                                  : "#dbeafe",
                              color:
                                activity.category === "กีฬา"
                                  ? "#15803d"
                                  : "#2563eb",
                            }}
                          />

                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 1.2, md: 8 }}
                            sx={{ mt: 2, ml: 3.8 }}
                          >
                            <Stack spacing={1.2}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <CalendarTodayOutlinedIcon sx={detailIconSx} />
                                <Typography color="#334155">
                                  {activity.date}
                                </Typography>
                              </Stack>

                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <LocationOnOutlinedIcon sx={detailIconSx} />
                                <Typography color="#334155">
                                  {activity.location}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1.2}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <AccessTimeOutlinedIcon sx={detailIconSx} />
                                <Typography color="#334155">
                                  {activity.time}
                                </Typography>
                              </Stack>

                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <MilitaryTechOutlinedIcon sx={detailIconSx} />
                                <Typography color="#334155">
                                  {activity.hours} ชั่วโมง
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Box>

                        <Chip
                          label={activity.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            borderRadius: "999px",
                            backgroundColor: "#dcfce7",
                            color: "#16a34a",
                            mt: 0.5,
                          }}
                        />
                      </Stack>
                    </Box>

                    {index !== activityList.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default StudentSummaryPage;
