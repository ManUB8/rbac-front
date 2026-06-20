import React from "react";
import {
    Box,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import type { IuseFetchProductFrom } from "../../hook/useFetchMasterProduct";

interface Props {
    controller: IuseFetchProductFrom;
}

const ProductVariantSection: React.FC<Props> = ({ controller }) => {
    const variants = controller.watch("variants" as any) ?? [];
    const hasVariant = !!controller.watch("has_variant");

    if (!hasVariant) return null;

    const setVariantValue = (
        index: number,
        key: string,
        value: string | number | boolean
    ) => {
        controller.setValue(`variants.${index}.${key}` as any, value);
    };

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: "divider",
            }}
        >
            <Typography sx={{ fontWeight: 700, mb: 2 }}>ตัวเลือกสินค้า</Typography>

            <Stack spacing={2}>
                {variants.map((variant: any, index: number) => (
                    <Box
                        key={index}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "16px",
                                }}
                            >
                                Variant #{index + 1}
                            </Typography>

                            <FormControlLabel
                                sx={{
                                    mr: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "14px",
                                        fontWeight: 500,
                                    },
                                }}
                                control={
                                    <Switch
                                        checked={!!variant?.is_active}
                                        onChange={(e) =>
                                            setVariantValue(
                                                index,
                                                "is_active",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="เปิดใช้งาน"
                            />
                        </Stack>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                                label="Size / Variant"
                                fullWidth
                                value={variant?.variant_name ?? ""}
                                onChange={(e) =>
                                    setVariantValue(index, "variant_name", e.target.value)
                                }
                            />

                            <TextField
                                label="สี"
                                fullWidth
                                value={variant?.color_name ?? ""}
                                onChange={(e) =>
                                    setVariantValue(index, "color_name", e.target.value)
                                }
                            />
                        </Stack>

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            sx={{ mt: 2 }}
                        >
                            <TextField
                                label="SKU"
                                fullWidth
                                value={variant?.sku_code ?? ""}
                                onChange={(e) =>
                                    setVariantValue(index, "sku_code", e.target.value)
                                }
                            />

                            <TextField
                                label="รูป Variant"
                                fullWidth
                                value={variant?.variant_image ?? ""}
                                onChange={(e) =>
                                    setVariantValue(index, "variant_image", e.target.value)
                                }
                            />
                        </Stack>

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            sx={{ mt: 2 }}
                        >
                            <TextField
                                label="ราคา"
                                type="number"
                                fullWidth
                                value={variant?.price ?? 0}
                                onChange={(e) =>
                                    setVariantValue(
                                        index,
                                        "price",
                                        Number(e.target.value)
                                    )
                                }
                            />

                            <TextField
                                label="คงเหลือ"
                                type="number"
                                fullWidth
                                value={variant?.stock ?? 0}
                                onChange={(e) =>
                                    setVariantValue(
                                        index,
                                        "stock",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ProductVariantSection;