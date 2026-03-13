import React, { useEffect, useRef, useState } from 'react';
import { Modal, Stack, Grid, Typography, Button, Box } from '@mui/material';
import closeIcon from '../../../../../../../assets/svg/icon/close.svg';
import noImg from '../../../../../../../assets/image/nophoto.jpg';

import FilterIcon from '@mui/icons-material/Filter';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';
import binIcon from '../../../../../../../assets/svg/icon/redbin.svg';
import type { IuseManageInvenCreate } from '../../../hook/useManageInvenCreate';
import { useManageInvenEditImg } from '../../../hook/useManageInvenEditImg';

export interface IConfirmPopupProps {
    useManageInvenCreateController: IuseManageInvenCreate;
}

const stylePopupConfirm = {
    width: '100%',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

const EditImgPopup: React.FunctionComponent<IConfirmPopupProps> = (props) => {
    const useManageInvenEditImgController = useManageInvenEditImg(props.useManageInvenCreateController);

    return (
        <>
            {useManageInvenEditImgController.contextHolder}
            <Modal open={props.useManageInvenCreateController.openEditImgPopup} onClose={props.useManageInvenCreateController.handleCloseEditImgPopup}>
                <Grid container justifyContent={'center'} alignItems={'center'} height={'100%'}>
                    <Grid size={{ xs: 10, md: 5 }}>
                        <Stack sx={{ ...stylePopupConfirm, display: 'flex', flexDirection: 'column' }} gap={2}>
                            <Grid container justifyContent="space-between" mb={2}>
                                <Button
                                    onClick={props.useManageInvenCreateController.handleCloseEditImgPopup}
                                    sx={{
                                        backgroundColor: '#FAFAFA',
                                        border: 'none',
                                        p: 3,
                                        fontWeight: 700,
                                        borderRadius: '4px',
                                        color: '#014AC5',
                                        transition: 'all 200ms ease',
                                        '&:hover': { backgroundColor: '#e6e6e6', borderRadius: '8px' },
                                        mb: { xs: 1, md: 0 }
                                    }}
                                >
                                    <img src={closeIcon} />
                                </Button>
                                <Box>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        loading={props.useManageInvenCreateController.isLoad}
                                        type="submit"
                                        onClick={useManageInvenEditImgController.handleConfirm}
                                    >
                                        บันทึก
                                    </Button>
                                </Box>
                            </Grid>
                            <Typography variant="h3">รูปภาพ</Typography>
                            <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center" py={2}>
                                <Box
                                    // width={148}
                                    height={240}
                                    sx={{
                                        backgroundColor: '#F2F2F2',
                                        border: '1px solid #BDBDBD',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={useManageInvenEditImgController.previewUrl || noImg}
                                        alt="preview"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            imageRendering: 'auto'
                                        }}
                                    />
                                </Box>
                                <Typography variant="body2" color="#6B7274" textAlign="center">
                                    {useManageInvenEditImgController.imageSize
                                        ? `รูปภาพขนาด ${useManageInvenEditImgController.imageSize.width} x ${useManageInvenEditImgController.imageSize.height} px`
                                        : ''}
                                </Typography>
                            </Box>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                bgcolor={'#FBBF14'}
                                py={'12px'}
                                px={'12px'}
                                borderRadius={1}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#d7a20fff'
                                    }
                                }}
                                gap={'12px'}
                                onClick={useManageInvenEditImgController.handleClick}
                            >
                                <FilterIcon sx={{ height: '24px' }} />
                                <Typography variant="subtitle1" fontWeight={400}>
                                    คลังรูปภาพ
                                </Typography>
                            </Box>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                py={'12px'}
                                px={'12px'}
                                borderRadius={1}
                                sx={{
                                    transition: 'background-color 0.2s ease',
                                    cursor: useManageInvenEditImgController.hasImage ? 'pointer' : 'not-allowed',
                                    opacity: useManageInvenEditImgController.hasImage ? 1 : 0.5,
                                    pointerEvents: useManageInvenEditImgController.hasImage ? 'auto' : 'none',
                                    '&:hover': { backgroundColor: useManageInvenEditImgController.hasImage ? 'rgba(73, 69, 79, 0.08)' : 'transparent' }
                                }}
                                gap={'12px'}
                                onClick={useManageInvenEditImgController.hasImage ? useManageInvenEditImgController.handleRemove : undefined}
                                aria-disabled={!useManageInvenEditImgController.hasImage}
                            >
                                <img src={binIcon} height={24} />
                                <Typography variant="subtitle1" fontWeight={400}>
                                    ลบรูป
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Modal>
            <input type="file" accept="image/*" ref={useManageInvenEditImgController.fileInputRef} style={{ display: 'none' }} onChange={useManageInvenEditImgController.handleFileChange} />
        </>
    );
};

export default EditImgPopup;
