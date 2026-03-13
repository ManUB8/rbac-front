import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import Header from '../components/manageInvenCreatePage/Header';
import { useNavigate } from 'react-router';
import ImgDetail from '../components/manageInvenCreatePage/ImgDetail';
import { useManageInvenCreate } from '../hook/useManageInvenCreate';
import { FormProvider } from 'react-hook-form';
import MainForm from '../components/manageInvenCreatePage/MainForm';
import SubForm from '../components/manageInvenCreatePage/SubForm';
import EditImgPopup from '../components/manageInvenCreatePage/popup/EditImgPopup';
import { useModalHeader } from '../../../../../shared/components/layouts/ModalHeaderContext';
import PopupConfirm from '../../../../../shared/components/popup/PopupConfirm';
import PopupConfirmSupplier from '../../../masterSupplier/components/popup/PopupConfirmSupplier';
import ConfirmPoppup from '../components/manageInvenCreatePage/popup/ConfirmPopup';

export interface IManageInventoryCreatePageProps {}

const ManageInventoryCreatePage: React.FunctionComponent<IManageInventoryCreatePageProps> = (props) => {
    const navigate = useNavigate();
    const { setTitle, setActions } = useModalHeader();
    const useManageInvenCreateController = useManageInvenCreate();

    const headerButtons = useMemo(() => {
        return [
            <Button key="submit" type="submit" variant="contained" form="inventory-form">
                <Typography variant="button">{'บันทึก'}</Typography>
            </Button>
        ];
    }, [navigate]);

    useEffect(() => {
        setActions(headerButtons);
    }, [setTitle, setActions, headerButtons]);

    useEffect(() => {
        console.log('watch ', useManageInvenCreateController.watch());
    }, [useManageInvenCreateController.watch()]);

    return (
        <>
            <EditImgPopup useManageInvenCreateController={useManageInvenCreateController} />
            <ConfirmPoppup
                isLoad={useManageInvenCreateController.isLoad}
                handleClose={useManageInvenCreateController.handleCloseConfirmPopup}
                open={useManageInvenCreateController.openConfirmPopup}
                onSubmit={useManageInvenCreateController.createInvenApi}
                detail="โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกหมวดหมู่สินค้าคงคลัง"
                title="ยืนยันการบันทึกหมวดหมู่สินค้าคงคลัง"
            />

            <ConfirmPoppup
                isLoad={useManageInvenCreateController.isLoad}
                handleClose={useManageInvenCreateController.handleCloseConfirmPutPopup}
                open={useManageInvenCreateController.openConfirmPutPopup}
                onSubmit={useManageInvenCreateController.putInvenApi}
                detail="โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกหมวดหมู่สินค้าคงคลัง"
                title="ยืนยันการบันทึกหมวดหมู่สินค้าคงคลัง"
            />

            {useManageInvenCreateController.contextHolder}
            <FormProvider {...useManageInvenCreateController.methods}>
                <form id="inventory-form" onSubmit={useManageInvenCreateController.methods.handleSubmit(useManageInvenCreateController.onSubmit, useManageInvenCreateController.onError)}>
                    {/* <Header buttonLabel="ยืนยัน" onClose={() => navigate(-1)} title="แก้ไขหมวดหมู่สินค้า" isLoad={isLoad} /> */}
                    <Stack height={'calc(100vh - 120px)'} overflow={'auto'} spacing={2} pt={6}>
                        <ImgDetail useManageInvenCreateController={useManageInvenCreateController} />
                        <MainForm />
                        <Divider sx={{ borderBottom: '8px solid #C0C8CB40' }} />
                        <SubForm control={useManageInvenCreateController.control} />
                    </Stack>
                </form>
            </FormProvider>
        </>
    );
};

export default ManageInventoryCreatePage;
