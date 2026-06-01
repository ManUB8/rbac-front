import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import type { IStudentItem } from '../../interface/Student_Manage.interface';
import type { IuseMasterFunctionStudent } from '../../hook/useFetchStudent';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T) => React.ReactNode;
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

function RowActions({
    row,
    masterController
}: {
    row: IStudentItem;
    masterController: IuseMasterFunctionStudent
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton
                size="small"
                onClick={() => {
                    masterController.setSelectedStudentId(row.student_id);
                    masterController.setOpenStudentModal(true);
                }}
                sx={{
                    transition: "0.2s",
                    color: 'primary.main',
                    "&:hover": {
                        transform: "scale(1.08)",
                    },
                }}
            >
                <EditOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton
                size="small"
                onClick={() => {
                    masterController.setSelectedStudentId(row.student_id);
                    masterController.onClickDeleteMaster();
                }}
                sx={{
                    transition: "0.2s",
                    color: "error.main",
                    "&:hover": {
                        transform: "scale(1.08)",
                    },
                }}
            >
                <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
}

// เปลี่ยนชื่อให้เป็น useMasterStudentColumns จะได้ตาม rule hook ด้วย
export function useMasterStudentColumns(masterController: IuseMasterFunctionStudent): Column<IStudentItem>[] {
    const navigate = useNavigate();
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const setFlash = useSetAtom(flashAlertAtom);

    return React.useMemo<Column<IStudentItem>[]>(() => [
        {
            id: "student_code",
            label: "รหัสนิสิต",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.student_code || "-"}</Typography>
            ),
        },
        {
            id: "prefix",
            label: "คำนำหน้า",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.prefix || "-"}</Typography>
            ),
        },
        {
            id: "first_name",
            label: "ชื่อจริง",
            minWidth: 130,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.first_name || "-"}</Typography>
            ),
        },
        {
            id: "last_name",
            label: "นามสกุล",
            minWidth: 130,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.last_name || "-"}</Typography>
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
            minWidth: 240,
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
            id: "position_name",
            label: "ตำแหน่ง",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.position?.position_name || "-"}</Typography>
            ),

        },
        {
            id: "management",
            label: "",
            headerRender: () => <AddBoxOutlinedIcon />,
            minWidth: 80,
            align: "center",
            render: (row) => (
                <RowActions
                    row={row}
                    masterController={masterController}
                />
            ),
        },
    ], [navigate, setFlash, setConfirmPopup, masterController]);
}