import React, { useCallback, useMemo } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IEnumPackageType, IPackageItem } from '../../../interface/PackageServices.interface';
import { Autocomplete, Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RelatedModal from '../../modal/RelatedModal';
export interface IRelatedPackagesProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const RelatedPackages: React.FunctionComponent<IRelatedPackagesProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    // อ่านค่าจากฟอร์ม (ใช้ watch เพื่อให้รีเรนเดอร์เมื่อมีการแก้ไข)
    const compatible = watch('compatible_package_ids') ?? getValues('compatible_package_ids') ?? [];

    const hasItems = compatible && compatible.length > 0;
    const actionLabel = hasItems ? 'แก้ไข' : 'เพิ่ม';

    return (
        <>
            <Grid container alignItems="center" marginTop={2}>
                <Grid
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.25}
                        sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                        <Typography fontSize={18} fontWeight={500}>{"แพ็คเกจที่เกี่ยวข้อง"}</Typography>
                    </Stack>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ ml: { md: 'auto' }, mt: { xs: 1, md: 0 }, mb: { xs: 1, md: 0 } }}
                    >
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            startIcon={actionLabel === 'แก้ไข' ? null : <AddIcon />}
                            onClick={handleOpen}
                            sx={{ px: 2 }}
                        >
                            <Typography> {actionLabel}</Typography>
                        </Button>
                    </Stack>
                </Grid>

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} >
                <Box>
                    {hasItems ? (
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {compatible.map((p: any) => (
                                <Chip
                                    key={p.package_id}
                                    variant="outlined"
                                    label={<Typography variant='subtitle1'>{p.package_name}</Typography>}
                                    sx={{ height: 52, borderRadius: 1.5 }}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {"-"}
                        </Typography>
                    )}
                </Box>
            </Grid>
            <RelatedModal
                open={open}
                setOpen={setOpen}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
                actype={actype}
                setError={setError}
                clearErrors={clearErrors}
            />
        </>
    );
};

export default RelatedPackages;