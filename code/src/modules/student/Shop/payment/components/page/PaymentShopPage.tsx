import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ICheckoutSummaryData, IOrdersCreateRequest } from "../../../order/interface/OrderShop.interface";
import PaymentStepper from "./PaymentStepper";
import PaymentReceiverSection from "./PaymentReceiverSection";
import PaymentMethodSection from "./PaymentMethodSection";
import PaymentProductSummary from "./PaymentProductSummary";
import PaymentSlipSection from "./PaymentSlipSection";
import { CreateOrderShop } from "../../../order/service/OrderShopApi";
import { UpdatePaymentSlip } from "../../../payment/page/PaymentApi";

const PaymentShopPage: React.FC = () => {
    const [step, setStep] = React.useState<1 | 2>(1);
    const [paymentMethod, setPaymentMethod] = React.useState<"promptpay" | "bank_transfer">("promptpay");

    const [receiverName, setReceiverName] = React.useState("");
    const [receiverPhone, setReceiverPhone] = React.useState("");
    const [shippingAddress, setShippingAddress] = React.useState("");
    const [note, setNote] = React.useState("");
    const [slipUrl, setSlipUrl] = React.useState("");

    const [orderId, setOrderId] = React.useState("");
    const [orderNo, setOrderNo] = React.useState("");
    const [creatingOrder, setCreatingOrder] = React.useState(false);
    const [uploadingSlip, setUploadingSlip] = React.useState(false);

    const summary = React.useMemo<ICheckoutSummaryData | null>(() => {
        const raw = sessionStorage.getItem("checkout_summary");
        if (!raw) return null;

        try {
            return JSON.parse(raw) as ICheckoutSummaryData;
        } catch {
            return null;
        }
    }, []);

    if (!summary) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography>ไม่พบข้อมูลการชำระเงิน</Typography>
            </Container>
        );
    }

    const canNext = Boolean(
        receiverName.trim() &&
        receiverPhone.trim() &&
        shippingAddress.trim()
    );

    const canConfirmSlip = Boolean(orderId && slipUrl);

    const handleCreateOrder = async () => {
        try {
            setCreatingOrder(true);

            const body: IOrdersCreateRequest = {
                student_code: summary.student_code,
                delivery_type: summary.delivery_type,
                payment_method: paymentMethod,
                receiver_name: receiverName,
                receiver_phone: receiverPhone,
                shipping_address: shippingAddress,
            };

            const res = await CreateOrderShop(body);

            setOrderId(res.data.order_id);
            setOrderNo(res.data.order_no);
            setStep(2);
        } catch (error) {
            console.error(error);
        } finally {
            setCreatingOrder(false);
        }
    };

    const handleConfirmPaymentSlip = async () => {
        try {
            setUploadingSlip(true);

            await UpdatePaymentSlip({
                student_code: summary.student_code,
                slip_image: slipUrl,
            }, orderId);

            console.log("payment slip uploaded", {
                order_id: orderId,
                order_no: orderNo,
                slip_image: slipUrl,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setUploadingSlip(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box>
                    <Typography sx={{ fontSize: 44, fontWeight: 900 }}>
                        ชำระเงิน
                    </Typography>

                    <Typography sx={{ color: "text.secondary", fontSize: 18 }}>
                        {step === 1
                            ? "ขั้นตอนที่ 1/2 — กรอกข้อมูลผู้รับ"
                            : "ขั้นตอนที่ 2/2 — ชำระเงินและแนบสลิป"}
                    </Typography>
                </Box>

                <PaymentStepper step={step} />

                {step === 1 && (
                    <>
                        <PaymentReceiverSection
                            summary={summary}
                            receiverName={summary.student_name}
                            setReceiverName={setReceiverName}
                            receiverPhone={receiverPhone}
                            setReceiverPhone={setReceiverPhone}
                            shippingAddress={shippingAddress}
                            setShippingAddress={setShippingAddress}
                            note={note}
                            setNote={setNote}
                        />

                        <PaymentMethodSection
                            summary={summary}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            previewOnly
                        />

                        <PaymentProductSummary summary={summary} />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={!canNext || creatingOrder}
                            onClick={handleCreateOrder}
                            sx={{
                                height: 56,
                                borderRadius: 2,
                                fontSize: 20,
                                fontWeight: 700,
                            }}
                        >
                            {creatingOrder ? "กำลังสร้างคำสั่งซื้อ..." : "ถัดไป: ชำระเงิน"}
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <PaymentMethodSection
                            summary={summary}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />

                        <PaymentSlipSection
                            slipUrl={slipUrl}
                            setSlipUrl={setSlipUrl}
                            onBack={() => setStep(1)}
                            onConfirm={handleConfirmPaymentSlip}
                            canConfirm={canConfirmSlip && !uploadingSlip}
                        />

                        <PaymentProductSummary summary={summary} />
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default PaymentShopPage;