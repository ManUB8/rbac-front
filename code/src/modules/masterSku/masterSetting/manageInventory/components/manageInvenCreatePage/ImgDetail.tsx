import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import noImg from '../../../../../../assets/image/nophoto.jpg';
import type { IuseManageInvenCreate } from '../../hook/useManageInvenCreate';

export interface IImgDetailProps {
    useManageInvenCreateController: IuseManageInvenCreate;
}

const ImgDetail: React.FunctionComponent<IImgDetailProps> = (props) => {
    return (
        <Box>
            <Box height="240px" overflow="hidden" display={'flex'} justifyContent={'center'} sx={{ cursor: 'pointer' }} onClick={props.useManageInvenCreateController.handleOpenEditImgPopup}>
                <Box
                    component="img"
                    src={props.useManageInvenCreateController.imgFile || noImg}
                    sx={{
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>
        </Box>
    );
};

export default ImgDetail;
