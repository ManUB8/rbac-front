import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from '../components/manageUnitPage/Header';
import Filter from '../components/manageUnitPage/Filter';
import { useManageUnit } from '../hook/useManageUnit';
import TableDetail from '../components/manageUnitPage/TableDetail';
import PackagePagination from '../../../../product&services/package_services/components/packagepage/PackagePagination';
import CreatePopup from '../components/popup/CreatePopup';
import Pagination from '../../manageInventory/components/manageInvenPage/Pagination';

export interface IManageUnitPageProps {}

const ManageUnitPage: React.FunctionComponent<IManageUnitPageProps> = (props) => {
    const useManageUnitController = useManageUnit();
    return (
        <>
            {useManageUnitController.contextHolder}
            <CreatePopup
                methods={useManageUnitController.methods}
                onSubmit={useManageUnitController.onSubmit}
                onError={useManageUnitController.onError}
                openCreatePopup={useManageUnitController.openCreatePopup}
                handleCloseCreatePopup={useManageUnitController.handleCloseCreatePopup}
                isLoad={useManageUnitController.isLoad}
            />
            <Stack spacing={4}>
                <Header total={useManageUnitController.getAllData?.total || 0} />
                {/* <Filter searchText={useManageUnitController.searchText} handleOpenCreatePopup={useManageUnitController.handleOpenCreatePopup} /> */}

                <TableDetail getAllData={useManageUnitController.getAllData} handleOpenCreatePopup={useManageUnitController.handleOpenCreatePopup} isLoad={useManageUnitController.isLoad} />
                <Pagination
                    total={Number(useManageUnitController.getAllData?.total)}
                    limit={useManageUnitController.limit}
                    page={useManageUnitController.page}
                    setlimit={useManageUnitController.setLimit}
                    setpage={useManageUnitController.setPage}
                />
            </Stack>
        </>
    );
};

export default ManageUnitPage;
