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
import ComingSoon from "../../../../../../assets/image/coming-soon-cutout.png";
import type { IuseFetchMasterFunctionShopStudent } from "../../hook/useFetchShopStudent";

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
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: "background.paper",
                                borderColor: "custom.cardBorder",
                                boxShadow: "0 14px 30px rgba(8, 19, 95, 0.16)",
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
                                    sx={{
                                        mt: 1,
                                        borderRadius: 99,
                                    }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (data.length === 0) {
        return (
            <Box
                sx={{
                    mt: 3,
                    minHeight: { xs: 440, md: 520 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 1.5, md: 2 },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 980,
                        overflow: "hidden",
                        borderRadius: 5,
                        border: (theme) => `1px solid ${theme.palette.custom.cardBorder}`,
                        background: (theme) =>
                            `radial-gradient(circle at 80% 18%, ${theme.palette.custom.brandAccentSoft} 0, transparent 30%), linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
                        boxShadow: (theme) =>
                            `0 26px 80px ${theme.palette.mode === "light"
                                ? "rgba(8, 19, 95, 0.28)"
                                : "rgba(0, 0, 0, 0.38)"
                            }, inset 0 1px 0 rgba(255,255,255,0.08)`,
                        px: { xs: 2.25, md: 6 },
                        py: { xs: 4, md: 5 },
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 0.9fr" },
                        alignItems: "center",
                        gap: { xs: 3, md: 4 },
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background: (theme) =>
                                `linear-gradient(90deg, ${theme.palette.custom.brandAccentSoft} 1px, transparent 1px), linear-gradient(0deg, ${theme.palette.custom.brandAccentSoft} 1px, transparent 1px)`,
                            backgroundSize: "34px 34px",
                            maskImage:
                                "linear-gradient(120deg, rgba(0,0,0,0.86), transparent 74%)",
                            opacity: 0.55,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: "-12%",
                            right: "-12%",
                            bottom: { xs: 18, md: 30 },
                            height: 6,
                            background: (theme) =>
                                `linear-gradient(90deg, transparent, ${theme.palette.custom.brandAccent}, ${theme.palette.secondary.light}, transparent)`,
                            transform: "rotate(-2deg)",
                            opacity: 0.9,
                        },
                    }}
                >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                                px: 1.5,
                                py: 0.7,
                                borderRadius: 999,
                                bgcolor: "custom.brandSoft",
                                border: (theme) => `1px solid ${theme.palette.custom.brandAccent}`,
                                color: "secondary.light",
                                fontSize: 13,
                                fontWeight: 900,
                                letterSpacing: 0,
                            }}
                        >
                            RBAC Shop
                        </Box>

                        <Typography
                            sx={{
                                mt: 2,
                                fontSize: { xs: 34, sm: 42, md: 56 },
                                lineHeight: 0.95,
                                fontWeight: 950,
                                color: "#fff",
                            }}
                        >
                            สินค้าใหม่
                            <Box
                                component="span"
                                sx={{
                                    display: "block",
                                    mt: 0.75,
                                    color: "secondary.light",
                                    textShadow: "0 0 24px rgba(246, 215, 107, 0.28)",
                                }}
                            >
                                กำลังมาเร็ว ๆ นี้
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                maxWidth: 460,
                                fontSize: { xs: 15, md: 17 },
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.76)",
                                fontWeight: 500,
                            }}
                        >
                            เตรียมพบกับสินค้าใหม่ ที่มากจากพี่น้องในมหาวิทยาลัย
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [-1.5, 1.5, -1.5],
                            }}
                            transition={{
                                duration: 3.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                width: "100%",
                                maxWidth: 360,
                            }}
                        >
                            <Box
                                component="img"
                                src={ComingSoon}
                                alt="Coming soon"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                    filter: "drop-shadow(0 24px 28px rgba(0,0,0,0.42)) drop-shadow(0 0 20px rgba(246,215,107,0.24))",
                                }}
                            />
                        </motion.div>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {data.map((item) => {
                const hasImage = Boolean(item.main_image?.trim());

                const textColor = hasImage
                    ? "#fff"
                    : "primary.dark";

                const priceColor = hasImage
                    ? "secondary.light"
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
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    height: "100%",
                                    bgcolor: "background.paper",
                                    borderColor: "custom.cardBorder",
                                    transition: "all .3s ease",
                                    "&:hover": {
                                        boxShadow: (theme) =>
                                            `0 18px 42px rgba(8,19,95,.28), 0 0 0 1px ${theme.palette.custom.brandAccentSoft}`,
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
                                                    bgcolor: "rgba(8, 19, 95, 0.08)",
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
                                                    fontWeight: 900,
                                                    zIndex: 2,
                                                    color: "secondary.contrastText",
                                                    bgcolor: "secondary.light",
                                                    boxShadow: "0 10px 24px rgba(8, 19, 95, 0.18)",
                                                }}
                                            />
                                        )}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                background: (theme) => hasImage
                                                    ? `linear-gradient(to top, ${theme.palette.primary.dark}F5, ${theme.palette.primary.main}85, transparent 68%)`
                                                    : `linear-gradient(145deg, rgba(255,255,255,0.88), ${theme.palette.custom.brandAccentSoft})`,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                p: 1.5,
                                                gap: 0.15,
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    height: 3,
                                                    background: (theme) =>
                                                        `linear-gradient(90deg, ${theme.palette.custom.brandAccent}, ${theme.palette.secondary.light}, transparent)`,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    position: "relative",
                                                    zIndex: 1,
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
                                                    position: "relative",
                                                    zIndex: 1,
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
