import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { Box, InputAdornment, Typography } from '@mui/material';

type IVariantType = 'text' | 'number';

interface FormTextFieldProps extends Omit<TextFieldProps, 'name' | 'label'> {
    name: string;
    label: string;
    fontSize?: number;
    backLabel?: string;
    variantType?: IVariantType;
    spinnerButtons?: boolean;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ name, label, size = 'small', fullWidth = true, backLabel, variantType = 'text', spinnerButtons = false, ...props }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    const [focused, setFocused] = React.useState(false);

    return (
        <>
            {variantType === 'text' && (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={label}
                            variant="filled"
                            autoComplete="off"
                            size={size}
                            fullWidth={fullWidth}
                            error={!!errors[name]}
                            helperText={(errors[name] as any)?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography variant='subtitle2'>
                                                {backLabel}
                                            </Typography>{' '}
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
            )}
            {variantType === 'number' && (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const value = field.value || '';

                        const handleIncrease = () => {
                            const newVal = (Number(field.value) || 0) + 1;
                            field.onChange(newVal.toString());
                        };

                        const handleDecrease = () => {
                            const newVal = (Number(field.value) || 0) - 1;
                            field.onChange(newVal.toString());
                        };

                        return (
                            <TextField
                                {...field}
                                type="number"
                                autoComplete="off"
                                label={label}
                                variant="filled"
                                fullWidth
                                error={!!errors[name]}
                                helperText={(errors[name] as any)?.message}
                                value={value}
                                onChange={(e) => field.onChange(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {!backLabel && spinnerButtons && (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        mr: 0.5
                                                    }}
                                                >
                                                    <Typography
                                                        onClick={handleIncrease}
                                                        fontSize={18}
                                                        fontWeight={400}
                                                        color="#0B0A0A"
                                                        sx={{
                                                            userSelect: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'all 100ms ease',
                                                            '&:hover': {
                                                                transform: 'scale(1.5)'
                                                            },
                                                            '&:active': {
                                                                transform: 'scale(1.2)'
                                                            }
                                                        }}
                                                    >
                                                        +
                                                    </Typography>

                                                    <Typography
                                                        onClick={handleDecrease}
                                                        fontSize={18}
                                                        fontWeight={400}
                                                        color="#0B0A0A"
                                                        sx={{
                                                            userSelect: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'all 100ms ease',
                                                            '&:hover': {
                                                                transform: 'scale(1.5)'
                                                            },
                                                            '&:active': {
                                                                transform: 'scale(1.2)'
                                                            }
                                                        }}
                                                    >
                                                        -
                                                    </Typography>
                                                </Box>
                                            )}
                                            {backLabel && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {spinnerButtons && (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 0.5 }}>
                                                            <Typography
                                                                onClick={handleIncrease}
                                                                fontSize={18}
                                                                fontWeight={400}
                                                                color="#0B0A0A"
                                                                sx={{
                                                                    userSelect: 'none',
                                                                    cursor: 'pointer',
                                                                    lineHeight: 1,
                                                                    transition: 'transform 100ms ease',
                                                                    '&:hover': { transform: 'scale(1.5)' },
                                                                    '&:active': { transform: 'scale(1.2)' }
                                                                }}
                                                            >
                                                                +
                                                            </Typography>
                                                            <Typography
                                                                onClick={handleDecrease}
                                                                fontSize={18}
                                                                fontWeight={400}
                                                                color="#0B0A0A"
                                                                sx={{
                                                                    userSelect: 'none',
                                                                    cursor: 'pointer',
                                                                    lineHeight: 1,
                                                                    transition: 'transform 100ms ease',
                                                                    '&:hover': { transform: 'scale(1.5)' },
                                                                    '&:active': { transform: 'scale(1.2)' }
                                                                }}
                                                            >
                                                                -
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    <Typography variant='subtitle2' color="#6B7274" sx={{ userSelect: 'none' }}>
                                                        {backLabel}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </InputAdornment>
                                    ),
                                    inputMode: 'numeric'
                                }}
                                sx={{
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield', // Firefox
                                        appearance: 'textfield' // Safari/iOS ใหม่ ๆ
                                    },
                                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                        WebkitAppearance: 'none', // Chrome/Edge/Safari
                                        margin: 0
                                    },
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: 'transparent',
                                        border: '1px solid #C0C8CB',
                                        height: '56px',
                                        borderRadius: '4px',


                                        '&:before, &:after': { borderBottom: 'none', bgcolor: 'transparent !important' },
                                        '&:hover:before': { borderBottom: 'none', bgcolor: 'transparent !important' }
                                    },
                                    '& .MuiInputLabel-root.MuiFormLabel-filled': {
                                        color: '#1C1B1B !important' // ตอนมีค่าใน input
                                    },
                                    '& .MuiInputLabel-root': {
                                        // fontSize: props.fontSize,
                                        // fontWeight: 500,
                                        color: '#6B7274 !important'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1C1B1B !important'
                                    },
                                    '& .MuiFormHelperText-root': {
                                        fontSize: '12px',
                                        color: '#BA1A1A !important'
                                    }
                                }}
                                onFocus={(e) => {
                                    // field.onFocus?.(e);
                                    setFocused(true);
                                }}
                                onBlur={(e) => {
                                    field.onBlur();
                                    setFocused(false);
                                }}
                                InputLabelProps={{ shrink: focused || Boolean(field.value) }}
                            />
                        );
                    }}
                />
            )}
        </>
    );
};

export default FormTextField;
