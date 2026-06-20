import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import type { IProductItem } from "../../interface/MasterProduct.interface";
import type { IuseFetchMasterFunctionProduct } from "../../hook/useFetchMasterProduct";
import type { IVariantItem } from "../../../master_variants/interface/MasterVariants.interface";

const ellipsisSx = {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    minWidth: 0,
};

export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    width?: string | number;
    render: (row: T) => React.ReactNode;
}

export function activeAvatar(status: boolean) {
    const bgcolor = status ? "successVariant80" : "errorTones.98";
    const textColor = status ? "successVariant0" : "errorTones.40";
    const label = status ? "เปิดใช้งาน" : "ปิดใช้งาน";

    return (
        <Box sx={{ bgcolor, borderRadius: "4px", px: 2, py: 0.5 }}>
            <Typography sx={{ color: textColor, fontSize: 13 }}>{label}</Typography>
        </Box>
    );
}

function RowActions({
    row,
    masterController,
}: {
    row: IProductItem;
    masterController: IuseFetchMasterFunctionProduct;
}) {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton
                size="small"
                onClick={() => {
                    masterController.setSelectedId(row.product_id);
                    masterController.setOpenModal(true);
                }}
                sx={{
                    color: "primary.main",
                    "&:hover": { transform: "scale(1.08)" },
                }}
            >
                <EditOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton
                size="small"
                onClick={() => {
                    masterController.setSelectedId(row.product_id);
                    // masterController.onClickDeleteMaster();
                }}
                sx={{
                    color: "error.main",
                    "&:hover": { transform: "scale(1.08)" },
                }}
            >
                <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
}

export function useMasterProductColumns(
    masterController: IuseFetchMasterFunctionProduct
): Column<IProductItem>[] {
    return React.useMemo(
        () => [
            {
                id: "product_name",
                label: "สินค้า",
                minWidth: 380,
                align: "left",
                render: (row) => (
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            minWidth: 0,
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={() =>
                                masterController.setOpenRows((prev) => ({
                                    ...prev,
                                    [row.product_id]: !prev[row.product_id],
                                }))
                            }
                        >
                            {masterController.openRows[row.product_id] ? (
                                <KeyboardArrowDownIcon />
                            ) : (
                                <KeyboardArrowRightOutlinedIcon />
                            )}
                        </IconButton>

                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                bgcolor: "#f1f5f9",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                            }}
                        >
                            {row.main_image ? (
                                <Box
                                    component="img"
                                    src={row.main_image}
                                    alt={row.product_name}
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <ImageNotSupportedOutlinedIcon fontSize="small" />
                            )}
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" sx={ellipsisSx} title={row.product_name}>
                                {row.product_name || "-"}
                            </Typography>
                        </Box>
                    </Stack>
                ),
            },
            {
                id: "category",
                label: "หมวดหมู่",
                minWidth: 140,
                align: "left",
                render: (row) => (
                    <Typography variant="body2">
                        {row.category_name || "-"}
                    </Typography>
                ),
            },
            {
                id: "active_variant_count",
                label: "ตัวเลือก",
                minWidth: 140,
                align: "left",
                render: (row) => (
                   <Typography variant="body2">
                        {row.has_variant
                            ? (row.active_variant_count ?? 0)
                            : "-"}
                    </Typography>
                ),
            },
            {
                id: "base_price",
                label: "ราคา",
                minWidth: 120,
                align: "left",
                render: (row) => <Typography variant="body2">{row.base_price || "-"}</Typography>,
            },
            {
                id: "base_stock",
                label: "คงเหลือ",
                minWidth: 80,
                align: "left",
                render: (row) => (
                    <Typography variant="body2">
                        {row.has_variant
                            ? (row.total_stock ?? 0)
                            : (row.base_stock ?? "-")}
                    </Typography>
                ),
            },
            {
                id: "is_active",
                label: "สถานะ",
                minWidth: 120,
                align: "center",
                render: (row) => activeAvatar(row.is_active),
            },
            {
                id: "management",
                label: "",
                headerRender: () => <AddBoxOutlinedIcon />,
                minWidth: 90,
                align: "center",
                render: (row) => (
                    <RowActions row={row} masterController={masterController} />
                ),
            },
        ],
        [masterController]
    );
}

export const createRowDetailsColumns = (): Column<IVariantItem>[] => [
    {
        id: "variant_name",
        label: "ตัวเลือก",
        minWidth: 120,
        align: "left",
        render: (variant) => (
            <Typography variant="body2">{variant.variant_name || "-"}</Typography>
        ),
    },
    {
        id: "color_name",
        label: "สี",
        minWidth: 100,
        align: "left",
        render: (variant) => (
            <Typography variant="body2">{variant.color_name || "-"}</Typography>
        ),
    },
    {
        id: "sku_code",
        label: "SKU",
        minWidth: 140,
        align: "left",
        render: (variant) => (
            <Typography variant="body2">{variant.sku_code || "-"}</Typography>
        ),
    },
    {
        id: "price",
        label: "ราคา",
        minWidth: 100,
        align: "left",
        render: (variant) => (
            <Typography variant="body2">{variant.price || "-"}</Typography>
        ),
    },
    {
        id: "stock",
        label: "คงเหลือ",
        minWidth: 90,
        align: "center",
        render: (variant) => (
            <Typography variant="body2">{variant.stock ?? "-"}</Typography>
        ),
    },
    {
        id: "status",
        label: "สถานะ",
        minWidth: 120,
        align: "center",
        render: (variant) => activeAvatar(variant.is_active),
    },
];