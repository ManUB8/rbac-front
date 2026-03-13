import { Box, Button, Chip, Typography } from '@mui/material';
import React from 'react';
import downloadIcon from '../../../../../../assets/svg/icon/download.svg';

export interface IHeaderProps {
    total: number;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return (
        <Box display={'flex'} alignItems={'center'} gap={2}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <Typography variant="h5">จัดการหน่วย</Typography>
                <Chip label={`${props.total} รายการ`} />
            </Box>
            {/* <Button variant="contained" color="warning" size="large"  >
                <img src={downloadIcon} />
            </Button> */}
        </Box>
    );
};

export default Header;
