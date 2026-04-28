import React, { Activity, useState } from "react";
import {
    Box,
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
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { IuseActivityFetch, IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";
import { formatDateThai, formatTimeRange } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IActivityTableProps {
    MasterActivity: IuseActivityFetch
    MasterController: IuseMasterFunctionActivityFromFetch
};

const ActivityTable: React.FunctionComponent<IActivityTableProps> =  props => {
    return (
        <>

            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={600}>รายการกิจกรรมทั้งหมด</Typography>
                        </Stack>

                        <Typography>{props.MasterActivity.total} กิจกรรม</Typography>
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
                                {props.MasterActivity.activity_data.map((row, index) => (
                                    <TableRow key={row.activity_id} hover>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>
                                            <Box
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    bgcolor: "#f1f5f9",
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    alignactivitys: "center",
                                                    justifyContent: "center",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {row.activity_img ? (
                                                    <Box
                                                        component="img"
                                                        src={row.activity_img}
                                                        alt={row.activity_name}
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
                                                {row.activity_name}
                                            </Typography>
                                            <Typography fontSize={13} color="text.secondary">
                                                {row.description}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>{formatDateThai(row.activity_date)}</TableCell>
                                        <TableCell>
                                            {formatTimeRange(row.start_time, row.end_time)}
                                        </TableCell>
                                        <TableCell>{row.hours} ชม.</TableCell>

                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <LocationOnOutlinedIcon fontSize="small" />
                                                <Typography fontSize={13}>{row.location}</Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                justifyContent="center"
                                            >
                                                <IconButton onClick={() => props.MasterActivity.handleOpenEdit(row.activity_id)}>
                                                    <EditOutlinedIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => props.MasterController.onClickDeleteMaster(row.activity_id)}
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

                                {props.MasterActivity.activity_data.length === 0 && (
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