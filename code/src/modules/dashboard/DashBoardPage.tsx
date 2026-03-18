import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IDashBoardPageProps {}

interface IBranchStat {
  branch_name: string;
  count: number;
}

interface IFacultyDetail {
  faculty_name: string;
  branches: IBranchStat[];
}

interface IActivityDashboard {
  id: string;
  name: string;
  total_join_count: number;
  unique_student_count: number;
  total_activity_count: number;
  branch_chart: IBranchStat[];
  faculty_details: IFacultyDetail[];
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: IBranchStat;
    value: number;
    name: string;
  }>;
  label?: string;
}

const dashboardData: IActivityDashboard[] = [
  {
    id: "all",
    name: "ทุกกิจกรรม",
    total_join_count: 62,
    unique_student_count: 55,
    total_activity_count: 5,
    branch_chart: [
      { branch_name: "สาขาวิชาการตลาดดิจิทัล", count: 7 },
      { branch_name: "สาขาวิชาการจัดการธุรกิจและการเงิน", count: 6 },
      { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 5 },
      { branch_name: "สาขาวิชาคอมพิวเตอร์ธุรกิจ", count: 5 },
      { branch_name: "สาขาวิชาการจัดการโลจิสติกส์", count: 4 },
      { branch_name: "สาขาภาษาอังกฤษ", count: 4 },
      { branch_name: "สาขาวิชาธุรกิจการบิน", count: 4 },
      { branch_name: "สาขาศิลปะการแสดง", count: 4 },
      { branch_name: "สาขาวิชาการท่องเที่ยว", count: 4 },
      { branch_name: "สาขาวิชาการกีฬา", count: 3 },
      { branch_name: "พันธุศาสตร์พืชเศรษฐกิจ", count: 3 },
      { branch_name: "สาขาวิชาการออกแบบ", count: 3 },
      { branch_name: "สาขาภาษาจีนธุรกิจ", count: 3 },
      { branch_name: "สาขาวิชาธุรกิจการบิน", count: 3 },
      { branch_name: "สาขาวิชาเทคโนโลยีสารสนเทศ", count: 2 },
    ],
    faculty_details: [
      {
        faculty_name: "คณะการจัดการธุรกิจและการเงิน",
        branches: [
          { branch_name: "สาขาวิชาการตลาดดิจิทัล", count: 7 },
          { branch_name: "สาขาวิชาการจัดการธุรกิจเกมและอีสปอร์ต", count: 5 },
          { branch_name: "สาขาวิชาการจัดการองค์กรธุรกิจสมัยใหม่", count: 4 },
          {
            branch_name: "สาขาวิชาเทคโนโลยีสารสนเทศเพื่อการจัดการธุรกิจ",
            count: 2,
          },
        ],
      },
      {
        faculty_name: "คณะอุตสาหกรรมบริการ",
        branches: [
          { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 6 },
          {
            branch_name: "สาขาวิชาธุรกิจการท่องเที่ยว การโรงแรมและอีเว้นท์",
            count: 4,
          },
          { branch_name: "สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน", count: 3 },
          { branch_name: "สาขาวิชาธุรกิจการบิน", count: 3 },
        ],
      },
      {
        faculty_name: "คณะอุตสาหกรรมสร้างสรรค์",
        branches: [
          {
            branch_name: "สาขาวิชาอุตสาหกรรมบันเทิงสร้างสรรค์",
            count: 5,
          },
        ],
      },
    ],
  },
  {
    id: "orientation",
    name: "ปฐมนิเทศนิสิตใหม่",
    total_join_count: 20,
    unique_student_count: 20,
    total_activity_count: 1,
    branch_chart: [
      { branch_name: "สาขาวิชาการตลาดดิจิทัล", count: 4 },
      { branch_name: "สาขาวิชาการจัดการธุรกิจและการเงิน", count: 3 },
      { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 3 },
      { branch_name: "สาขาวิชาคอมพิวเตอร์ธุรกิจ", count: 3 },
      { branch_name: "สาขาวิชาการจัดการโลจิสติกส์", count: 2 },
      { branch_name: "สาขาภาษาอังกฤษ", count: 2 },
      { branch_name: "สาขาวิชาธุรกิจการบิน", count: 2 },
      { branch_name: "สาขาวิชาเทคโนโลยีสารสนเทศ", count: 1 },
    ],
    faculty_details: [
      {
        faculty_name: "คณะการจัดการธุรกิจและการเงิน",
        branches: [
          { branch_name: "สาขาวิชาการตลาดดิจิทัล", count: 4 },
          { branch_name: "สาขาวิชาการจัดการธุรกิจเกมและอีสปอร์ต", count: 3 },
          { branch_name: "สาขาวิชาการจัดการองค์กรธุรกิจสมัยใหม่", count: 2 },
        ],
      },
      {
        faculty_name: "คณะอุตสาหกรรมบริการ",
        branches: [
          { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 3 },
          { branch_name: "สาขาวิชาธุรกิจการบิน", count: 2 },
        ],
      },
    ],
  },
  {
    id: "sport",
    name: "การแข่งขันกีฬาภายใน",
    total_join_count: 25,
    unique_student_count: 22,
    total_activity_count: 1,
    branch_chart: [
      { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 6 },
      { branch_name: "สาขาวิชาธุรกิจการบิน", count: 4 },
      { branch_name: "สาขาวิชาการตลาดดิจิทัล", count: 4 },
      { branch_name: "สาขาวิชาการจัดการโลจิสติกส์", count: 3 },
      { branch_name: "สาขาภาษาจีนธุรกิจ", count: 3 },
      { branch_name: "สาขาวิชาการกีฬา", count: 3 },
      { branch_name: "สาขาภาษาอังกฤษ", count: 2 },
    ],
    faculty_details: [
      {
        faculty_name: "คณะอุตสาหกรรมบริการ",
        branches: [
          { branch_name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ", count: 6 },
          { branch_name: "สาขาวิชาธุรกิจการบิน", count: 4 },
          { branch_name: "สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน", count: 3 },
        ],
      },
    ],
  },
];

const chartColors = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
  "#eab308",
  "#22c55e",
  "#f43f5e",
];

