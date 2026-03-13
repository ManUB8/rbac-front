import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import Header from '../Header';

export interface IConfirmPoppupProps {
    isLoad: boolean;
    handleClose: () => void;
    open: boolean;
    onSubmit: () => Promise<void>;
    title: string;
    detail: string;
}

const ConfirmPoppup: React.FunctionComponent<IConfirmPoppupProps> = (props) => {
    return (
        <Modal open={props.open} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box bgcolor={'white'} minWidth={700} maxWidth={1200} py={4} m={'auto'} borderRadius={2}>
                <Header buttonLabel="ยืนยัน" isLoad={props.isLoad} onClose={props.handleClose} onSubmit={props.onSubmit} title="" underLine={false} />
                <Box px={4}>
                    <Typography variant="h3">{props.title} </Typography>
                    <Typography variant="subtitle2" color="gray">
                        {props.detail}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmPoppup;
