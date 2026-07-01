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
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography sx={{ fontSize: { xs: 17, sm: 18 }, fontWeight: 900, mb: { xs: 1.25, sm: 2 } }}>
                รายการสินค้า
            </Typography>

            <Stack spacing={{ xs: 1.2, sm: 1.5 }}>
                {summary.items.map((item) => (
                    <Box
                        key={item.cart_item_id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: { xs: 1.25, sm: 2 },
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            sx={{
                                minWidth: 0,
                                fontSize: { xs: 13, sm: 16 },
                                lineHeight: 1.45,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {item.product_name}
                            {(item.variant_name || item.color_name) &&
                                ` (${item.variant_name || "-"} / ${
                                    item.color_name || "-"
                                })`}{" "}
                            × {item.quantity}
                        </Typography>

                        <Typography
                            sx={{
                                flexShrink: 0,
                                fontSize: { xs: 13, sm: 16 },
                                fontWeight: 700,
                            }}
                        >
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
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: 17, sm: 20 } }}>
                        ยอดชำระ
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: 20, sm: 22 },
                            color: "primary.main",
                            lineHeight: 1,
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
