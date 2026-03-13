import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import closeIcon from '../../../../../../assets/svg/icon/close.svg';

export interface IHeaderProps {
    onClose: () => any;
    buttonLabel: string;
    title: string;
    onSubmit?: () => any;
    underLine?: boolean;
    isLoad: boolean
}

const Header: React.FunctionComponent<IHeaderProps> = ({ underLine = true, ...props }) => {
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderBottom={underLine ? '1px solid #E9ECEF' : 'none'} pb={2} px={4}>
            <Box width={'200px'}>
                <Button variant="contained" color="warning" size="large" onClick={props.onClose}>
                    <img src={closeIcon} />
                </Button>
            </Box>

            <Typography variant="h3">{props.title} </Typography>
            <Box width={'200px'} display={'flex'} justifyContent={'end'} >
                <Button variant="contained" size="large" onClick={props.onSubmit} type="submit" loading={props.isLoad}>
                    {props.buttonLabel}
                </Button>
            </Box>
        </Box>
    );
};

export default Header;
