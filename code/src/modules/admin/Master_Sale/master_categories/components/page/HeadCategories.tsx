import React from 'react';
import type { IuseFetchMasterCategoryList } from '../../hook/useFetchMasterCategories';
import { Button, Grid, Stack, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export interface IHeadCategoriesProps {
    master: IuseFetchMasterCategoryList
};

const HeadCategories: React.FunctionComponent<IHeadCategoriesProps> = ({ master }) => {
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
                                {"จัดการหมวดหมู่สินค้า"}
                            </Typography>


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
                        onClick={master.handleCreate}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        {"เพิ่มหมวดหมู่"}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
};

export default HeadCategories;