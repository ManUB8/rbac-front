import React from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import { Autocomplete, Box, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFetchOwnerType } from '../../hook/useFetchOwner';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export interface IRegisterOwnerProps {
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
    errors: FieldErrors<IOwnerItem>;
    watch: UseFormWatch<IOwnerItem>;
    actype: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RegisterOwner: React.FunctionComponent<IRegisterOwnerProps> = ({
    getValues,
    setValue,
    errors,
    actype
}) => {
    return (
        <>
            <Grid container paddingLeft={4} paddingBottom={2} >
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'ข้อมูลการสมัคร'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="LEAD ID"
                            variant="filled"
                            autoComplete="off"
                            fullWidth
                            value={getValues('lead_id') || ''}
                            onChange={(e) => setValue('lead_id', e.target.value)}
                        />
                        <TextField
                            label="Customer ID"
                            variant="filled"
                            autoComplete="off"
                            fullWidth
                            value={getValues('customer_id') || ''}
                            onChange={(e) => setValue('customer_id', e.target.value)}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                label="Sales"
                                variant="filled"
                                autoComplete="off"
                                fullWidth
                                value={getValues('sales') || ''}
                                onChange={(e) => {
                                    setValue('sales', e.target.value)
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }} /> {/* ช่องว่างอีกครึ่ง */}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default RegisterOwner;