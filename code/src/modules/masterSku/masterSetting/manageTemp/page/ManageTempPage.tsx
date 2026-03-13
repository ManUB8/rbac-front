import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from '../components/manageTempPage/Header';
import Filter from '../components/manageTempPage/Filter';
import { useManageTemp } from '../hook/useManageTemp';
import TableDetail from '../components/manageTempPage/TableDetail';
import PackagePagination from '../../../../product&services/package_services/components/packagepage/PackagePagination';
import CreatePopup from '../components/popup/CreatePopup';
import Pagination from '../../manageInventory/components/manageInvenPage/Pagination';

export interface IManageTempPageProps {}

const ManageTempPage: React.FunctionComponent<IManageTempPageProps> = (props) => {
    const useManageTempController = useManageTemp();
    return (
        <>
            {useManageTempController.contextHolder}
            <CreatePopup
                methods={useManageTempController.methods}
                onSubmit={useManageTempController.onSubmit}
                onError={useManageTempController.onError}
                openCreatePopup={useManageTempController.openCreatePopup}
                handleCloseCreatePopup={useManageTempController.handleCloseCreatePopup}
                isLoad={useManageTempController.isLoad}
            />
            <Stack spacing={4}>
                <Header total={useManageTempController.getAllData?.total || 0} />
                {/* <Filter searchText={useManageTempController.searchText} handleOpenCreatePopup={useManageTempController.handleOpenCreatePopup} /> */}

                <TableDetail getAllData={useManageTempController.getAllData} handleOpenCreatePopup={useManageTempController.handleOpenCreatePopup} isLoad={useManageTempController.isLoad} />
                <Pagination
                    total={Number(useManageTempController.getAllData?.total)}
                    limit={useManageTempController.limit}
                    page={useManageTempController.page}
                    setlimit={useManageTempController.setLimit}
                    setpage={useManageTempController.setPage}
                />
            </Stack>
        </>
    );
};

export default ManageTempPage;
