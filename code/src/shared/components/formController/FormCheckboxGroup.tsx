import { Grid, FormControlLabel, Checkbox, FormGroup } from '@mui/material';


import { Controller, type Control, type FieldPath } from 'react-hook-form';

export interface DocumentFormValues {}

type CheckDirection = 'row' | 'column';

export interface IFormCheckboxGroupProps<T extends DocumentFormValues> {
    control: Control<T | any>;
    name: FieldPath<T | any>;
    options: { label: string; value: number }[];
    spacing?: number;
    direction?: CheckDirection;
    isRequire?: number; // 1 = ต้องมีอย่างน้อย 1 item
}

function FormCheckboxGroup<T extends DocumentFormValues>({ control, name, options, spacing = 1, direction = 'column', isRequire = 0 }: IFormCheckboxGroupProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const selectedList: { label: string; value: number }[] = Array.isArray(field.value) ? field.value : [];

                const handleToggle = (checked: boolean, opt: { label: string; value: number }) => {
                    const exists = selectedList.some((x) => x.value === opt.value);

                    // ---- ถ้าไม่เลือกอะไรเลย และ require = 1 → ห้าม uncheck อันสุดท้าย ----
                    if (!checked && isRequire === 1 && selectedList.length <= 1) {
                        return; // block การ uncheck
                    }

                    let next = [];

                    if (checked) {
                        next = [...selectedList, opt];
                    } else {
                        next = selectedList.filter((x) => x.value !== opt.value);
                    }

                    field.onChange(next);
                };

                return (
                    <FormGroup row={direction === 'row'}>
                        {options.map((opt) => {
                            const isChecked = selectedList.some((x) => x.value === opt.value);

                            return (
                                <FormControlLabel
                                    key={opt.value}
                                    control={
                                        <Checkbox
                                            checked={isChecked}
                                            onChange={(e) => handleToggle(e.target.checked, opt)}
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
                            );
                        })}
                    </FormGroup>
                );
            }}
        />
    );
}

export default FormCheckboxGroup;
