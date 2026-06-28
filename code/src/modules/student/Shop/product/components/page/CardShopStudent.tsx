import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Chip,
    Grid,
    Skeleton,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import NoImg from "../../../../../../assets/image/no-img.jpg";
import type { IuseFetchMasterFunctionShopStudent } from "../../hook/useFetchShopStudent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export interface ICardShopStudentProps {
    mastercontroller: IuseFetchMasterFunctionShopStudent;
}

const CardShopStudent: React.FC<ICardShopStudentProps> = ({
    mastercontroller,
}) => {
    const data = mastercontroller.product_data ?? [];

    const getProductImage = (url?: string | null) => {
        if (!url?.trim()) return NoImg;
        return url;
    };

    if (mastercontroller.loading_product) {
        return (
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <Grid
                        key={index}
                        size={{
                            xs: 6,
                            sm: 4,
                            md: 3,
                            lg: 2.4,
                        }}
                    >
                        <Card
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    aspectRatio: "1 / 1",
                                }}
                            />

                            <Box sx={{ p: 1.5 }}>
                                <Skeleton
                                    variant="text"
                                    width="80%"
                                    height={30}
                                />

                                <Skeleton
                                    variant="text"
                                    width="100%"
                                />

                                <Skeleton
                                    variant="text"
                                    width="60%"
                                />

                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={32}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {data.map((item) => {
                const hasImage = Boolean(item.main_image?.trim());

                const textColor = hasImage
                    ? "#fff"
                    : "text.primary";

                const priceColor = hasImage
                    ? "#fff"
                    : "primary.main";

                return (
                    <Grid
                        key={item.product_id}
                        size={{
                            xs: 6,
                            sm: 4,
                            md: 3,
                            lg: 2.4,
                        }}
                    >
                        <motion.div
                            whileHover={{
                                y: -6,
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            style={{
                                height: "100%",
                            }}
                        >
                            <Card
                                elevation={3}
                                sx={{
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    height: "100%",
                                    transition: "all .3s ease",
                                    "&:hover": {
                                        boxShadow:
                                            "0 12px 30px rgba(0,0,0,.15)",
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => {
                                        mastercontroller.handleOpenProduct(
                                            item.product_id
                                        );
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            aspectRatio: "1 / 1",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <motion.div
                                            whileHover={{
                                                scale: 1.08,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={getProductImage(
                                                    item.main_image
                                                )}
                                                alt={item.product_name}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    bgcolor: "grey.100",
                                                }}
                                            />
                                        </motion.div>
                                        {item.is_limited && (
                                            <Chip
                                                label={`จำกัด ${item.limit_per_student} ชิ้น/คน`}
                                                color="warning"
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                    fontWeight: 600,
                                                    zIndex: 2,
                                                }}
                                            />
                                        )}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                background: hasImage
                                                    ? "linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.3), transparent)"
                                                    : "rgba(255, 255, 255, 0.72)",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                p: 1.5,
                                                gap: 0.15,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: textColor,
                                                    fontWeight: 700,
                                                    fontSize: {
                                                        xs: 16,
                                                        md: 18,
                                                    },
                                                    lineHeight: 1.1,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {item.product_name}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: priceColor,
                                                    fontWeight: 900,
                                                    fontSize: {
                                                        xs: 18,
                                                        md: 20,
                                                    },
                                                    mt: 0.5,
                                                }}
                                            >
                                                {item.has_variant
                                                    ? item.min_price === item.max_price
                                                        ? `${item.min_price || 0}฿`
                                                        : `${item.min_price || 0} - ${item.max_price || 0}฿`
                                                    : `${item.base_price}฿`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </motion.div>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default CardShopStudent;