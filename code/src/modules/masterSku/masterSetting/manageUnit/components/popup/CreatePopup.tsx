import { Box, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import Header from '../../../manageInventory/components/manageInvenCreatePage/Header';
import { FormProvider, type UseFormReturn } from 'react-hook-form';
import type { FormValueManageUnit } from '../../interface/manageUnit.interface';
import FormTextField from '../../../../../../shared/components/formController/FormTextField';

export interface ICreatePopupProps {
    isLoad: boolean;
    openCreatePopup: boolean;
    handleCloseCreatePopup: () => void;
    methods: UseFormReturn<FormValueManageUnit>;
    onSubmit: (data: { unitName: string; abbUnitName: string }) => void;
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
                            <Stack spacing={1}>
                                <Typography variant="h6">
                                    ชื่อหน่วย <span style={{ color: 'red' }}>*</span>{' '}
                                </Typography>
                                <Typography variant="subtitle2" color="#6B7274">
                                    หน่วยจะถูกนำไปแสดงผลทั้งระบบ
                                </Typography>
                                <FormTextField label="ชื่อหน่วย" name="unitName" />
                            </Stack>
                        </Stack>
                        <Stack px={4} spacing={2} mt={2}>
                            <Stack spacing={1}>
                                <Typography variant="h6">
                                    หน่วยย่อ <span style={{ color: 'red' }}>*</span>{' '}
                                </Typography>
                                <FormTextField label="ชื่อหน่วยย่อ" name="abbUnitName" />
                            </Stack>
                        </Stack>
                    </form>
                </FormProvider>
            </Box>
        </Modal>
    );
};

export default CreatePopup;
