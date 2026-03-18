import { Grid, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Controller, type Control, type FieldPath } from 'react-hook-form';
export interface DocumentFormValues {

}

type RadioDirection = 'row' | 'column';

export interface IFormRadioGroupProps<T extends DocumentFormValues> {
    control: Control<T | any>;
    name: FieldPath<T | any>;
    options: { label: string; value: number }[];
    spacing?: number;
    direction?: RadioDirection;
}

function FormRadioGroup<T extends DocumentFormValues>({ control, name, options, spacing = 1, direction = 'column' }: IFormRadioGroupProps<T>) {
    return (
        <>
            {direction === 'column' && (
                <Grid>
                    <Controller
                        name={name}
                        control={control}
                        // ไม่ใส่ defaultValue ที่นี่ ถ้ามีใน useForm แล้ว
                        render={({ field }) => {
                            // รองรับทั้งกรณีค่าปัจจุบันเป็น object หรือเป็น number
                            const currentNumber = typeof field.value === 'object' ? (field.value?.value as number | undefined) : (field.value as number | undefined);

                            return (
                                <RadioGroup
                                    row
                                    value={String(currentNumber ?? options[0]?.value ?? 0)}
                                    onChange={(e) => {
                                        const v = Number(e.target.value);
                                        const opt = options.find((o) => o.value === v);
                                        // เซ็ตกลับเป็น {label, value}
                                        field.onChange(opt ? { label: opt.label, value: opt.value } : { label: '', value: v });
                                    }}
                                >
                                    {options.map((opt) => (
                                        <FormControlLabel
                                            key={opt.value}
                                            value={String(opt.value)}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: '#C0C0C0',
                                                        '&.Mui-checked': { color: '#FBBF14' }
                                                    }}
                                                />
                                            }
                                            label={opt.label}
                                            sx={{
                                                mr: spacing,
                                                '& .MuiFormControlLabel-label': {
                                                    color: '#333',
                                                    fontSize: 16,
                                                    fontWeight: 500
                                                }
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            );
                        }}
                    />
                </Grid>
            )}
            {direction === 'row' && (
                <Controller
                    name={name}
                    control={control}
                    // อย่าใส่ defaultValue ที่นี่ ถ้าใช้ useForm.defaultValues อยู่แล้ว
                    render={({ field }) => {
                        const currentNumber = typeof field.value === 'object' ? (field.value?.value as number | undefined) : (field.value as number | undefined);

                        return (
                            <RadioGroup
                                value={String(currentNumber ?? options[0]?.value ?? 0)}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    const opt = options.find((o) => o.value === v);
                                    // เซ็ตกลับเป็นอ็อบเจกต์ {label, value}
                                    field.onChange(opt ? { label: opt.label, value: opt.value } : { label: '', value: v });
                                    
                                }}
                            >
                                {options.map((opt) => (
                                    <FormControlLabel
                                        key={opt.value}
                                        value={String(opt.value)}
                                        control={<Radio sx={{ color: '#C0C0C0', '&.Mui-checked': { color: '#FBBF14' } }} />}
                                        label={opt.label}
                                        sx={{
                                            '& .MuiFormControlLabel-label': { color: '#333', fontSize: 16, fontWeight: 500 }
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        );
                    }}
                />
            )}
        </>
    );
}

export default FormRadioGroup;
