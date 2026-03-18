import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Switch, type SwitchProps, FormControlLabel, FormHelperText } from '@mui/material';

interface FormSwitchProps {
    name: string;
    label?: string;
}

const IOSSwitch = styled((props: SwitchProps) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
    width: 52,
    height: 28,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#FBBF14',
                opacity: 1,
                border: 0,
                ...theme.applyStyles?.('dark', {
                    backgroundColor: '#2ECA45'
                })
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles?.('dark', {
                color: theme.palette.grey[600]
            })
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles?.('dark', {
                opacity: 0.3
            })
        }
    },
    '& .MuiSwitch-thumb': {
        marginLeft: '1.5px',
        marginTop: '2px',
        boxSizing: 'border-box',
        width: 28,
        height: 20,
        borderRadius: '24px',
        boxShadow: 'none'
    },
    '& .MuiSwitch-track': {
        borderRadius: '100px',
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        }),
        ...theme.applyStyles?.('dark', {
            backgroundColor: '#39393D'
        })
    }
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 28,
    padding: 0,
    display: 'flex',

    '& .MuiSwitch-switchBase': {
        padding: 4,
        transitionDuration: '200ms',

        '&.Mui-checked': {
            transform: 'translateX(17px)',
            color: '#fff',

            '& + .MuiSwitch-track': {
                backgroundColor: '#FBBF14',
                opacity: 1,
                border: 'none'
            }
        }
    },

    '& .MuiSwitch-thumb': {
        width: 20,
        height: 12,
        borderRadius: 24,
        marginTop: 4,
        marginLeft: 3,
        boxShadow: 'none',
        backgroundColor: '#747878' // ⬅️ สีตอนปิด
    },

    '& .Mui-checked .MuiSwitch-thumb': {
        width: 28,
        height: 20,
        marginTop: 0,

        backgroundColor: '#FFFFFF' // ⬅️ สีตอนเปิด
    },

    '& .MuiSwitch-track': {
        borderRadius: 100,
        backgroundColor: '#E0E0E0',
        opacity: 1,
        border: '2px solid #747878',
        boxSizing: 'border-box',
        transition: theme.transitions.create(['background-color'], {
            duration: 200
        })
    }
}));

const FormSwitch: React.FC<FormSwitchProps> = ({ name, label = '' }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    const error = errors[name];
    const errorMessage = error ? (error.message as string) : '';

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControlLabel control={<Android12Switch {...field} checked={field.value ?? false} onChange={(e) => field.onChange(e.target.checked)} sx={{ m: 1 }} />} label={label} />
                )}
            />
            {errorMessage && (
                <FormHelperText error sx={{ marginLeft: 1 }}>
                    {errorMessage}
                </FormHelperText>
            )}
        </>
    );
};

export default FormSwitch;
