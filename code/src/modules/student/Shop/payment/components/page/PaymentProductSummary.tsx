import React from "react";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import type { ICheckoutSummaryData } from "../../../order/interface/OrderShop.interface";

interface Props {
    summary: ICheckoutSummaryData;
}

const PaymentProductSummary: React.FC<Props> = ({ summary }) => {
    const formatPrice = (value?: string | number) =>
        Number(value || 0).toLocaleString("th-TH");

    return (
        <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 24, fontWeight: 900, mb: 2 }}>
                รายการสินค้า
            </Typography>

            <Stack spacing={1.5}>
                {summary.items.map((item) => (
                    <Box
                        key={item.cart_item_id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Typography>
                            {item.product_name}
                            {(item.variant_name || item.color_name) &&
                                ` (${item.variant_name || "-"} / ${
                                    item.color_name || "-"
                                })`}{" "}
                            × {item.quantity}
                        </Typography>

                        <Typography>
                            ฿{formatPrice(item.total_price)}
                        </Typography>
                    </Box>
                ))}

                <Divider />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                        ยอดชำระ
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: 24,
                            color: "primary.main",
                        }}
                    >
                        ฿{formatPrice(summary.total_amount)}
                    </Typography>
                </Box>
            </Stack>
        </Card>
    );
};

export default PaymentProductSummary;