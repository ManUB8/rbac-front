import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import SearchOrder from '../../../../../../shared/components/search/SearchOrder';
import { useHandleChangeSearch } from '../../../../../owner/hook/handleFunction';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { AppRoutes } from '../../../../../../router/router';

export interface IFilterProps {
    searchText: string;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
    const navigate = useNavigate();
    return (
        <Box display={'flex'} gap={2} alignItems={'center'}>
            <Box width={'700px'}>
                <SearchOrder
                    searchValue={props.searchText}
                    handleChangeSearch={(e: any) => {
                        const sear = e.target.value;
                        console.log('SearchOrder', sear);
                        useHandleChangeSearch(sear);
                    }}
                />
            </Box>
            {/* <Button variant="contained" color='secondary' size="large" onClick={() => navigate('create/0')}> */}
            <Button variant="contained" size="large" startIcon={<AddIcon sx={{ height: '20px' }} />} onClick={() => navigate(`${AppRoutes.InventoryCategory}/create/0`)}>
                เพิ่ม หมวดหมู่สินค้า
            </Button>
        </Box>
    );
};

export default Filter;
