import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import NoImg from "../../../../../../assets/image/NoImg.png";

import type { IuseCartStudentFetch } from "../../hook/useFetchCartStudent";

export interface ICartStudentDetailProps {
    masterController: IuseCartStudentFetch;
}

const CartStudentDetail: React.FC<ICartStudentDetailProps> = ({
    masterController,
}) => {
    const cartItems = masterController.cart_data ?? [];

    const getImage = (url?: string | null) => {
        if (!url?.trim()) return NoImg;
        return url;
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {cartItems.map((item) => (
                <Grid
                    key={item.cart_item_id}
                    size={12}
                >
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems: "flex-start",
                                }}
                            >
                                {/* รูปสินค้า */}
                                <Box
                                    component="img"
                                    src={getImage(
                                        item.variant_image ||
                                        item.main_image
                                    )}
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: 1,
                                        objectFit: "cover",
                                        flexShrink: 0,
                                    }}
                                />

                                {/* product_name */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: 18,
                                        }}
                                    >
                                        {item.product_name}
                                    </Typography>

                                    {(item.color_name ||
                                        item.variant_name) && (
                                            <Typography
                                                sx={{
                                                    color: "text.secondary",
                                                    mt: 0.5,
                                                }}
                                            >
                                                Color: {item.color_name || "-"}
                                                {" / "}
                                                Size: {item.variant_name || "-"}
                                            </Typography>
                                        )}

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontWeight: 700,
                                            color: "primary.main",
                                            fontSize: 18,
                                        }}
                                    >
                                        ฿{item.price}
                                    </Typography>

                                    {/* จำนวน */}
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            mt: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                        onClick={() =>
                                            masterController.handleDecreaseQty?.(
                                                item
                                            )
                                        }
                                        >
                                            <RemoveIcon />
                                        </IconButton>

                                        <Typography
                                            sx={{
                                                minWidth: 24,
                                                textAlign: "center",
                                                fontSize: 18,
                                            }}
                                        >
                                            {item.quantity}
                                        </Typography>

                                        <IconButton
                                            size="small"
                                        onClick={() =>
                                            masterController.handleIncreaseQty?.(
                                                item
                                            )
                                        }
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Box>

                                {/* ปุ่มลบ */}
                                <IconButton
                                    color="error"
                                onClick={() =>
                                    masterController.handleDeleteCartItem?.(
                                        item.cart_item_id
                                    )
                                }
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CartStudentDetail;