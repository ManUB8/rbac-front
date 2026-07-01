import React from "react";
import {
    Box,
    Collapse,
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";

import type { IuseFetchMasterFunctionProduct } from "../../hook/useFetchMasterProduct";
import {
    createRowDetailsColumns,
    useMasterProductColumns,
} from "../columns/ColumnsProduct";
import { useFetchListVariantByProduct } from "../../../master_variants/hook/useFetchMasterVariants";
import type { IVariantItem } from "../../../master_variants/interface/MasterVariants.interface";

export interface ITableMasterProductProps {
    master_product: IuseFetchMasterFunctionProduct;
}

const VariantCollapseRow = ({
    product_id,
    open,
    colSpan,
}: {
    product_id: string;
    open: boolean;
    colSpan: number;
}) => {
    const { list_variants, loading_variants } = useFetchListVariantByProduct(
        product_id,
        open
    );

    return (
        <TableRow>
            <TableCell colSpan={colSpan} sx={{ py: 0, borderBottom: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {loading_variants ? (
                        <Box sx={{ p: 2 }}>
                            <Skeleton variant="rounded" height={44} sx={{ borderRadius: "8px" }} />
                        </Box>
                    ) : !list_variants || list_variants.length === 0 ? (
                        <Box
                            sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "rgba(0,0,0,0.02)",
                                borderRadius: "8px",
                                m: 1,
                            }}
                        >
                            <Typography sx={{ fontSize: 14 }}>
                                {"ไม่พบตัวเลือกสินค้า หรือยังไม่ได้สร้าง variants"}
                            </Typography>
                        </Box>
                    ) : (
                        <VariantDetails variants={list_variants} />
                    )}
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export function VariantDetails({ variants }: { variants: IVariantItem[] }) {
    const columns = React.useMemo(() => createRowDetailsColumns(), []);

    return (
        <Box sx={{ m: 1 }}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ bgcolor: "surfaceContainerLowest" }}>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ minWidth: column.minWidth, height: 44, py: 0 }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {column.label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {variants.map((variant) => (
                        <TableRow key={variant.variant_id} sx={{ height: 48 }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        height: 48,
                                        py: 0,
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {column.render(variant)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

const TableMasterProduct: React.FC<ITableMasterProductProps> = ({
    master_product,
}) => {
    const columns = useMasterProductColumns(master_product);
    const handleChangePage = (
        _event: unknown,
        newPage: number
    ) => {
        master_product.setSearchStateProduct((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        master_product.setSearchStateProduct((prev) => ({
            ...prev,
            page: 1,
            limit: +event.target.value,
        }));
    };
    return (
        <Grid
            container
            spacing={1}
            sx={{
                mt: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    m: "auto"
                }}
            >
                <TableContainer
                    sx={{
                        maxHeight: 500,
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ height: 48 }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{
                                            width: column.width,
                                            minWidth: column.minWidth,
                                            bgcolor: "background.paper",
                                            height: 48,
                                            py: 0,
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {column.headerRender ? column.headerRender() : column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {master_product.loading_product ? (
                                Array.from({ length: 8 }).map((_, rowIndex) => (
                                    <TableRow key={`skeleton-${rowIndex}`} sx={{ height: 56 }}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} sx={{ py: 1 }}>
                                                <Skeleton
                                                    variant="rounded"
                                                    width={column.align === "center" ? 72 : "75%"}
                                                    height={24}
                                                    sx={{
                                                        mx: column.align === "center" ? "auto" : 0,
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : master_product.product_data?.length === 0 ? (
                                <TableRow sx={{ height: 56 }}>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography variant="subtitle1">ไม่พบข้อมูล</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                master_product.product_data.map((row) => {
                                    const open = !!master_product.openRows[row.product_id];

                                    return (
                                        <React.Fragment key={row.product_id}>
                                            <TableRow hover sx={{ height: 64 }}>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        sx={{
                                                            py: 1,
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {column.render(row)}
                                                    </TableCell>
                                                ))}
                                            </TableRow>

                                            <VariantCollapseRow
                                                product_id={row.product_id}
                                                open={open}
                                                colSpan={columns.length}
                                            />
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={master_product.total_product}
                    rowsPerPage={master_product.searchStateProduct.limit}
                    page={master_product.searchStateProduct.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </Grid>
    );
};

export default TableMasterProduct;