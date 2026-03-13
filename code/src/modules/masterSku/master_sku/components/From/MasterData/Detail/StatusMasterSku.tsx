import React from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IMasterSkuData } from '../../../../interface/MadterSku.interface';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { ENUM } from '../../../../../../../shared/components/Enum';
import { Status_active } from '../../../../constants/sku_option';

export interface IStatusMasterSkuProps {
    getValues: UseFormGetValues<IMasterSkuData>
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
};

const StatusMasterSku: React.FunctionComponent<IStatusMasterSkuProps> = ({
    getValues,
    setValue,
    errors,
    watch,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                <FormControl>
                    <FormLabel
                        id="active-type-label"
                        sx={{
                            color: 'text.primary',
                            '&.Mui-focused': { color: 'text.primary' },   // กันหายตอนโฟกัส
                            mb: 1, mt: 1,
                        }}
                    >
                        <Typography variant="h6" component="span">
                            {"สถานะการใช้งาน"}
                        </Typography>
                    </FormLabel>

                    <RadioGroup
                        row
                        aria-labelledby="active-type-label"
                        name="row-radio-buttons-group"
                        value={getValues('is_active') ? 1 : 0}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setValue('is_active', val === 1);
                        }}
                    >
                        {Status_active.map((ac) => (
                            <FormControlLabel
                                key={ac.value}
                                value={ac.value}
                                control={<Radio />}
                                label={<Typography variant="subtitle2">{ac.label}</Typography>}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
    )
};

export default StatusMasterSku;