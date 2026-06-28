import React from "react";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import NoImg from "../../../../../../assets/image/no-img.jpg";

import type {
    IuseFetchMasterFunctionShopStudent,
    IuseFetchShopStudentProductFrom,
} from "../../hook/useFetchShopStudent";

export interface IProductDetailProps {
    mastercontroller: IuseFetchMasterFunctionShopStudent;
    controller: IuseFetchShopStudentProductFrom;
}

const ProductDetail: React.FC<IProductDetailProps> = ({
    mastercontroller,
    controller,
}) => {
    const product = controller.product;
    const variants = product?.variants ?? [];

    const [selectedImage, setSelectedImage] = React.useState<string>("");
    const [selectedVariantId, setSelectedVariantId] = React.useState<string>("");
    const [quantity, setQuantity] = React.useState<number>(1);

    const getImage = (url?: string | null) => {
        if (!url?.trim()) return NoImg;
        return url;
    };

    const selectedVariant = variants.find(
        (item) => item.variant_id === selectedVariantId
    );

    const isPreorder = !!product?.is_preorder;

    const normalStock = product?.has_variant
        ? Number(selectedVariant?.stock ?? 0)
        : Number(product?.base_stock ?? 0);

    const preorderRemainingQty =
        typeof product?.active_preorder_round === "object" &&
        product?.active_preorder_round
            ? Number(product.active_preorder_round.remaining_qty ?? 0)
            : Number(product?.preorder_limit_qty || 0);

    const availableQty = isPreorder ? preorderRemainingQty : normalStock;

    const stockLabel = isPreorder
        ? `พรีออเดอร์คงเหลือ ${availableQty}`
        : `คงเหลือ ${availableQty}`;

    const galleryImages = React.useMemo(() => {
        if (!product) return [];

        const images = [
            product.main_image,
            ...(product.product_images ?? []),
            ...variants.map((variant) => variant.variant_image),
        ].filter((img): img is string => Boolean(img?.trim()));

        return Array.from(new Set(images));
    }, [product, variants]);

    const displayImage = getImage(
        selectedImage ||
            selectedVariant?.variant_image ||
            product?.main_image
    );

    const price = product?.has_variant
        ? selectedVariant?.price ?? product?.min_price ?? 0
        : product?.base_price ?? 0;

    const canSubmit =
        Boolean(product) &&
        quantity > 0 &&
        availableQty > 0 &&
        (!product?.has_variant || Boolean(selectedVariantId));

    React.useEffect(() => {
        if (!product?.product_id) {
            setSelectedImage("");
            setSelectedVariantId("");
            setQuantity(1);
            return;
        }

        setSelectedImage(product.main_image || "");
        setQuantity(1);

        if (product.has_variant && variants.length > 0) {
            setSelectedVariantId(variants[0].variant_id);
        } else {
            setSelectedVariantId("");
        }
    }, [product?.product_id, variants.length]);

    React.useEffect(() => {
        if (availableQty <= 0) {
            setQuantity(1);
            return;
        }

        setQuantity((prev) => Math.min(Math.max(prev, 1), availableQty));
    }, [availableQty]);

    const handleClose = () => {
        if (controller.saving) return;
        mastercontroller.setOpenModal(false);
    };

    const handleMinus = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handlePlus = () => {
        setQuantity((prev) => Math.min(availableQty, prev + 1));
    };

    const handleAddToCart = () => {
        if (!canSubmit) return;
        controller.onAddToCart(quantity, selectedVariantId);
    };

    const handleBuyNow = () => {
        if (!canSubmit) return;
        controller.onBuyNow(quantity, selectedVariantId);
    };

    return (
        <Dialog
            open={mastercontroller.openModal}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle sx={{ pr: 6 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 26 }}>
                    {product?.product_name || "รายละเอียดสินค้า"}
                </Typography>

                <IconButton
                    disabled={controller.saving}
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                    }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {controller.loading ? (
                    <Stack
                        sx={{
                            height: 450,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />

                        <Typography sx={{ mt: 2 }}>
                            กำลังโหลดข้อมูลสินค้า...
                        </Typography>
                    </Stack>
                ) : !product ? (
                    <Stack
                        sx={{
                            height: 300,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography sx={{ color: "text.secondary" }}>
                            ไม่พบข้อมูลสินค้า
                        </Typography>
                    </Stack>
                ) : (
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        sx={{ pb: 2 }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Box
                                component="img"
                                src={displayImage}
                                alt={product.product_name}
                                sx={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    objectFit: "cover",
                                    borderRadius: 3,
                                    bgcolor: "grey.100",
                                }}
                            />

                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    mt: 1,
                                    overflowX: "auto",
                                    pb: 0.5,
                                }}
                            >
                                {galleryImages.map((img, index) => {
                                    const active = displayImage === getImage(img);

                                    return (
                                        <Box
                                            key={`${img}-${index}`}
                                            component="img"
                                            src={getImage(img)}
                                            alt={`product-gallery-${index}`}
                                            onClick={() => setSelectedImage(img)}
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: 2,
                                                cursor: "pointer",
                                                objectFit: "cover",
                                                flexShrink: 0,
                                                border: active
                                                    ? "2px solid"
                                                    : "1px solid",
                                                borderColor: active
                                                    ? "primary.main"
                                                    : "divider",
                                            }}
                                        />
                                    );
                                })}
                            </Stack>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    color: "primary.main",
                                    fontWeight: 900,
                                    fontSize: 36,
                                    mb: 1,
                                }}
                            >
                                ฿{price}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    flexWrap: "wrap",
                                    mb: 2,
                                }}
                            >
                                {isPreorder && (
                                    <Chip
                                        label="พรีออเดอร์"
                                        color="warning"
                                        size="small"
                                    />
                                )}

                                <Chip
                                    label={stockLabel}
                                    color={availableQty > 0 ? "success" : "error"}
                                    size="small"
                                />
                            </Stack>

                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    mb: 2,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {product.description || "ไม่มีรายละเอียดสินค้า"}
                            </Typography>

                            {product.is_preorder && product.preorder_note && (
                                <Typography
                                    sx={{
                                        color: "warning.dark",
                                        mb: 2,
                                        fontWeight: 700,
                                    }}
                                >
                                    หมายเหตุพรีออเดอร์: {product.preorder_note}
                                </Typography>
                            )}

                            {product.has_variant && (
                                <>
                                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                                        ตัวเลือกสินค้า
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            flexWrap: "wrap",
                                            gap: 1,
                                        }}
                                    >
                                        {variants.map((variant) => {
                                            const isSelected =
                                                selectedVariantId ===
                                                variant.variant_id;

                                            return (
                                                <Chip
                                                    key={variant.variant_id}
                                                    label={`${variant.variant_name}${
                                                        variant.color_name
                                                            ? ` / ${variant.color_name}`
                                                            : ""
                                                    }`}
                                                    variant={
                                                        isSelected
                                                            ? "filled"
                                                            : "outlined"
                                                    }
                                                    color={
                                                        isSelected
                                                            ? "primary"
                                                            : "default"
                                                    }
                                                    onClick={() => {
                                                        setSelectedVariantId(
                                                            variant.variant_id
                                                        );

                                                        setSelectedImage(
                                                            variant.variant_image ||
                                                                product.main_image ||
                                                                ""
                                                        );

                                                        setQuantity(1);
                                                    }}
                                                />
                                            );
                                        })}
                                    </Stack>
                                </>
                            )}

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mt: 3,
                                    mb: 1,
                                }}
                            >
                                จำนวน
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ alignItems: "center" }}
                            >
                                <IconButton
                                    disabled={quantity <= 1 || controller.saving}
                                    onClick={handleMinus}
                                >
                                    <RemoveIcon />
                                </IconButton>

                                <Typography
                                    sx={{
                                        minWidth: 28,
                                        textAlign: "center",
                                        fontWeight: 700,
                                    }}
                                >
                                    {quantity}
                                </Typography>

                                <IconButton
                                    disabled={
                                        quantity >= availableQty ||
                                        availableQty <= 0 ||
                                        controller.saving
                                    }
                                    onClick={handlePlus}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>

                            <Divider sx={{ my: 3 }} />
                        </Box>
                    </Stack>
                )}
            </DialogContent>

            {!controller.loading && product && (
                <DialogActions>
                    <Button
                        fullWidth
                        variant="outlined"
                        disabled={!canSubmit || controller.saving}
                        startIcon={
                            controller.saving ? (
                                <CircularProgress size={18} />
                            ) : (
                                <ShoppingCartIcon />
                            )
                        }
                        onClick={handleAddToCart}
                    >
                        {controller.saving ? "กำลังเพิ่ม..." : "เพิ่มลงตะกร้า"}
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        disabled={!canSubmit || controller.saving}
                        startIcon={<BoltIcon />}
                        onClick={handleBuyNow}
                    >
                        ซื้อเลย
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ProductDetail;