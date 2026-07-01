import React from "react";
import { Box, Card, CardActionArea, Radio, Stack, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import type { IuseCartStudentFetch } from "../../hook/useFetchCartStudent";

export interface IDeliveryShopProps {
    masterController: IuseCartStudentFetch;
}

const DeliveryShop: React.FC<IDeliveryShopProps> = ({ masterController }) => {
    const deliveryOptions = [
        {
            value: "shipping",
            title: "จัดส่ง",
            description: "จัดส่งสินค้าตามที่อยู่ / สถานที่ส่ง",
            icon: <LocalShippingOutlinedIcon />,
        },
        {
            value: "pickup",
            title: "รับเอง",
            description: "รับสินค้าเองที่จุดนัดรับภายในมหาวิทยาลัย",
            icon: <StorefrontOutlinedIcon />,
        },
    ] as const;

    return (
        <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: { xs: 1.5, sm: 2 } }}>
            <Typography sx={{ fontSize: { xs: 18, sm: 24 }, fontWeight: 800 }}>
                วิธีรับสินค้า
            </Typography>

            {deliveryOptions.map((option) => {
                const active = masterController.deliveryType === option.value;

                return (
                    <Card
                        key={option.value}
                        sx={{
                            border: active ? "2px solid" : "1px solid",
                            borderColor: active ? "primary.main" : "divider",
                            borderRadius: 2,
                            bgcolor: active ? "custom.brandSoft" : "background.paper",
                        }}
                    >
                        <CardActionArea
                            onClick={() =>
                                masterController.setDeliveryType(option.value)
                            }
                        >
                            <Stack
                                direction="row"
                                spacing={{ xs: 1, sm: 2 }}
                                sx={{
                                    p: { xs: 1.25, sm: 2 },
                                    alignItems: "center",
                                }}
                            >
                                <Radio checked={active} size="small" />

                                <Box
                                    sx={{
                                        color: "primary.main",
                                        display: "flex",
                                        "& svg": {
                                            fontSize: { xs: 28, sm: 36 },
                                        },
                                    }}
                                >
                                    {option.icon}
                                </Box>

                                <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 14.5, sm: 16 } }}>
                                        {option.title}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            fontSize: { xs: 12, sm: 14 },
                                            lineHeight: 1.45,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {option.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardActionArea>
                    </Card>
                );
            })}
        </Stack>
    );
};

export default DeliveryShop;
