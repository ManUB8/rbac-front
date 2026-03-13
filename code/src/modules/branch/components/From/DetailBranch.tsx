import React, { useEffect } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { Autocomplete, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useFetchBranchType } from '../../hook/useFetchBranch';
import { PhotoCard } from '../photo/PhotoCard';
import { genMerchantId } from '../../hook/handleFunction';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import NoImg from '../../../../assets/image/nophoto.jpg';
import { toDisplayUrl, toStoredPath } from '../../../masterSku/master_sku/hook/handleFunction';
export interface IDetailBranchProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
};

const DetailBranch: React.FunctionComponent<IDetailBranchProps> = ({
    getValues,
    setValue,
    errors
}) => {
    const { branch_type, loading_branch_type } = useFetchBranchType();

    useEffect(() => {
        const current = getValues('merchant_id');
        if (!current || current.trim() === '') {
            setValue('merchant_id', genMerchantId(), { shouldDirty: true });
        }
    }, []);

    return (
        <>
            <Grid container spacing={2} p={2} justifyContent="center" alignItems="center">
                <PhotoCard
                    value={getValues('image') || NoImg}
                    onChange={(url) => setValue('image', url || '')}
                    size={240}
                    label="No Photo"
                />
            </Grid>
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'รายละเอียดสาขา'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="ชื่อสาขา"
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            value={getValues('branch_name') || ''}
                            onChange={(e) => setValue('branch_name', e.target.value)}
                            error={!!errors?.branch_name}
                            helperText={errors?.branch_name?.message || ''}
                            slotProps={{
                                input: {
                                    name: 'branch_name'
                                }
                            }}
                        />
                        <TextField
                            label="รหัสสาขา"
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            value={getValues('branch_code') || ''}
                            onChange={(e) => setValue('branch_code', e.target.value)}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Autocomplete
                            fullWidth
                            loading={loading_branch_type}
                            options={branch_type}
                            value={branch_type.find(opt => opt.id === (getValues('branch_type.id')) || getValues('branch_type_id')) ?? null}
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(o, v) => o.id === v.id}
                            onChange={(_, v) => {
                                setValue('branch_type_id', v?.id ?? '');
                                setValue('branch_type.id', v?.id ?? '');
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    autoComplete="off"
                                    label="ประเภทสาขา"
                                    error={!!errors?.branch_type?.id}
                                    helperText={errors?.branch_type?.id?.message || ''}
                                    slotProps={{
                                        ...params.inputProps,
                                        htmlInput: {
                                            ...params.inputProps,
                                            name: "branch_type.id",
                                        },
                                    }}

                                />
                            )}
                        />
                        <TextField
                            label="Merchant ID"
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            value={getValues('merchant_id') || ''}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                aria-label="regenerate merchant id"
                                                onClick={() => setValue('merchant_id', genMerchantId(), { shouldDirty: true })}
                                            >
                                                <AutorenewIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </Stack>

                </Grid>
            </Grid>
        </>
    )
};

export default DetailBranch;