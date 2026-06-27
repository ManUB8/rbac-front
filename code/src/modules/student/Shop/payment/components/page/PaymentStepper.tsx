import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
    step: 1 | 2;
}

const PaymentStepper: React.FC<Props> = ({ step }) => {
    return (
        <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
            <Box
                sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    bgcolor: step === 1 ? "primary.main" : "primary.light",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                }}
            >
                {step === 1 ? "1" : <CheckIcon />}
            </Box>

            <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                ข้อมูลผู้รับ
            </Typography>

            <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />

            <Box
                sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    bgcolor: step === 2 ? "primary.main" : "action.hover",
                    color: step === 2 ? "#fff" : "text.secondary",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                }}
            >
                2
            </Box>

            <Typography
                sx={{
                    fontWeight: 800,
                    fontSize: 20,
                    color: step === 2 ? "text.primary" : "text.secondary",
                }}
            >
                ชำระเงิน
            </Typography>
        </Stack>
    );
};

export default PaymentStepper;