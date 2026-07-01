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

import NoImg from "../../../../../../assets/image/no-img.jpg";

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
        <Grid container spacing={{ xs: 1.25, sm: 2 }} sx={{ marginTop: { xs: 1.25, sm: 2 } }}>
            {cartItems.map((item) => (
                <Grid
                    key={item.cart_item_id}
                    size={12}
                >
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <CardContent sx={{ p: { xs: 1.25, sm: 2 }, "&:last-child": { pb: { xs: 1.25, sm: 2 } } }}>
                            <Stack
                                direction="row"
                                spacing={{ xs: 1.1, sm: 2 }}
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
                                        width: { xs: 72, sm: 90 },
                                        height: { xs: 72, sm: 90 },
                                        borderRadius: 2,
                                        objectFit: "cover",
                                        flexShrink: 0,
                                    }}
                                />

                                {/* product_name */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: { xs: 14.5, sm: 18 },
                                            lineHeight: 1.25,
                                            overflowWrap: "anywhere",
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
                                                    fontSize: { xs: 12, sm: 14 },
                                                    lineHeight: 1.35,
                                                    overflowWrap: "anywhere",
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
                                            fontSize: { xs: 15, sm: 18 },
                                        }}
                                    >
                                        ฿{item.price}
                                    </Typography>

                                    {/* จำนวน */}
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            mt: { xs: 0.75, sm: 1 },
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
                                                minWidth: { xs: 20, sm: 24 },
                                                textAlign: "center",
                                                fontSize: { xs: 14, sm: 18 },
                                                fontWeight: 700,
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
                                    size="small"
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
