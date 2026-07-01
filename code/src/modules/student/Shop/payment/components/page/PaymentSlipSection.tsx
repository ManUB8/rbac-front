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
import NoImg from "../../../../../../assets/image/slip.jpg";
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
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                border: "1px solid",
                borderColor: "custom.cardBorder",
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
                <UploadOutlinedIcon color="primary" sx={{ fontSize: { xs: 22, sm: 24 } }} />

                <Typography
                    sx={{
                        fontSize: { xs: 18, sm: 24 },
                        fontWeight: 900,
                        lineHeight: 1.25,
                    }}
                >
                    แนบหลักฐานการชำระเงิน *
                </Typography>
            </Stack>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: 13, sm: 16 },
                    lineHeight: 1.5,
                }}
            >
                หลังโอนแล้ว กรุณาแนบรูปสลิป/หลักฐานการโอนเพื่อให้ Admin
                ตรวจสอบ
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: 13.5, sm: 16 },
                }}
            >
                เลือกรูปสลิป
            </Typography>

            <ImageUploader
                type="payment"
                value={slipUrl || NoImg}
                onChange={(url: any) => setSlipUrl(url ?? "")}
            />

            <Divider sx={{ my: { xs: 2, sm: 3 } }} />

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.25, sm: 2 }}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={onBack}
                    sx={{
                        minHeight: 48,
                        whiteSpace: "normal",
                        lineHeight: 1.3,
                        fontWeight: 700,
                        fontSize: { xs: 13, sm: 14 },
                    }}
                >
                    ข้ามไปก่อน (อัปสลิปที่หลัง)
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!canConfirm}
                    onClick={onConfirm}
                    startIcon={<UploadOutlinedIcon />}
                    sx={{
                        minHeight: 48,
                        whiteSpace: "normal",
                        lineHeight: 1.3,
                        fontWeight: 700,
                        fontSize: { xs: 13, sm: 14 },
                    }}
                >
                    ส่งหลักฐานและยืนยันคำสั่งซื้อ
                </Button>
            </Stack>
        </Card>
    );
};

export default PaymentSlipSection;
