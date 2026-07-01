import React from "react";
import {
    Box,
    Card,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import NoImg from "../../../../../../../assets/image/no-img.jpg";
import type { IuseFetcOrderStudentFrom } from "../../../hook/useFetchOrderShop";

interface Props {
    controller: IuseFetcOrderStudentFrom;
}

const formatPrice = (value?: string | number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

const ProductOrderShop: React.FC<Props> = ({ controller }) => {
    const order = controller.order_date;
    const items = order?.items ?? [];

    if (!order) return null;

    return (
        <Card
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 2 }}>
                รายการสินค้า
            </Typography>

            <Stack spacing={1.5}>
                {items.map((item, index) => {
                    const img = item.variant_image || item.main_image || NoImg;

                    return (
                        <React.Fragment key={item.order_item_id}>
                            <Stack direction="row" spacing={1.5}>
                                <Box
                                    component="img"
                                    src={img}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 1.5,
                                        objectFit: "cover",
                                        bgcolor: "grey.100",
                                        flexShrink: 0,
                                    }}
                                />

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.product_name_snapshot}
                                    </Typography>

                                    {(item.variant_name_snapshot ||
                                        item.color_name_snapshot) && (
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 13,
                                            }}
                                        >
                                            {item.variant_name_snapshot || "-"} /{" "}
                                            {item.color_name_snapshot || "-"}
                                        </Typography>
                                    )}

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 13,
                                        }}
                                    >
                                        {item.quantity} × ฿{formatPrice(item.price_snapshot)}
                                    </Typography>
                                </Box>

                                <Typography sx={{ fontWeight: 800 }}>
                                    ฿{formatPrice(item.total_price)}
                                </Typography>
                            </Stack>

                            {index < items.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                })}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={0.75}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">ราคาสินค้า</Typography>
                    <Typography>฿{formatPrice(order.product_total_amount)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">ค่าจัดส่ง</Typography>
                    <Typography>฿{formatPrice(order.shipping_fee)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 900 }}>ยอดรวม</Typography>
                    <Typography sx={{ fontWeight: 900, color: "primary.main" }}>
                        ฿{formatPrice(order.total_amount)}
                    </Typography>
                </Box>
            </Stack>
        </Card>
    );
};

export default ProductOrderShop;