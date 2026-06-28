import React from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import type { IuseFetcOrderStudentFrom } from "../../../hook/useFetchOrderShop";

interface Props {
    controller: IuseFetcOrderStudentFrom;
}

const DetailOrderShop: React.FC<Props> = ({ controller }) => {
    const order = controller.order_date;
    if (!order) return null;

    const isShipping = order.delivery_type === "shipping";

    return (
        <Card
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1.5 }}>
                ข้อมูลการจัดส่ง
            </Typography>

            <Stack spacing={1}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    {isShipping ? (
                        <LocalShippingOutlinedIcon color="primary" fontSize="small" />
                    ) : (
                        <StorefrontOutlinedIcon color="primary" fontSize="small" />
                    )}

                    <Typography>
                        วิธีรับ: {isShipping ? "จัดส่ง" : "รับเอง"}
                    </Typography>
                </Stack>

                <Typography>
                    ผู้รับ: {order.receiver_name || "-"}
                </Typography>

                <Typography>
                    เบอร์: {order.receiver_phone || "-"}
                </Typography>

                <Typography>
                    {isShipping ? "ที่อยู่" : "จุดนัดรับ"}:{" "}
                    {order.shipping_address || "-"}
                </Typography>

                {order.pickup_code && (
                    <Typography sx={{ fontWeight: 800, color: "primary.main" }}>
                        รหัสรับสินค้า: {order.pickup_code}
                    </Typography>
                )}

                {isShipping && (
                    <>
                        <Divider />

                        <Typography>
                            ขนส่ง: {order.carrier || "-"}
                        </Typography>

                        <Typography>
                            Tracking: {order.tracking_no || "-"}
                        </Typography>
                    </>
                )}
            </Stack>

            {order.order_status === "pending_payment" && (
                <>
                    <Divider sx={{ my: 2 }} />

                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={() => {
                            controller.handleCancelOrder?.("ยกเลิกโดยนิสิต");
                        }}
                    >
                        ยกเลิกคำสั่งซื้อ
                    </Button>
                </>
            )}
        </Card>
    );
};

export default DetailOrderShop;