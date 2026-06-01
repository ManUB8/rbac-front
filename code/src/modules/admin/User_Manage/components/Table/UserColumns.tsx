import React from "react";
import {
    Box,
    IconButton,
    Stack,
    Switch,
    Tooltip,
    Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import type { IUser } from "../../interface/User_Manage.interface";
import type { IuseMasterFunctionUser } from "../../hook/useFetchUser";

export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T) => React.ReactNode;
}

export function useMasterUserColumns(
    masterController: IuseMasterFunctionUser
): Column<IUser>[] {
    const [visiblePasswordIds, setVisiblePasswordIds] = React.useState<number[]>([]);

    return React.useMemo<Column<IUser>[]>(
        () => [
            {
                id: "username",
                label: "Username",
                minWidth: 120,
                align: "left",

                render: (row) => (
                    <Typography variant="subtitle2">
                        {row?.username || "-"}
                    </Typography>
                ),
            },

            {
                id: "name",
                label: "ชื่อ",
                minWidth: 180,
                align: "left",

                render: (row) => (
                    <Typography variant="subtitle2">
                        {row?.name || "-"}
                    </Typography>
                ),
            },

            {
                id: "role",
                label: "Role",
                minWidth: 140,
                align: "left",

                render: (row) => (
                    <Typography
                        variant="subtitle2"
                        sx={{
                            textTransform: "capitalize",
                        }}
                    >
                        {row?.role || "-"}
                    </Typography>
                ),
            },

            {
                id: "is_active",
                label: "สถานะ",
                minWidth: 120,
                align: "left",

                render: (row) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {/* จุดไฟสถานะ */}
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: row.is_active
                                    ? "#22c55e"
                                    : "#9ca3af",

                                boxShadow: row.is_active
                                    ? "0 0 10px rgba(34,197,94,0.7)"
                                    : "0 0 8px rgba(156,163,175,0.5)",
                            }}
                        />

                        {/* text */}
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: row.is_active
                                    ? "#22c55e"
                                    : "#9ca3af",

                                fontWeight: 700,
                            }}
                        >
                            {row.is_active ? "Active" : "Inactive"}
                        </Typography>
                    </Box>
                ),
            },


            {
                id: "password",
                label: "รหัสผ่าน",
                minWidth: 180,
                align: "left",

                render: (row) => {
                    const isVisible = visiblePasswordIds.includes(row.user_id);

                    return (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ minWidth: 90 }}>
                                {isVisible ? row?.password || "-" : "••••••••"}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={() => {
                                    setVisiblePasswordIds((prev) =>
                                        prev.includes(row.user_id)
                                            ? prev.filter((id) => id !== row.user_id)
                                            : [...prev, row.user_id]
                                    );
                                }}
                            >
                                {isVisible ? (
                                    <VisibilityOff fontSize="small" />
                                ) : (
                                    <Visibility fontSize="small" />
                                )}
                            </IconButton>
                        </Box>
                    );
                },
            },
            {
                id: "management",
                label: "จัดการ",
                minWidth: 120,
                align: "center",

                render: (row) => (
                    <Stack
                        component="div"
                        direction="row"
                        spacing={1.2}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="แก้ไข">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    masterController.setSelectedUserId(
                                        row.user_id
                                    );

                                    masterController.setOpenUserModal(
                                        true
                                    );
                                }}
                                sx={{
                                    transition: "0.2s",
                                    color: "primary.main",

                                    "&:hover": {
                                        transform: "scale(1.08)",
                                    },
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="ลบ">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    masterController.onClickDeleteMaster(
                                        row.user_id
                                    );
                                }}
                                sx={{
                                    transition: "0.2s",
                                    color: "error.main",

                                    "&:hover": {
                                        transform: "scale(1.08)",
                                    },
                                }}
                            >
                                <DeleteForeverOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ),
            },
        ],
        [masterController, visiblePasswordIds]
    );
}