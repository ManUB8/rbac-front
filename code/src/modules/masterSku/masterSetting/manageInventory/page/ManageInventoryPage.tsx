import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from '../components/manageInvenPage/Header';
import TabsDetail from '../components/manageInvenPage/TabsDetail';
import { useManageInven } from '../hook/useManageInven';
import TableDetail from '../components/manageInvenPage/TableDetail';
import Filter from '../components/manageInvenPage/Filter';
import Pagination from '../components/manageInvenPage/Pagination';

export interface IManageInventoryPageProps {}

const ManageInventoryPage: React.FunctionComponent<IManageInventoryPageProps> = (props) => {
    const useManageInvenController = useManageInven();

    return (
        <Stack spacing={4}>
            <Header total={Number(useManageInvenController.masterInvenList?.total) || 0} />
            <TabsDetail handleChangeTab={useManageInvenController.handleChangeTab} tabList={useManageInvenController.tabList} tabSelect={useManageInvenController.tabSelect} />
            {/* <Filter searchText={useManageInvenController.searchText} /> */}
            <Box>
                <TableDetail list={useManageInvenController.masterInvenList} isLoad={useManageInvenController.isLoad} />
                <Pagination
                    total={Number(useManageInvenController.masterInvenList?.total)}
                    limit={useManageInvenController.limit}
                    page={useManageInvenController.page}
                    setlimit={useManageInvenController.setLimit}
                    setpage={useManageInvenController.setPage}
                />
            </Box>
        </Stack>
    );
};

export default ManageInventoryPage;
