import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import SearchOrder from '../../../../../../shared/components/search/SearchOrder';
import { useHandleChangeSearch } from '../../../../../owner/hook/handleFunction';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import type { ICreatePopupMode, ITempItem } from '../../interface/manageTemp.interface';

export interface IFilterProps {
    searchText: string;
    handleOpenCreatePopup: (mode: ICreatePopupMode, row?: ITempItem) => void;
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
            <Button variant="contained" size="large" startIcon={<AddIcon sx={{ height: '20px' }} />} onClick={() => props.handleOpenCreatePopup('create')}>
                เพิ่ม การเก็บรักษา
            </Button>
        </Box>
    );
};

export default Filter;
