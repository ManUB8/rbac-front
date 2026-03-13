import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import FormTextField from '../../../../../../shared/components/formController/FormTextField';
import AddIcon from '@mui/icons-material/Add';
import type { FormValueCreate } from '../../interface/ManageInventoryCreate.interface';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

export interface ISubFormProps {
    control: Control<FormValueCreate>;
}

const SubForm: React.FunctionComponent<ISubFormProps> = (props) => {
    const { control } = props;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'groupSubList'
    });

    const handleAdd = () => {
        append({
            groupSubName: '',
            groupSubCode: ''
        });
    };

    return (
        <Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}  mb={2}>
                <Typography variant="h6">{`หมวดหมู่ย่อย (${fields.length} รายการ)`}</Typography>
                <Button variant="contained" size="large" onClick={handleAdd}>
                    <Box display={'flex'} alignItems={'center'}>
                        <AddIcon sx={{ height: '20px' }} />
                        เพิ่มหมวดหมู่ย่อย
                    </Box>
                </Button>
            </Box>

            {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id} mb={2}>
                    {index === 0 && (
                        <>
                            <Grid size={{ xs: 12, md: 6 }} >
                                <Typography variant="subtitle1">ชื่อหมวดหมู่ย่อย</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} >
                                <Typography variant="subtitle1">รหัส หมวดหมู่ย่อย</Typography>
                            </Grid>
                        </>
                    )}
                    <Grid size={{ xs: 12, md: 6 }} >
                        <FormTextField label="หมวดหมู่ย่อย" name={`groupSubList.${index}.groupSubName`} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}  display="flex" alignItems="center" gap={1}>
                        <Box flex={1}>
                            <FormTextField label="รหัส" name={`groupSubList.${index}.groupSubCode`} />
                        </Box>

                        <Button variant="text" color="inherit" onClick={() => remove(index)} >
                            X
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default SubForm;