const summaryCardSx = {
  borderRadius: "18px",
  border: "1px solid #dbe3ef",
  minHeight: 148,
  boxShadow: "none",
};

const CustomTooltip: React.FC<ICustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload;

  if (!data) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #dbe3ef",
        borderRadius: "12px",
        px: 1.5,
        py: 1.2,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
        minWidth: 220,
        pointerEvents: "none",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: "#0f172a",
          mb: 0.5,
          fontSize: 14,
        }}
      >
        {data.branch_name}
      </Typography>

      <Typography sx={{ color: "#334155", fontSize: 14 }}>
        จำนวนนิสิตที่เข้าร่วม{" "}
        <Box component="span" sx={{ fontWeight: 800, color: "#2563eb" }}>
          {data.count} คน
        </Box>
      </Typography>
    </Box>
  );
};

const DashBoardPage: React.FunctionComponent<IDashBoardPageProps> = () => {
  const [selectedActivity, setSelectedActivity] = useState("all");

  const currentData = useMemo(() => {
    return (
      dashboardData.find((item) => item.id === selectedActivity) ||
      dashboardData[0]
    );
  }, [selectedActivity]);

  const handleChangeActivity = (event: SelectChangeEvent) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <>
      <Box p={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">หน้าสรุปข้อมูล</Typography>
            <Typography sx={{ mt: 1 }}>Dashboard page</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f3f6fb",
          py: 2.5,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ px: { xs: 1, md: 2 } }}>
            <Stack spacing={2.5}>
              <Box sx={{ maxWidth: 384 }}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                  เลือกกิจกรรม
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedActivity}
                    onChange={handleChangeActivity}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#dbe3ef",
                      },
                    }}
                  >
                    {dashboardData.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Card sx={{ ...summaryCardSx, flex: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          sx={{ color: "#0f172a", fontWeight: 700, mb: 4 }}
                        >
                          จำนวนการเข้าร่วมทั้งหมด
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 40,
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1,
                          }}
                        >
                          {currentData.total_join_count}
                        </Typography>
                        <Typography sx={{ color: "#334155", mt: 0.5 }}>
                          ครั้ง
                        </Typography>
                      </Box>
                      <TrendingUpOutlinedIcon sx={{ color: "#2563eb" }} />
                    </Stack>
                  </CardContent>
                </Card>

                <Card sx={{ ...summaryCardSx, flex: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          sx={{ color: "#0f172a", fontWeight: 700, mb: 4 }}
                        >
                          นิสิตที่เข้าร่วม
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 40,
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1,
                          }}
                        >
                          {currentData.unique_student_count}
                        </Typography>
                        <Typography sx={{ color: "#334155", mt: 0.5 }}>
                          คน (ไม่ซ้ำ)
                        </Typography>
                      </Box>
                      <Groups2OutlinedIcon sx={{ color: "#16a34a" }} />
                    </Stack>
                  </CardContent>
                </Card>

                <Card sx={{ ...summaryCardSx, flex: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          sx={{ color: "#0f172a", fontWeight: 700, mb: 4 }}
                        >
                          กิจกรรมทั้งหมด
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 40,
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1,
                          }}
                        >
                          {currentData.total_activity_count}
                        </Typography>
                        <Typography sx={{ color: "#334155", mt: 0.5 }}>
                          กิจกรรม
                        </Typography>
                      </Box>
                      <CalendarMonthOutlinedIcon sx={{ color: "#a855f7" }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>

              <Card
                sx={{
                  borderRadius: "18px",
                  border: "1px solid #dbe3ef",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <BarChartOutlinedIcon sx={{ color: "#2563eb" }} />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                        fontSize: 22,
                      }}
                    >
                      จำนวนนิสิตที่เข้าร่วมแต่ละสาขา
                    </Typography>
                  </Stack>

                  <Box sx={{ width: "100%", height: 420 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={currentData.branch_chart}
                        margin={{ top: 10, right: 20, left: 0, bottom: 70 }}
                        accessibilityLayer={false}
                      >
                        <CartesianGrid strokeDasharray="4 4" vertical />
                        <XAxis
                          dataKey="branch_name"
                          angle={-40}
                          textAnchor="end"
                          interval={0}
                          height={90}
                          tick={{ fontSize: 12, fill: "#475569" }}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fill: "#475569" }}
                        />
                        <Tooltip
                          trigger="hover"
                          shared={false}
                          cursor={false}
                          content={<CustomTooltip />}
                        />
                        <Legend />
                        <Bar
                          dataKey="count"
                          name="จำนวนนิสิต"
                          radius={[8, 8, 0, 0]}
                          isAnimationActive={false}
                        >
                          {currentData.branch_chart.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={chartColors[index % chartColors.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>

              <Box>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#0f172a",
                    mb: 2,
                  }}
                >
                  รายละเอียดแยกตามคณะ
                </Typography>

                <Stack spacing={2.5}>
                  {currentData.faculty_details.map((faculty) => (
                    <Card
                      key={faculty.faculty_name}
                      sx={{
                        borderRadius: "18px",
                        border: "1px solid #dbe3ef",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#0f172a",
                            mb: 3,
                          }}
                        >
                          {faculty.faculty_name}
                        </Typography>

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "1fr",
                              md: "repeat(3, minmax(0, 1fr))",
                            },
                            gap: 1.8,
                          }}
                        >
                          {faculty.branches.map((branch) => (
                            <Box
                              key={branch.branch_name}
                              sx={{
                                borderRadius: "12px",
                                backgroundColor: "#f8fafc",
                                px: 2,
                                py: 1.8,
                                border: "1px solid #edf2f7",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                minHeight: 52,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#334155",
                                  fontSize: 15,
                                }}
                              >
                                {branch.branch_name}
                              </Typography>

                              <Typography
                                sx={{
                                  color: "#2563eb",
                                  fontSize: 30,
                                  fontWeight: 800,
                                  lineHeight: 1,
                                  minWidth: "fit-content",
                                }}
                              >
                                {branch.count}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DashBoardPage;
