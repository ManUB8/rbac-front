import React from "react";
import {
    Card,
    Radio,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { ICheckoutSummaryData } from "../../../order/interface/OrderShop.interface";

interface Props {
    summary: ICheckoutSummaryData;
    receiverName: string;
    setReceiverName: (v: string) => void;
    receiverPhone: string;
    setReceiverPhone: (v: string) => void;
    shippingAddress: string;
    setShippingAddress: (v: string) => void;
    note: string;
    setNote: (v: string) => void;
}

const PaymentReceiverSection: React.FC<Props> = ({
    summary,
    receiverName,
    setReceiverName,
    receiverPhone,
    setReceiverPhone,
    shippingAddress,
    setShippingAddress,
    note,
    setNote,
}) => {
    const isShipping = summary.delivery_type === "shipping";
    const isPickup = summary.delivery_type === "pickup";

    return (
        <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 26, fontWeight: 900, mb: 2 }}>
                วิธีรับสินค้า
            </Typography>

            <Stack spacing={1}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Radio checked={isShipping} />
                    <Typography sx={{ fontSize: 20 }}>
                        จัดส่งสินค้าตามที่อยู่
                    </Typography>
                </Stack>

                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Radio checked={isPickup} />
                    <Typography sx={{ fontSize: 20 }}>
                        รับเองที่จุดนัดรับ
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 2 }}>
                <TextField
                    label="ชื่อผู้รับ *"
                    fullWidth
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                />

                <TextField
                    label="เบอร์โทรติดต่อ *"
                    placeholder="08x-xxx-xxxx"
                    fullWidth
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                />
            </Stack>

            <TextField
                label={
                    isShipping
                        ? "ที่อยู่ / สถานที่จัดส่ง *"
                        : "จุดนัดรับภายในมหาวิทยาลัย *"
                }
                placeholder={
                    isShipping
                        ? "เช่น อาคาร A ชั้น 1 / หน้าคณะ / ห้องเรียน"
                        : "เช่น หน้าคณะ / โรงอาหาร / จุดนัดรับของร้าน"
                }
                fullWidth
                sx={{ mt: 2 }}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
            />

            <TextField
                label="หมายเหตุถึงผู้ขาย"
                fullWidth
                multiline
                minRows={4}
                sx={{ mt: 2 }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </Card>
    );
};

export default PaymentReceiverSection;