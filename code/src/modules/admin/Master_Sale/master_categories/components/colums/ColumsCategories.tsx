import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import type { ICategoryItem } from "../../interface/MasterCategories.interface";
import type { IuseFetchMasterCategoryList } from "../../hook/useFetchMasterCategories";

export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T) => React.ReactNode;
}

export function activeAvatar(status: boolean) {
    const bgcolor = status ? "successVariant80" : "errorTones.98";
    const textColor = status ? "successVariant0" : "errorTones.40";
    const letter = status ? "เปิดใช้งาน" : "ปิดใช้งาน";

    return (
        <Box sx={{ backgroundColor: bgcolor, borderRadius: "4px", px: 2, py: 0.5 }}>
            <Typography sx={{ color: textColor }}>{letter}</Typography>
        </Box>
    );
}

function RowActions({
    row,
    masterController,
}: {
    row: ICategoryItem;
    masterController: IuseFetchMasterCategoryList;
}) {
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
                onClick={() => masterController.handleEdit(row)}
                sx={{
                    transition: "0.2s",
                    color: "primary.main",
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
                    masterController.setSelectedId(row);
                    masterController.onClickDeleteMaster(row.category_id);
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

export function useMasterCategoryColumns(
    masterController: IuseFetchMasterCategoryList
): Column<ICategoryItem>[] {
    return React.useMemo<Column<ICategoryItem>[]>(
        () => [
            {
                id: "category_name",
                label: "ชื่อหมวดหมู่",
                minWidth: 120,
                align: "left",
                render: (row) => (
                    <Typography variant="subtitle2">
                        {row?.category_name || "-"}
                    </Typography>
                ),
            },
            {
                id: "is_active",
                label: "สถานะ",
                minWidth: 100,
                align: "left",
                render: (row) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: row.is_active ? "#22c55e" : "#9ca3af",
                                boxShadow: row.is_active
                                    ? "0 0 10px rgba(34,197,94,0.7)"
                                    : "0 0 8px rgba(156,163,175,0.5)",
                            }}
                        />

                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: row.is_active ? "#22c55e" : "#e5312b",
                                fontWeight: 700,
                            }}
                        >
                            {row.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </Typography>
                    </Box>
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
        ],
        [masterController]
    );
}