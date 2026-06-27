import React from "react";
import {
    Card,
    CardActionArea,
    Radio,
    Stack,
    Typography,
} from "@mui/material";

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
            icon: <LocalShippingOutlinedIcon color="primary" fontSize="large" />,
        },
        {
            value: "pickup",
            title: "รับเอง",
            description: "รับสินค้าเองที่จุดนัดรับภายในมหาวิทยาลัย",
            icon: <StorefrontOutlinedIcon color="primary" fontSize="large" />,
        },
    ] as const;

    return (
        <Stack spacing={1.5} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
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
                            borderRadius: 1,
                        }}
                    >
                        <CardActionArea
                            onClick={() =>
                                masterController.setDeliveryType(option.value)
                            }
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    p: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Radio checked={active} />

                                {option.icon}

                                <Stack>
                                    <Typography sx={{ fontWeight: 700 }}>
                                        {option.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
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