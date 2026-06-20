import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import type { ICategoryItem } from '../../interface/MasterCategories.interface';
import type { IuseFetchMasterCategoryList } from '../../hook/useFetchMasterCategories';

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
    row: ICategoryItem;
    masterController: IuseFetchMasterCategoryList
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
                    masterController.setSelectedId(row);
                    masterController.setopenViewPage(true);
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
                    // masterController.setSelectedStudentId(row.student_id);
                    // masterController.onClickDeleteMaster();
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

// เปลี่ยนชื่อให้เป็น useMasterCategoryColumns จะได้ตาม rule hook ด้วย
export function useMasterCategoryColumns(masterController: IuseFetchMasterCategoryList): Column<ICategoryItem>[] {
    const navigate = useNavigate();

    return React.useMemo<Column<ICategoryItem>[]>(() => [
        {
            id: "category_name",
            label: "ชื่อหมวดหมู่",
            minWidth: 120,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.category_name || "-"}</Typography>
            ),
        },
        {
            id: "is_active",
            label: "สถานะ",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{activeAvatar(row?.is_active) || "-"}</Typography>
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
    ], [navigate, masterController]);
}