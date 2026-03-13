import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '../../../../../assets/svg/icon/download.svg'
import type { IuseMasterFunctionSkuFetch } from '../../hook/useFetchMasterSku';

export interface IHeaderSkuProps {
   masterController: IuseMasterFunctionSkuFetch
};

const HeaderSku: React.FunctionComponent<IHeaderSkuProps> = ({
    masterController
}) => {
    return (
        <>
            <Grid container alignItems="center" spacing={1.5} >
                <Grid
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.25}
                        sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                        {/* หัวข้อ */}
                        <Typography variant="h5" sx={{ flexShrink: 0 }}>
                            {"Master SKU "}
                            <Chip
                                label={
                                    <span>
                                        <NumericFormat
                                            value={masterController.total_sku}
                                            displayType="text"
                                            thousandSeparator=","
                                        />
                                        {" รายการ"}
                                    </span>
                                }
                            />
                        </Typography>

                    </Stack>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ ml: { md: 'auto' }, mt: { xs: 1, md: 0 } }}
                    >
                        <Button variant="contained" color="primary" sx={{ bgcolor: masterController.theme.palette.background.paper }} onClick={() => console.log('Download')}>
                            <img src={DownloadIcon} />
                        </Button>

                        <Button variant="contained" size='large' startIcon={<AddIcon />}onClick={() => masterController.handleCreateMasterSku()}>
                            <Typography variant='subtitle1'>
                                {"เพิ่ม สินค้ากลาง"}
                            </Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default HeaderSku;