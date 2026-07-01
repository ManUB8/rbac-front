import React from 'react';
import type { IuseOrderStudentFetch } from '../../hook/useFetchOrderShop';
import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
export interface IHeadOrderShopProps {
    mastercontroller: IuseOrderStudentFetch
};

const HeadOrderShop: React.FunctionComponent<IHeadOrderShopProps> = ({ mastercontroller }) => {
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
                                {"คำสั่งซื้อของฉัน"}
                            </Typography>

                            <Chip
                                label={`ทั้งหมด ${mastercontroller.total_items.toLocaleString()} รายการ`}
                                sx={{ fontWeight: 700 }}
                            />
                        </Stack>

                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default HeadOrderShop;