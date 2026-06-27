import React from "react";
import {
    Box,
    Card,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import type { IuseFetcOrderFrom } from "../../../hook/useFetchMasterOrder";
import NoImg from "../../../../../../assets/image/NoImg.png";

interface Props {
    controller: IuseFetcOrderFrom;
}

const formatPrice = (value?: string | number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

const ProductOrder: React.FC<Props> = ({ controller }) => {
    const order = controller.watch();
    const items = order?.items ?? [];

    return (
        <Card
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <Inventory2OutlinedIcon color="primary" />

                <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                    รายการสินค้า
                </Typography>
            </Stack>

            <Stack spacing={1.5}>
                {items.map((item, index) => (
                    <React.Fragment key={item.order_item_id}>
                        <Stack direction="row" spacing={1.5}>
                            <Box
                                component="img"
                                src={(item as any).main_image || NoImg}
                                sx={{
                                    width: 72,
                                    height: 72,
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
                                    {item.product_name_snapshot || "-"}
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
                                    ฿{formatPrice(item.price_snapshot)} ×{" "}
                                    {item.quantity}
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                ฿{formatPrice(item.total_price)}
                            </Typography>
                        </Stack>

                        {index < items.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography color="text.secondary">ยอดสินค้า</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                    ฿{formatPrice(order?.product_total_amount)}
                </Typography>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography color="text.secondary">ค่าจัดส่ง</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                    ฿{formatPrice(order?.shipping_fee)}
                </Typography>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between", mt: 1 }}>
                <Typography sx={{ fontWeight: 800 }}>ยอดรวม</Typography>
                <Typography sx={{ fontWeight: 900 }}>
                    ฿{formatPrice(order?.total_amount)}
                </Typography>
            </Stack>
        </Card>
    );
};

export default ProductOrder;