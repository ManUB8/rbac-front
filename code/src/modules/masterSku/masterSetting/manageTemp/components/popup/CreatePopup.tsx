import { Box, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import Header from '../../../manageInventory/components/manageInvenCreatePage/Header';
import { FormProvider, type UseFormReturn } from 'react-hook-form';
import type { FormValueManageTemp } from '../../interface/manageTemp.interface';
import FormTextField from '../../../../../../shared/components/formController/FormTextField';

export interface ICreatePopupProps {
    isLoad: boolean;
    openCreatePopup: boolean;
    handleCloseCreatePopup: () => void;
    methods: UseFormReturn<FormValueManageTemp>;
    onSubmit: (data: { name: string; temp: string }) => void;
    onError: (errors: any) => void;
}

const CreatePopup: React.FunctionComponent<ICreatePopupProps> = (props) => {
    return (
        <Modal open={props.openCreatePopup} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box bgcolor={'white'} minWidth={700} maxWidth={1200} py={3} borderRadius={2}>
                <FormProvider {...props.methods}>
                    <form onSubmit={props.methods.handleSubmit(props.onSubmit, props.onError)}>
                        <Header buttonLabel="เพิ่ม" isLoad={props.isLoad} onClose={props.handleCloseCreatePopup} title="" underLine={false} />
                        <Stack px={4} spacing={2} mt={2}>
                            <Typography variant="h6">การเก็บรักษา</Typography>
                            <Box display={'flex'} gap={2}>
                                <Stack spacing={1} width={'50%'}>
                                    <Typography variant="subtitle1">
                                        ชื่อการเก็บรักษา <span style={{ color: 'red' }}>*</span>{' '}
                                    </Typography>
                                    <FormTextField label="ชื่อ" name="name"  />
                                </Stack>
                                <Stack spacing={1} width={'50%'}>
                                    <Typography variant="subtitle1">
                                        ช่วงอุณหภูมิ <span style={{ color: 'red' }}>*</span>{' '}
                                    </Typography>
                                    <FormTextField label="อุณหภูมิ" name="temp" backLabel='°C' />
                                </Stack>
                            </Box>
                        </Stack>
                    </form>
                </FormProvider>
            </Box>
        </Modal>
    );
};

export default CreatePopup;
