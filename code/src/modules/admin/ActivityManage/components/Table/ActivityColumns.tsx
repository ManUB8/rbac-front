import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { Box, Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import type { IuseActivityFetch, IuseMasterFunctionActivityFromFetch } from '../../hook/useFetchActivity';
import type { IActivityItem } from '../../interface/ActivityManage.interface';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatDateThai, formatTimeRange } from '../../../../../shared/components/Date-Time/DateAndTime';
import { Check_type } from '../../utils/activity_option';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

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
//  สถานะ =====
export function activeAvatar(status: boolean) {
    let bgcolor = "#8C8C8C";
    let letter = "";
    let textColor = "#000";
    switch (status) {
        case true: bgcolor = "successVariant80"; textColor = 'successVariant0'; letter = "เปิดใช้งาน"; break;
        case false: bgcolor = "errorTones.98"; textColor = "errorTones.40"; letter = "ปิดใช้งาน"; break;
    }

    return (
        <Box sx={{ backgroundColor: bgcolor, borderRadius: "4px", px: 2, py: 0.5 }}>
            <Typography sx={{ color: textColor }}>{letter}</Typography>
        </Box>
    );
}

const getCheckTypeLabel = (checkType: string) => {
    return Check_type.find((item) => item.id === checkType)?.label;
};

function RowActions({
    row,
    MasterActivity,
    MasterController
}: {
    row: IActivityItem;
    MasterActivity: IuseActivityFetch;
    MasterController: IuseMasterFunctionActivityFromFetch
}) {

    return (
        <>
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'center',  }}>
                <IconButton
                    onClick={() => MasterActivity.handleOpenEdit(row.activity_id)}
                    sx={{
                        color: 'primary.main'
                    }}
                >
                    <EditOutlinedIcon />
                </IconButton>

                <IconButton
                    onClick={() => MasterController.onClickDeleteMaster(row.activity_id)}
                    sx={{
                        color: "error.main",
                        "&:hover": {
                            bgcolor: "error.dark",
                        },
                    }}
                >
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Stack>
        </>
    );
}

// เปลี่ยนชื่อให้เป็น useMasterActivityColumns จะได้ตาม rule hook ด้วย
export function useMasterActivityColumns(MasterActivity: IuseActivityFetch, MasterController: IuseMasterFunctionActivityFromFetch): Column<IActivityItem>[] {

    return React.useMemo<Column<IActivityItem>[]>(() => [
        {
            id: "no",
            label: "ลำดับ",
            minWidth: 20,
            align: "left",
            render: (_row, index) => (
                <Typography variant="subtitle2">
                    {(MasterActivity.searchState.page - 1) *
                        MasterActivity.searchState.limit +
                        index +
                        1}
                </Typography>
            ),
        },
        {
            id: "activity_name",
            label: "รูปกิจกรรม",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "#f1f5f9",
                        borderRadius: 1,
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
            ),
        },
        {
            id: "activity_name",
            label: "ชื่อกิจกรรม",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.activity_name || "-"}</Typography>
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
            id: "start_time",
            label: "เวลา",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{formatTimeRange(row.start_time, row.end_time) || "-"}</Typography>
            ),
        },
        {
            id: "hours",
            label: "ชั่วโมง",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">
                    {row.hours ? `${row.hours} ชม.` : "-"}
                </Typography>
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
            id: "register_text",
            label: "จำนวนที่ลงทะเบียนแล้ว",
            minWidth: 180,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row.register_text || "-"}</Typography>
            ),
        },
        {
            id: "max_participants",
            label: "จำนวน",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row.max_participants || "-"}</Typography>
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
            id: "require_registration",
            label: "ลงทะเบียน",
            minWidth: 150,
            align: "left",
            render: (row) =>
                row.require_registration ? (
                    <Chip
                        label="ต้องลงทะเบียนก่อน"
                        size="small"
                        sx={{
                            bgcolor: "warning.main",
                            color: "#000",
                            fontWeight: 600,
                        }}
                    />
                ) : (
                    <Typography variant="subtitle2">{"—"}</Typography>
                ),
        },
        {
            id: "activity_status",
            label: "สถานะ",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Chip
                    label={row.activity_status ? "เปิด" : "ปิด"}
                    size="small"
                    sx={{
                        bgcolor: row.activity_status ? "success.main" : "grey.200",
                        color: row.activity_status ? "#fff" : "text.secondary",
                        fontWeight: 600,
                    }}
                />
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
                    MasterActivity={MasterActivity}
                    MasterController={MasterController}
                />
            ),
        },
    ], [MasterActivity, MasterController]);
}