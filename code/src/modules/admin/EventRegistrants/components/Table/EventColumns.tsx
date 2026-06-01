import React from 'react';
import { Box, Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { formatDateThai, formatDateTimeThai } from '../../../../../shared/components/Date-Time/DateAndTime';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import type { IuseFetchEventRegistrants } from '../../hook/useFetchEventRegistrants';
import type { IEventRegistrantsItem, IStudentActivityJoinItem, IUpdateEventRegistrantsRequest } from '../../interface/EventRegistrants.interface';
import { Check_type } from '../../../ActivityManage/utils/activity_option';

// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T, index: number) => React.ReactNode;
}
// ===== Badge

const getCheckTypeLabel = (checkType: string) => {
    return Check_type.find((item) => item.id === checkType)?.label;
};

function RowActions({
    row,
    mastercontroller
}: {
    row: IStudentActivityJoinItem;
    mastercontroller: IuseFetchEventRegistrants
}) {

    return (
        <>
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'center', }}>
                <IconButton
                    onClick={() => {
                        const pdate: any = {
                            student_activity_id: row?.student_activity_id || 0,
                            activity_id: row?.activity_id || 0,
                            attendance_status: row?.check_detail.attendance_status || "เข้าร่วม",
                        };
                        mastercontroller.handleOpenEdit(pdate);
                    }}
                    sx={{
                        color: 'primary.main'
                    }}
                >
                    <EditOutlinedIcon />
                </IconButton>

                <IconButton
                    onClick={() => mastercontroller.onClickDeleteMaster(row.student_activity_id)}
                    sx={{
                        color: "error.main",
                    }}
                >
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Stack>
        </>
    );
}

// เปลี่ยนชื่อให้เป็น useMasterEventColumns จะได้ตาม rule hook ด้วย
export function useMasterEventColumns(mastercontroller: IuseFetchEventRegistrants): Column<IStudentActivityJoinItem>[] {

    return React.useMemo<Column<IStudentActivityJoinItem>[]>(() => [
        {
            id: "student_code",
            label: "รหัสนิสิต",
            minWidth: 80,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.student_code || "-"}</Typography>
            ),
        },
        {
            id: "full_name",
            label: "ชื่อจริง - นามสกุล",
            minWidth: 250,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.full_name || "-"}</Typography>
            ),
        },
        {
            id: "faculty_name",
            label: "คณะ",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.faculty_name || "-"}</Typography>
            ),
        },
        {
            id: "major_name",
            label: "สาขา",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.major_name || "-"}</Typography>
            ),
        },
        {
            id: "year_status",
            label: "ปี",
            minWidth: 80,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.year_status || "-"}</Typography>
            ),
        },
        {
            id: "activity_date",
            label: "วันที่",
            minWidth: 180,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{formatDateThai(row.activity_date) || ''}</Typography>
            ),
        },
        {
            id: "activity_time_text",
            label: "เวลา",
            minWidth: 140,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row.activity_time_text || "-"}</Typography>
            ),
        },

        {
            id: "location",
            label: "สถานที่",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row.location || "-"}</Typography>
            ),
        },
        {
            id: "checkin_at",
            label: "เช็คอิน",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Box>
                    <Typography variant="subtitle2">
                        {formatDateTimeThai(row.check_detail.checkin.checkin_at) || "-"}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color:
                                row.check_detail.checkin.checkin_status === "valid"
                                    ? "success.main"
                                    : "warning.main",
                            fontWeight: 600,
                        }}
                    >
                        {row.check_detail.checkin.checkin_status_text || "-"}
                    </Typography>
                </Box>
            ),
        },
        {
            id: "checkout_at",
            label: "เช็คเอาท์",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Box>
                    <Typography variant="subtitle2">
                        {formatDateTimeThai(row.check_detail.checkout.checkout_at) || "-"}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color:
                                row.check_detail.checkout.checkout_status === "valid"
                                    ? "success.main"
                                    : "error.main",
                            fontWeight: 600,
                        }}
                    >
                        {row.check_detail.checkout.checkout_status_text || "-"}
                    </Typography>
                </Box>
            ),
        },
        {
            id: "check_type",
            label: "ประเภท",
            minWidth: 180,
            align: "left",
            render: (row) =>
                row.check_type ? (
                    <Chip
                        label={getCheckTypeLabel(row.check_type)}
                        size="small"
                        sx={{
                            bgcolor:
                                row.check_type === "checkin_checkout"
                                    ? "primary.main"
                                    : "grey.200",
                            color:
                                row.check_type === "checkin_checkout"
                                    ? "#fff"
                                    : "text.primary",
                            fontWeight: 600,
                        }}
                    />
                ) : (
                    <Typography variant="subtitle2">{"—"}</Typography>
                ),
        },
        {
            id: "management",
            label: "",
            headerRender: () => <AddBoxOutlinedIcon />,
            minWidth: 60,
            align: "center",
            render: (row) => (
                <RowActions
                    row={row}
                    mastercontroller={mastercontroller}
                />
            ),
        },
    ], [mastercontroller]);
}