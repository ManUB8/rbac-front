import React from 'react';
import type { IuseFetchMasterFunctionProduct } from '../../hook/useFetchMasterProduct';
import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export interface IHeadMasterProductProps {
    master_product: IuseFetchMasterFunctionProduct
};

const HeadMasterProduct: React.FunctionComponent<IHeadMasterProductProps> = ({ master_product }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Stack
                        spacing={{ xs: 1.5, md: 1 }}
                        sx={{
                            alignItems: { xs: "center", md: "flex-start" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                {"สินค้าทั้งหมด"}
                            </Typography>

                            <Chip
                                label={`ทั้งหมด ${master_product.total_product.toLocaleString()} รายการ`}
                                sx={{ fontWeight: 700 }}
                            />
                        </Stack>

                    </Stack>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 3 }}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={master_product.handleCreate}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        {"เพิ่มสินค้าใหม่"}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
};

export default HeadMasterProduct;