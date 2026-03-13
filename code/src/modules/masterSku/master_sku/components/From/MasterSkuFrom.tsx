import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useModalHeader } from '../../../../../shared/components/layouts/ModalHeaderContext';
import { useFetchInfo, useMasterFunctionSkuFromFetch } from '../../hook/useFetchMasterSku';
import LoadingDisplayLast from '../../../../../shared/components/loading/LoadingDisplayLast';
import { Box, Button, Grid, Tab, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PhotoCard } from '../photo/PhotoCard';
import MasterSkuDetail from './MasterData/MasterSkuDetail';
import NoImg from '../../../../../assets/image/nophoto.jpg';
import { toDisplayUrl, toStoredPath } from '../../hook/handleFunction';
import { FormProvider } from 'react-hook-form';

export interface IMasterSkuFromProps { };

const MasterSkuFrom: React.FunctionComponent<IMasterSkuFromProps> = props => {
    const master = useMasterFunctionSkuFromFetch();
    const { setTitle, setActions } = useModalHeader();
    const methods = master.methods;

    const headerButtons = useMemo(() => {
        if (master.actype === 'create') {
            return [
                <Button
                    key="submit"
                    type="submit"
                    form="master-sku-form"
                    variant="contained"
                >
                    <Typography variant="button">{"บันทึก"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => { master.navigate(-1); }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
            ];
        }

        if (master.actype === 'edit') {
            return [
                <Button
                    key="submit"
                    type="submit"
                    form="master-sku-form"
                    variant="contained"
                >
                    <Typography variant="button">{"บันทึกการแก้ไข"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => { master.navigate(-1); }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
                <Button
                    key="delete"
                    variant="contained"
                    color="error"
                    onClick={master.onClickDeleteMasterSku}
                >
                    <Typography variant="button">{"ลบข้อมูลสินค้ากลาง"}</Typography>
                </Button>
            ];
        }

        return [];
    }, [master.actype, master.navigate]);

    useEffect(() => {
        setActions(headerButtons);
    }, [setTitle, setActions, headerButtons]);

    if (master.loading) {
        return (
            <>
                <LoadingDisplayLast loading={master.loading} />
            </>
        );
    }


    return (
        <>
            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    id="master-sku-form"
                    onSubmit={master.handleSubmit(master.onSubmitMasterSku, (errs) => master.handleErrorSubmit(errs, methods.setFocus))}
                >
                    <Grid container alignItems="center" p={2}>
                        <Grid size={12}>
                            <PhotoCard
                                value={toDisplayUrl(master.getValues('image') || '') || NoImg}
                                onChange={(url) => {
                                    // url ที่ได้จาก upload เป็น full url -> แปลงเป็น path ก่อนเก็บ
                                    const stored = url ? toStoredPath(url) : '';
                                    master.setValue('image', stored || '');
                                }}
                                size={240}
                                label="No Photo"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TabContext value={master.valueTab}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={master.handleChangeTab}>
                                        <Tab label={<Typography variant='subtitle1'>{"ข้อมูลสินค้ากลาง"}</Typography>} value="1" />
                                        {/* <Tab label={<Typography variant='subtitle1'>{"สินค้าเข้าร่วม"}</Typography>} value="2" /> */}
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <MasterSkuDetail
                                        getValues={master.getValues}
                                        setValue={master.setValue}
                                        watch={master.watch}
                                        errors={master.errors}
                                        actype={master.actype}
                                        setError={master.setError}
                                        clearErrors={master.clearErrors}
                                    />
                                </TabPanel>
                                {/* <TabPanel value="2">
                                {'jkjbk,b'}
                            </TabPanel> */}

                            </TabContext>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
};

export default MasterSkuFrom;