import React from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { ImageUploader } from "../../../../../../../shared/components/UploadImg/ImageUploader";
import type { IuseFetcOrderStudentFrom } from "../../../hook/useFetchOrderShop";

interface Props {
    controller: IuseFetcOrderStudentFrom;
}

const SlipPaymentOrderShop: React.FC<Props> = ({ controller }) => {
    const order = controller.order_date;
    const [slipUrl, setSlipUrl] = React.useState("");

    React.useEffect(() => {
        setSlipUrl(order?.payment?.slip_image || "");
    }, [order?.payment?.slip_image]);

    if (!order) return null;

    const canUpload =
        order.payment_status === "waiting_payment" ||
        order.payment_status === "rejected";

    const hasSlip = Boolean(order.payment?.slip_image);

    return (
        <Card
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: canUpload ? "primary.light" : "divider",
            }}
        >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
                <ReceiptLongOutlinedIcon color="primary" />

                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                    หลักฐานการชำระเงิน
                </Typography>
            </Stack>

            {hasSlip && !canUpload && (
                <Box
                    component="img"
                    src={order.payment.slip_image}
                    sx={{
                        width: 220,
                        maxWidth: "100%",
                        borderRadius: 1.5,
                        objectFit: "contain",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                />
            )}

            {canUpload && (
                <>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                        เลือกรูปสลิป
                    </Typography>

                    <ImageUploader
                        type="payment"
                        value={slipUrl}
                        onChange={(url: any) => setSlipUrl(url ?? "")}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Button
                        variant="contained"
                        startIcon={<UploadOutlinedIcon />}
                        disabled={!slipUrl}
                        onClick={() => {
                            controller.handleUpdateSlip?.({
                                order_id: order.order_id,
                                student_code: order.student_code,
                                slip_image: slipUrl,
                            });
                        }}
                    >
                        ส่งหลักฐานการชำระ
                    </Button>
                </>
            )}

            {!hasSlip && !canUpload && (
                <Typography color="text.secondary">
                    ยังไม่มีหลักฐานการชำระเงิน
                </Typography>
            )}
        </Card>
    );
};

export default SlipPaymentOrderShop;