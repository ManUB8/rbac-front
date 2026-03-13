import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import FormTextField from '../../../../../../shared/components/formController/FormTextField';

export interface IMainFormProps {}

const MainForm: React.FunctionComponent<IMainFormProps> = (props) => {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                หมวดหมู่หลัก
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Typography variant="subtitle1">
                        ชื่อหมวดหมู่หลัก <span style={{ color: 'red' }}>*</span>{' '}
                    </Typography>
                    <FormTextField label="หมวดหมู่หลัก" name="groupMainName" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Typography variant="subtitle1">
                        รหัส หมวดหมู่หลัก <span style={{ color: 'red' }}>*</span>{' '}
                    </Typography>
                    <FormTextField label="รหัส" name="groupMainCode" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainForm;
