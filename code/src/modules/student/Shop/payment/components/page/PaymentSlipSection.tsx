import React from "react";
import {
    Button,
    Card,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { ImageUploader } from "../../../../../../shared/components/UploadImg/ImageUploader";


interface Props {
    slipUrl: string;
    setSlipUrl: (v: string) => void;
    onBack: () => void;
    onConfirm: () => void;
    canConfirm: boolean;
}

const PaymentSlipSection: React.FC<Props> = ({
    slipUrl,
    setSlipUrl,
    onBack,
    onConfirm,
    canConfirm,
}) => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.light",
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <UploadOutlinedIcon color="primary" />

                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 900,
                    }}
                >
                    แนบหลักฐานการชำระเงิน *
                </Typography>
            </Stack>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                หลังโอนแล้ว กรุณาแนบรูปสลิป/หลักฐานการโอนเพื่อให้ Admin
                ตรวจสอบ
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    mb: 1,
                }}
            >
                เลือกรูปสลิป
            </Typography>

            <ImageUploader
                type="payment"
                value={slipUrl}
                onChange={( url: any) => setSlipUrl(url ?? "")}
            />

            <Divider sx={{ my: 3 }} />

            <Stack
                direction="row"
                spacing={2}
            >
                <Button
                    variant="outlined"
                    size="large"
                    onClick={onBack}
                    sx={{
                        minWidth: 160,
                    }}
                >
                    ย้อนกลับ
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!canConfirm}
                    onClick={onConfirm}
                    startIcon={<UploadOutlinedIcon />}
                >
                    ส่งหลักฐานและยืนยันคำสั่งซื้อ
                </Button>
            </Stack>
        </Card>
    );
};

export default PaymentSlipSection;