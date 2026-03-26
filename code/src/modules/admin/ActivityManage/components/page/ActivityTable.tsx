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
import type { IuseActivityFetch } from "../../hook/useFetchActivity";
import { formatDateThai, formatTimeRange } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IActivityTableProps {
    master: IuseActivityFetch
};

const ActivityTable: React.FunctionComponent<IActivityTableProps> = ({
    master
}) => {
    return (
        <>

            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={600}>รายการกิจกรรมทั้งหมด</Typography>
                        </Stack>

                        <Typography>{master.total} กิจกรรม</Typography>
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
                                {master.activity_data.map((item, index) => (
                                    <TableRow key={item.activity_id} hover>
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
                                                {item.activity_img ? (
                                                    <Box
                                                        component="img"
                                                        src={item.activity_img}
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
                                                <IconButton onClick={() => master.handleOpenEdit(item.activity_id)}>
                                                    <EditOutlinedIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => master.handleDelete(item.activity_id)}
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

                                {master.activity_data.length === 0 && (
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
        </>
    )
};

export default ActivityTable;