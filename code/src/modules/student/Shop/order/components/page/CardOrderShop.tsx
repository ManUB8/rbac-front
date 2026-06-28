import React from "react";
import {
    Box,
    Button,
    Card,
    Chip,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";

import type { IuseOrderStudentFetch } from "../../hook/useFetchOrderShop";
import type {
    IOrderHistoryItem,
    IOrderStatus,
    IPaymentStatus,
} from "../../interface/OrderShop.interface";

import {
    orderStatusText,
    paymentStatusText,
    orderStatusColor,
    paymentStatusColor,
} from "../../../../../admin/MasterOrder/utils/order_option";

import NoImg from "../../../../../../assets/image/no-img.jpg";

export interface ICardOrderShopProps {
    mastercontroller: IuseOrderStudentFetch;
}

const formatPrice = (value?: string | number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

const formatDate = (timestamp?: number) => {
    if (!timestamp) return "-";

    return new Date(timestamp * 1000).toLocaleDateString("th-TH", {
        dateStyle: "medium",
    });
};

const getDeliveryText = (type: string) => {
    if (type === "shipping") return "จัดส่ง";
    if (type === "pickup") return "รับเอง";
    return "-";
};

const getItemImage = (item: IOrderHistoryItem["items"][number]) =>
    item.variant_image || item.main_image || NoImg;

const OrderImagePreview = ({ order }: { order: IOrderHistoryItem }) => {
    const previewItems = order.items.slice(0, 2);
    const moreCount = order.items.length - previewItems.length;

    return (
        <Box
            sx={{
                height: 96,
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
            }}
        >
            {previewItems.map((product) => (
                <Box
                    key={product.order_item_id}
                    component="img"
                    src={getItemImage(product)}
                    sx={{
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                        borderRadius: 1,
                        bgcolor: "grey.100",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                />
            ))}

            {moreCount > 0 && (
                <Box
                    sx={{
                        width: 52,
                        height: 72,
                        borderRadius: 1,
                        bgcolor: "grey.100",
                        border: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                        fontWeight: 900,
                        fontSize: 16,
                    }}
                >
                    +{moreCount}
                </Box>
            )}
        </Box>
    );
};

const CardOrderShop: React.FC<ICardOrderShopProps> = ({ mastercontroller }) => {
    const data = mastercontroller.order_list ?? [];
    const loading = mastercontroller.order_loading;

    if (loading) {
        return (
            <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                        <Card sx={{ p: 2, borderRadius: 1 }}>
                            <Skeleton variant="rounded" height={80} />
                            <Skeleton width="90%" height={28} sx={{ mt: 1 }} />
                            <Skeleton width="60%" />
                            <Skeleton width="80%" />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
            {data.map((item: IOrderHistoryItem) => (
                <Grid key={item.order_id} size={{ xs: 6, sm: 4, md: 3 }}>
                    <Card
                        elevation={0}
                        sx={{
                            height: "100%",
                            p: 2,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <OrderImagePreview order={item} />

                        <Typography
                            sx={{
                                fontWeight: 900,
                                fontSize: 14,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                mb: 1,
                            }}
                        >
                            {item.order_no}
                        </Typography>

                        <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: "wrap" }}>
                            <Chip
                                size="small"
                                variant="outlined"
                                color={
                                    orderStatusColor[
                                        item.order_status as IOrderStatus
                                    ] ?? "default"
                                }
                                label={
                                    orderStatusText[
                                        item.order_status as IOrderStatus
                                    ] ?? item.order_status
                                }
                                sx={{
                                    height: 22,
                                    borderRadius: 1,
                                    fontWeight: 800,
                                    maxWidth: 90,
                                    "& .MuiChip-label": {
                                        px: 0.8,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                }}
                            />

                            <Chip
                                size="small"
                                variant="outlined"
                                color={
                                    paymentStatusColor[
                                        item.payment_status as IPaymentStatus
                                    ] ?? "default"
                                }
                                label={
                                    paymentStatusText[
                                        item.payment_status as IPaymentStatus
                                    ] ?? item.payment_status
                                }
                                sx={{
                                    height: 22,
                                    borderRadius: 1,
                                    fontWeight: 800,
                                    maxWidth: 110,
                                    "& .MuiChip-label": {
                                        px: 0.8,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                }}
                            />
                        </Stack>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: 12,
                                lineHeight: 1.5,
                            }}
                        >
                            {formatDate(item.created_at)}
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: 12,
                                mb: 1.5,
                            }}
                        >
                            {item.items.length} รายการ • {getDeliveryText(item.delivery_type)}
                        </Typography>

                        <Box sx={{ flex: 1 }} />

                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                fontSize: 22,
                                mb: 1.2,
                            }}
                        >
                            ฿{formatPrice(item.total_amount)}
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            onClick={() =>
                                mastercontroller.handleOpenModal(item.order_id)
                            }
                            sx={{
                                borderRadius: 1,
                                fontWeight: 700,
                            }}
                        >
                            ดูรายละเอียด
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardOrderShop;