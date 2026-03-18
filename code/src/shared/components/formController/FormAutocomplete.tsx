import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Typography } from '@mui/material';

interface OptionType {
    label: string;
    value: string;
    desc?: string; // ✅ เพิ่มคำอธิบายแต่ละตัวเลือก
}

interface FormAutocompleteProps extends Omit<AutocompleteProps<OptionType, false, false, false>, 'renderInput' | 'onChange' | 'value'> {
    name: string;
    label: string;
    fontSize: number;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = ({ name, label, options, fontSize, ...autocompleteProps }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    const error = (errors as any)[name];
    const errorMessage = error ? (error.message as string) : '';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...autocompleteProps}
                    options={options || []}
                    value={field.value || null}
                    onChange={(_, value) => field.onChange(value)}
                    getOptionLabel={(option) => (option ? option.label : '')}
                    isOptionEqualToValue={(option, value) => option.value === value?.value}
                    popupIcon={<KeyboardArrowDownIcon />}
                    forcePopupIcon
                    // disableClearable
                    // ✅ render ตัวเลือกเองให้มี "หัวข้อ + คำอธิบาย"
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            {...props}
                            sx={{
                                p: 1.5,
                                bgcolor: '#F8F8F8',
                                borderBottom: '1px solid #E0E0E0',
                                '&:hover': {
                                    backgroundColor: '#d5d5d5ff !important'
                                }
                            }}
                        >
                            <Stack>
                                <Typography variant='subtitle2'>
                                    {option.label}
                                </Typography>

                                <Typography fontSize={fontSize} color="#6B7274" fontWeight={40}>
                                    {option.desc}
                                </Typography>
                            </Stack>
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label={label} size="small" fullWidth variant="filled" error={!!error} helperText={errorMessage} />}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                borderRadius: 2,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                '& .MuiAutocomplete-listbox': {
                                    p: 0
                                },
                                '& .MuiAutocomplete-option[aria-selected="true"]': {
                                    bgcolor: '#e2e2e2ff !important'
                                }
                            }
                        }
                    }}
                />
            )}
        />
    );
};

export default FormAutocomplete;
