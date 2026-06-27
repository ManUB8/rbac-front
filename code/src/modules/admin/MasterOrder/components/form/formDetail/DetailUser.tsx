import React from "react";
import {
    Box,
    Card,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import type { IuseFetcOrderFrom } from "../../../hook/useFetchMasterOrder";

import {
    orderStatusText,
    paymentStatusText,
    orderStatusColor,
    paymentStatusColor,
} from "../../../utils/order_option";

interface Props {
    controller: IuseFetcOrderFrom;
}

const formatPrice = (value?: string | number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

const formatDateTime = (timestamp?: number) => {
    if (!timestamp) return "-";

    return new Date(timestamp * 1000).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const DetailUser: React.FC<Props> = ({ controller }) => {
    const order = controller.watch();

    const isShipping = order?.delivery_type === "shipping";

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
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <PersonOutlineOutlinedIcon color="primary" />

                <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                    ข้อมูลคำสั่งซื้อ
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
                <Chip
                    size="small"
                    variant="outlined"
                    color={
                        orderStatusColor[
                            order?.order_status as keyof typeof orderStatusColor
                        ] ?? "default"
                    }
                    label={
                        orderStatusText[
                            order?.order_status as keyof typeof orderStatusText
                        ] ?? "-"
                    }
                />

                <Chip
                    size="small"
                    variant="outlined"
                    color={
                        paymentStatusColor[
                            order?.payment_status as keyof typeof paymentStatusColor
                        ] ?? "default"
                    }
                    label={
                        paymentStatusText[
                            order?.payment_status as keyof typeof paymentStatusText
                        ] ?? "-"
                    }
                />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={1.5}>
                <Grid size={6}>
                    <Typography color="text.secondary">นิสิต</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                        {order?.student_id || "-"}
                    </Typography>
                </Grid>

                <Grid size={6}>
                    <Typography color="text.secondary">วันที่</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                        {formatDateTime(order?.created_at)}
                    </Typography>
                </Grid>

                <Grid size={6}>
                    <Typography color="text.secondary">วิธีรับสินค้า</Typography>

                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        {isShipping ? (
                            <LocalShippingOutlinedIcon
                                color="primary"
                                fontSize="small"
                            />
                        ) : (
                            <StorefrontOutlinedIcon
                                color="primary"
                                fontSize="small"
                            />
                        )}

                        <Typography sx={{ fontWeight: 700 }}>
                            {isShipping ? "จัดส่ง" : "รับเอง"}
                        </Typography>
                    </Stack>
                </Grid>

                <Grid size={6}>
                    <Typography color="text.secondary">ยอดรวม</Typography>
                    <Typography sx={{ fontWeight: 800 }}>
                        ฿{formatPrice(order?.total_amount)}
                    </Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography color="text.secondary">ผู้รับ</Typography>

                <Typography sx={{ fontWeight: 700 }}>
                    {order?.receiver_name || "-"}
                </Typography>

                <Typography>
                    {order?.receiver_phone || "-"}
                </Typography>

                <Typography sx={{ mt: 1 }} color="text.secondary">
                    {isShipping ? "ที่อยู่จัดส่ง" : "จุดนัดรับ"}
                </Typography>

                <Typography>
                    {order?.shipping_address || "-"}
                </Typography>
            </Box>
        </Card>
    );
};

export default DetailUser;