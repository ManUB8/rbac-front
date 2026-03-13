import { Box, Stack } from '@mui/material';
import React from 'react';
import { useMasterSupplier } from '../hook/useMasterSupplier';
import Header from '../components/masterSupplierPage/Header';
import TabsZone from '../components/masterSupplierPage/TabsZone';
import Filter from '../components/masterSupplierPage/Filter';
import TableDetail from '../components/masterSupplierPage/TableDetail';
import PopupConfirmSupplier from '../components/popup/PopupConfirmSupplier';

export interface IMasterSupplierPageProps { }

const MasterSupplierPage: React.FunctionComponent<IMasterSupplierPageProps> = (props) => {
    const useMasterSupplierController = useMasterSupplier();
    return (
        <>
            {useMasterSupplierController.contextHolder}

            <PopupConfirmSupplier
                buttonLabel={'บันทึก'}
                handleClose={useMasterSupplierController.handleCloseConfirmPopup}
                isLoad={useMasterSupplierController.isLoad}
                open={useMasterSupplierController.openConfirmPopup}
                title="อัปโหลดข้อมูล"
                detail="กรุณาตรวจสอบการเปิดสิทธิ์เข้าถึงไฟล์้เป็น Anyone with the link Editor โดยที่ต้องอัปโหลดจากไฟล์เทมเพลตที่กำหนดเท่านั้น "
                methods={useMasterSupplierController.methods}
                onSubmit={useMasterSupplierController.onSubmit}
                onError={useMasterSupplierController.onError}
            />
            <Stack spacing={4}>
                <Header
                    handleOpenConfirmPopup={useMasterSupplierController.handleOpenConfirmPopup}
                    total={useMasterSupplierController.tabSelect.value === 0 ? useMasterSupplierController.masterSupplier?.total : useMasterSupplierController.masterProductSupplier?.total}
                />
                <TabsZone tabList={useMasterSupplierController.tabList} tabSelect={useMasterSupplierController.tabSelect} handleChangeTab={useMasterSupplierController.handleChangeTab} />

                <Filter useMasterSupplierController={useMasterSupplierController} />
                
                {useMasterSupplierController.tabSelect.value === 0 && (
                    <TableDetail
                        list={useMasterSupplierController.masterSupplier?.list}
                        total={useMasterSupplierController.masterSupplier?.total}
                        isLoad={useMasterSupplierController.isLoad}
                        useMasterSupplierController={useMasterSupplierController}
                    />
                )}
                {useMasterSupplierController.tabSelect.value === 1 && (
                    <TableDetail
                        list={useMasterSupplierController.masterProductSupplier?.list}
                        total={useMasterSupplierController.masterProductSupplier?.total}
                        isLoad={useMasterSupplierController.isLoad}
                        useMasterSupplierController={useMasterSupplierController}
                    />
                )}
            </Stack>
        </>
    );
};

export default MasterSupplierPage;
