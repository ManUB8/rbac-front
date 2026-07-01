import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
    step: 1 | 2;
}

const PaymentStepper: React.FC<Props> = ({ step }) => {
    return (
        <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 0.75, sm: 2 } }}>
            <Box
                sx={{
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    borderRadius: "50%",
                    bgcolor: step === 1 ? "primary.main" : "primary.light",
                    color: "primary.contrastText",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                }}
            >
                {step === 1 ? "1" : <CheckIcon />}
            </Box>

            <Typography sx={{ fontWeight: 800, fontSize: { xs: 12, sm: 16 }, whiteSpace: "nowrap" }}>
                ข้อมูลผู้รับ
            </Typography>

            <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />

            <Box
                sx={{
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    borderRadius: "50%",
                    bgcolor: step === 2 ? "primary.main" : "action.hover",
                    color: step === 2 ? "primary.contrastText" : "text.secondary",
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
                    fontSize: { xs: 12, sm: 16 },
                    color: step === 2 ? "text.primary" : "text.secondary",
                    whiteSpace: "nowrap",
                }}
            >
                ชำระเงิน
            </Typography>
        </Stack>
    );
};

export default PaymentStepper;
