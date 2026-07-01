import React from 'react';
import type { IuseCartStudentFetch } from '../../hook/useFetchCartStudent';
import { Chip, Grid, Stack, Typography } from '@mui/material';
export interface IHeadCartStudentProps {
    masterController: IuseCartStudentFetch
};

const HeadCartStudent: React.FunctionComponent<IHeadCartStudentProps> = ({ masterController }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Stack
                        spacing={{ xs: 1, md: 1 }}
                        sx={{
                            alignItems: { xs: "center", md: "flex-start" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 1, md: 1.5 }}
                            sx={{ alignItems: "center" }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: 22, sm: 26 },
                                }}
                            >
                                {"ตะกร้าสินค้า"}
                            </Typography>

                            <Chip
                                label={`ทั้งหมด ${masterController.total_items.toLocaleString()} รายการ`}
                                size="small"
                                sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 13 } }}
                            />
                        </Stack>

                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default HeadCartStudent;
