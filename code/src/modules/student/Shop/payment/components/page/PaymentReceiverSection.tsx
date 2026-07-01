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
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography sx={{ fontSize: { xs: 17, sm: 18 }, fontWeight: 900, mb: { xs: 1.25, sm: 2 } }}>
                วิธีรับสินค้า
            </Typography>

            <Stack spacing={{ xs: 0.5, sm: 1 }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Radio checked={isShipping} size="small" />
                    <Typography sx={{ fontSize: { xs: 13.5, sm: 16 } }}>
                        จัดส่งสินค้าตามที่อยู่
                    </Typography>
                </Stack>

                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Radio checked={isPickup} size="small" />
                    <Typography sx={{ fontSize: { xs: 13.5, sm: 16 } }}>
                        รับเองที่จุดนัดรับ
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: { xs: 1.5, sm: 2 } }}>
                <TextField
                    label="ชื่อผู้รับ *"
                    fullWidth
                    value={receiverName}
                // onChange={(e) => setReceiverName(e.target.value)}
                />

                <TextField
                    label="เบอร์โทรติดต่อ *"
                    placeholder="08xxxxxxxx"
                    fullWidth
                    value={receiverPhone}
                    error={receiverPhone.length > 0 && receiverPhone.length !== 10}
                    helperText={
                        receiverPhone.length > 0 && receiverPhone.length !== 10
                            ? "กรุณากรอกเบอร์โทร 10 หลัก"
                            : ""
                    }
                    slotProps={{
                        htmlInput: {
                            maxLength: 10,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        },
                    }}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setReceiverPhone(value);
                    }}
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
                sx={{ mt: { xs: 1.5, sm: 2 } }}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
            />

            <TextField
                label="หมายเหตุถึงผู้ขาย"
                fullWidth
                multiline
                minRows={3}
                sx={{ mt: { xs: 1.5, sm: 2 } }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </Card>
    );
};

export default PaymentReceiverSection;
