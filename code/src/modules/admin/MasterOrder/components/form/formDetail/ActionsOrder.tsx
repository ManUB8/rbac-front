import React from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

import type { IuseFetcOrderFrom } from "../../../hook/useFetchMasterOrder";

interface Props {
    controller: IuseFetcOrderFrom;
}

const ActionsOrder: React.FC<Props> = ({ controller }) => {
    const order = controller.watch();

    const [carrier, setCarrier] = React.useState(order?.carrier || "");
    const [trackingNo, setTrackingNo] = React.useState(order?.tracking_no || "");

    React.useEffect(() => {
        setCarrier(order?.carrier || "");
        setTrackingNo(order?.tracking_no || "");
    }, [order?.order_id]);

    const isShipping = order?.delivery_type === "shipping";

    const handleConfirmPayment = () => {
        controller.handleConfirmPayment();
    };

    const handleRejectPayment = () => {
        controller.handleRejectPayment("สลิปไม่ผ่านการตรวจสอบ");
    };

    const handlePreparing = () => {
        controller.handleChangeOrderStatus("preparing");
    };

    const handleReadyForPickup = () => {
        controller.handleChangeOrderStatus("ready_for_pickup");
    };

    const handleShipping = () => {
        controller.handleShipping(carrier, trackingNo);
    };

    const handleCompleted = () => {
        controller.handleChangeOrderStatus("completed");
    };

    const handleCancelOrder = () => {
        controller.handleCancelOrder("ยกเลิกโดยผู้ดูแลระบบ");
    };

    const renderAction = () => {
        if (order?.order_status === "cancelled") {
            return (
                <Typography sx={{ fontWeight: 700, color: 'error' }}>
                    ออเดอร์นี้ถูกยกเลิกแล้ว
                </Typography>
            );
        }

        if (order?.order_status === "completed") {
            return (
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<DoneAllOutlinedIcon />}
                    disabled
                >
                    สำเร็จแล้ว
                </Button>
            );
        }

        if (
            order?.payment_status === "pending_verification" &&
            order?.order_status === "pending_payment"
        ) {
            return (
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleOutlineOutlinedIcon />}
                        onClick={handleConfirmPayment}
                    >
                        ยืนยันการชำระ
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={handleRejectPayment}
                    >
                        ปฏิเสธสลิป
                    </Button>
                </Stack>
            );
        }

        if (
            order?.payment_status === "paid" &&
            order?.order_status === "paid"
        ) {
            return (
                <Button
                    variant="outlined"
                    startIcon={<Inventory2OutlinedIcon />}
                    onClick={handlePreparing}
                >
                    กำลังเตรียมสินค้า
                </Button>
            );
        }

        if (order?.order_status === "preparing") {
            if (isShipping) {
                return (
                    <Stack spacing={1.5}>
                        <TextField
                            label="บริษัทขนส่ง"
                            fullWidth
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                        />

                        <TextField
                            label="เลข Tracking"
                            fullWidth
                            value={trackingNo}
                            onChange={(e) => setTrackingNo(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            startIcon={<LocalShippingOutlinedIcon />}
                            disabled={!carrier.trim() || !trackingNo.trim()}
                            onClick={handleShipping}
                        >
                            บันทึกขนส่ง
                        </Button>
                    </Stack>
                );
            }

            return (
                <Button
                    variant="contained"
                    startIcon={<StorefrontOutlinedIcon />}
                    onClick={handleReadyForPickup}
                >
                    พร้อมรับสินค้า
                </Button>
            );
        }

        if (order?.order_status === "ready_for_pickup") {
            return (
                <Stack spacing={1}>
                    <Typography color="text.secondary">
                        รหัสรับสินค้า
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: "primary.main",
                        }}
                    >
                        {order?.pickup_code || "-"}
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<DoneAllOutlinedIcon />}
                        onClick={handleCompleted}
                    >
                        ยืนยันรับสินค้าแล้ว
                    </Button>
                </Stack>
            );
        }

        if (order?.order_status === "shipping") {
            return (
                <Stack spacing={1}>
                    <Typography color="text.secondary">ขนส่ง</Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                        {order?.carrier || "-"}
                    </Typography>

                    <Typography color="text.secondary">Tracking No.</Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                        {order?.tracking_no || "-"}
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<DoneAllOutlinedIcon />}
                        onClick={handleCompleted}
                    >
                        จัดส่งสำเร็จ
                    </Button>
                </Stack>
            );
        }

        return (
            <Typography color="text.secondary">
                ยังไม่มี Action สำหรับสถานะนี้
            </Typography>
        );
    };

    return (
        <Card
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography sx={{ fontWeight: 800, fontSize: 20, mb: 2 }}>
                จัดการคำสั่งซื้อ
            </Typography>

            {renderAction()}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    color="error"
                    startIcon={<CancelOutlinedIcon />}
                    onClick={handleCancelOrder}
                    disabled={
                        order?.order_status === "completed" ||
                        order?.order_status === "cancelled"
                    }
                >
                    ยกเลิกออเดอร์
                </Button>
            </Box>
        </Card>
    );
};

export default ActionsOrder;