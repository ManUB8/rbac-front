import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import type { IuseFetchMasterFunctionOrder } from '../../hook/useFetchMasterOrder';
import type { IOrderItem } from '../../interface/MasterOrder.interface';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { orderStatusColor, orderStatusText, paymentStatusColor, paymentStatusText } from '../../utils/order_option';
import { NumericFormat } from 'react-number-format';
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
    mastercontroller
}: {
    row: IOrderItem;
    mastercontroller: IuseFetchMasterFunctionOrder
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
                onClick={() => {
                    mastercontroller.handleOpenModal(row.order_id)
                }}
                sx={{
                    transition: "0.2s",
                    color: 'primary.main',
                    "&:hover": {
                        transform: "scale(1.08)",
                    },
                }}
            >
                <RemoveRedEyeOutlinedIcon fontSize="small" />
            </IconButton>
            {/* 
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
            </IconButton> */}
        </Stack>
    );
}

// เปลี่ยนชื่อให้เป็น useMasterOrderColumns จะได้ตาม rule hook ด้วย
export function useMasterOrderColumns(mastercontroller: IuseFetchMasterFunctionOrder): Column<IOrderItem>[] {
    const navigate = useNavigate();

    return React.useMemo<Column<IOrderItem>[]>(() => [
        {
            id: "order_no",
            label: "เลขออเดอร์",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.order_no || "-"}</Typography>
            ),
        },
        {
            id: "receiver_name",
            label: "นิสิต",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.receiver_name || "-"}</Typography>
            ),
        },
        {
            id: "receiver_phone",
            label: "เบอร์",
            minWidth: 100,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.receiver_phone || "-"}</Typography>
            ),
        },
        {
            id: "product_total_amount",
            label: "ยอดรวม",
            minWidth: 100,
            align: "right",
            render: (row) => (
                <NumericFormat
                    value={row?.product_total_amount}
                    displayType="text"
                    thousandSeparator
                    suffix=" ฿"
                    renderText={(value) => (
                        <Typography
                            variant="subtitle2"
                            sx={{
                                textAlign: "right",
                                fontWeight: 700,
                            }}
                        >
                            {value}
                        </Typography>
                    )}
                />
            ),
        },
        {
            id: "order_status",
            label: "สถานะออเดอร์",
            minWidth: 160,
            align: "left",
            render: (row) => (
                <Chip
                    size="small"
                    label={
                        orderStatusText[
                        row.order_status as keyof typeof orderStatusText
                        ] ?? "-"
                    }
                    color={
                        orderStatusColor[
                        row.order_status as keyof typeof orderStatusColor
                        ] ?? "default"
                    }
                    sx={{
                        fontWeight: 500,
                        minWidth: 120,
                    }}
                />
            ),
        },
        {
            id: "payment_status",
            label: "สถานะชำระเงิน",
            minWidth: 170,
            align: "left",
            render: (row) => (
                <Chip
                    size="small"
                    label={
                        paymentStatusText[
                        row.payment_status as keyof typeof paymentStatusText
                        ] ?? "-"
                    }
                    color={
                        paymentStatusColor[
                        row.payment_status as keyof typeof paymentStatusColor
                        ] ?? "default"
                    }
                    sx={{
                        fontWeight: 500,
                        minWidth: 140,
                    }}
                />
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
                    mastercontroller={mastercontroller}
                />
            ),
        },
    ], [navigate, mastercontroller]);
}