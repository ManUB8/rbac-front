import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ActivityModal, { type IActivityFormData } from "./ActivityModal";

export interface IActivityManagePageProps {}

interface IActivityItem {
  id: number;
  activity_name: string;
  activity_date: string;
  hours: string;
  start_time: string;
  end_time: string;
  location: string;
  image_url: string;
  description: string;
}

const initialFormData: IActivityFormData = {
  activity_name: "",
  activity_date: "",
  hours: "",
  start_time: "",
  end_time: "",
  location: "",
  image_url: "",
  description: "",
};

const initialActivityList: IActivityItem[] = [
  {
    id: 1,
    activity_name: "ปฐมนิเทศนักศึกษาใหม่ 2568",
    activity_date: "2025-11-01",
    start_time: "09:00",
    end_time: "12:00",
    hours: "3",
    location: "หอประชุมใหญ่ ชั้น 5 อาคาร A",
    image_url: "",
    description: "กิจกรรมแนะนำมหาวิทยาลัยและคณะสำหรับนักศึกษาใหม่",
  },
  {
    id: 2,
    activity_name: "กีฬาสีภายใน 2568",
    activity_date: "2025-12-15",
    start_time: "08:00",
    end_time: "17:00",
    hours: "9",
    location: "สนามกีฬากลาง",
    image_url: "",
    description: "การแข่งขันกีฬาสีประจำปีระหว่างคณะต่างๆ",
  },
  {
    id: 3,
    activity_name: "บริจาคโลหิต",
    activity_date: "2026-01-20",
    start_time: "10:00",
    end_time: "15:00",
    hours: "5",
    location: "ลานอเนกประสงค์ อาคาร B",
    image_url: "",
    description: "กิจกรรมบริจาคโลหิตร่วมกับสภากาชาดไทย",
  },
];

const formatDateThai = (dateString: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTimeRange = (start: string, end: string) => {
  if (!start || !end) return "-";
  return `${start} - ${end}`;
};

const ActivityManagePage: React.FunctionComponent<IActivityManagePageProps> = () => {
  const [open, setOpen] = useState(false);
  const [activityList, setActivityList] =
    useState<IActivityItem[]>(initialActivityList);
  const [formData, setFormData] = useState<IActivityFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setOpen(true);
  };

  const handleOpenEdit = (item: IActivityItem) => {
    setEditingId(item.id);
    setFormData({
      activity_name: item.activity_name,
      activity_date: item.activity_date,
      hours: item.hours,
      start_time: item.start_time,
      end_time: item.end_time,
      location: item.location,
      image_url: item.image_url,
      description: item.description,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleDelete = (id: number) => {
    setActivityList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitActivity = (data: IActivityFormData) => {
    if (editingId !== null) {
      setActivityList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                activity_name: data.activity_name,
                activity_date: data.activity_date,
                hours: data.hours,
                start_time: data.start_time,
                end_time: data.end_time,
                location: data.location,
                image_url: data.image_url,
                description: data.description,
              }
            : item,
        ),
      );
    } else {
      const newActivity: IActivityItem = {
        id: Date.now(),
        activity_name: data.activity_name,
        activity_date: data.activity_date,
        hours: data.hours,
        start_time: data.start_time,
        end_time: data.end_time,
        location: data.location,
        image_url: data.image_url,
        description: data.description,
      };

      setActivityList((prev) => [...prev, newActivity]);
    }

    handleClose();
  };

  return (
    <>
      <ActivityModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitActivity}
        mode={editingId !== null ? "edit" : "add"}
      />

      <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                จัดการกิจกรรม
              </Typography>
              <Typography color="text.secondary">
                เพิ่ม แก้ไข และลบกิจกรรมต่างๆ
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{
                borderRadius: "12px",
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                backgroundColor: "#020617",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#111827",
                  boxShadow: "none",
                },
              }}
            >
              เพิ่มกิจกรรม
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight={600}>รายการกิจกรรมทั้งหมด</Typography>
              </Stack>

              <Typography>{activityList.length} กิจกรรม</Typography>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับ</TableCell>
                    <TableCell>รูป</TableCell>
                    <TableCell>ชื่อกิจกรรม</TableCell>
                    <TableCell>วันที่</TableCell>
                    <TableCell>เวลา</TableCell>
                    <TableCell>ชั่วโมง</TableCell>
                    <TableCell>สถานที่</TableCell>
                    <TableCell align="center">จัดการ</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {activityList.map((item, index) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#f1f5f9",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          {item.image_url ? (
                            <Box
                              component="img"
                              src={item.image_url}
                              alt={item.activity_name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <CalendarTodayOutlinedIcon />
                          )}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={600}>
                          {item.activity_name}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          {item.description}
                        </Typography>
                      </TableCell>

                      <TableCell>{formatDateThai(item.activity_date)}</TableCell>
                      <TableCell>
                        {formatTimeRange(item.start_time, item.end_time)}
                      </TableCell>
                      <TableCell>{item.hours} ชม.</TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <LocationOnOutlinedIcon fontSize="small" />
                          <Typography fontSize={13}>{item.location}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <IconButton onClick={() => handleOpenEdit(item)}>
                            <EditOutlinedIcon />
                          </IconButton>

                          <IconButton
                            onClick={() => handleDelete(item.id)}
                            sx={{
                              bgcolor: "error.main",
                              color: "#fff",
                              "&:hover": {
                                bgcolor: "error.dark",
                              },
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  {activityList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography color="text.secondary">
                          ยังไม่มีกิจกรรม
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ActivityManagePage;