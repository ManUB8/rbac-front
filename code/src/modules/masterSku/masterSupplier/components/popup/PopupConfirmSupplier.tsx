import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress, DialogContentText, Grid, TextField } from '@mui/material';

import CloseIcon from '../../../../../assets/svg/icon/close.svg';
import FormTextField from '../../../../../shared/components/formController/FormTextField';
import { FormProvider, type UseFormReturn } from 'react-hook-form';
import type { IFormValuesImportMasterSupplier } from '../../interface/MasterSupplier.interface';


export interface IPopupConfirmProps {
    open: boolean;
    handleClose: () => void;
    buttonLabel: string;
    title: string;
    detail: string;
    isLoad: boolean
    methods: UseFormReturn<IFormValuesImportMasterSupplier>
    onSubmit: (data: IFormValuesImportMasterSupplier) => void
    onError: (errors: any) => void
}

const PopupConfirmSupplier: React.FunctionComponent<IPopupConfirmProps> = (props) => {
    

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={props.open}
                onClose={!props.isLoad ? props.handleClose : undefined} // ← มีแล้ว ok
                slotProps={{
                    paper: {
                        sx: { borderRadius: 2.5, p: 3 }
                    }
                }}
                disableEscapeKeyDown={false}
            >
                <FormProvider {...props.methods}>
                    <form onSubmit={props.methods.handleSubmit(props.onSubmit, props.onError)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <IconButton onClick={props.handleClose} disabled={props.isLoad} sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#F3F5F7', '&:hover': { bgcolor: '#E9ECEF' } }}>
                                <img src={CloseIcon} alt="close" />
                            </IconButton>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" size='large' type="submit" loading={props.isLoad}>
                                    {props.buttonLabel}
                                </Button>
                            </Box>
                        </Box>

                        <DialogContent>
                            <DialogContentText
                                sx={{
                                    textAlign: 'left',
                                    typography: 'h3',
                                    color: '#1C1B1B'
                                }}
                                dangerouslySetInnerHTML={{ __html: props.title }}
                            />
                            <Typography variant="subtitle2" color='#6B7274' fontWeight={400} sx={{ textAlign: 'left', mb: 2 }} dangerouslySetInnerHTML={{ __html: props.detail }} />
                            <FormTextField label="URL" name="url" />
                        </DialogContent>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
};

export default PopupConfirmSupplier;
