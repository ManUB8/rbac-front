import { Box, Button, Chip, Typography } from '@mui/material';
import React from 'react';
import downloadIcon from '../../../../../assets/svg/icon/download.svg';
import uploadIcon from '../../../../../assets/svg/icon/cloud_upload.svg';
import AddIcon from '@mui/icons-material/Add';

export interface IHeaderProps {
    handleOpenConfirmPopup: () => void;
    total: number | undefined
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography variant="h5">Master Supplier</Typography>
                {/* <Chip label={`${props.total} รายการ`} /> */}
                <Chip label={`${Number(props.total || 0).toLocaleString('th-TH')} รายการ`} />


            </Box>

            <Box display={'flex'} gap={2} alignItems={'center'}>
                {/* <Button variant="contained" color="info" size="large" onClick={props.handleOpenConfirmPopup}>
                    <img src={uploadIcon} />
                </Button>
                <Button variant="contained" color="info" size="large" startIcon={<img src={downloadIcon} /> }>
                    มก ยังไม่มีปุ่มนี้
                </Button>
                <Button variant="contained" size="large" startIcon={<AddIcon />}>
                    เพิ่ม Supplier มก ยังไม่มีปุ่มนี้
                </Button> */}
            </Box>
        </Box>
    );
};

export default Header;
