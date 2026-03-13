import React, { useState } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { ICategoryInfo, ICategoryItem, IMasterSkuData, ISubCategoryInfo } from '../../../../interface/MadterSku.interface';
import { Box, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CategoryModal from '../../../modal/CategoryModal';
import { useFetchInfo } from '../../../../hook/useFetchMasterSku';
import UnitMasterSku from '../Unit/UnitMasterSku';
import GroupModal from '../../../modal/GroupModal';

export interface IDataMasterSkuProps {
    getValues: UseFormGetValues<IMasterSkuData>
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
};

const DataMasterSku: React.FunctionComponent<IDataMasterSkuProps> = ({
    getValues,
    setValue,
    errors,
    watch,
}) => {
    const { categories, loading_info } = useFetchInfo()
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenGroup, setIsOpenGroup] = useState(false);
    const categoryId = watch('category_id');
    const subCategoryId = watch('sub_category_id');

    const catInfo = watch('category') as ICategoryInfo | undefined;
    const subInfo = watch('sub_category') as ISubCategoryInfo | undefined;
    const hasValue = !!catInfo?.category_name && !!subInfo?.sub_category_name;
    const displayValue = hasValue
        ? `${catInfo.category_name} > ${subInfo.sub_category_name}`
        : '';
    const hasValueGroup = !!watch('group.group_name');
    const displayValueGroup = hasValueGroup
        ? watch('group.group_name')
        : '';

    return (
        <>
            <CategoryModal
                isOpen={isOpenCategory}
                setIsOpen={setIsOpenCategory}
                categories={categories}
                currentCategoryId={categoryId}
                currentSubCategoryId={subCategoryId}
                onSelect={({ category, subCategory }) => {
                    setValue('category', {
                        category_id: category.category_id,
                        category_name: category.category_name,
                    });
                    setValue('sub_category', {
                        sub_category_id: subCategory.sub_category_id,
                        sub_category_name: subCategory.sub_category_name,
                    });
                    setValue('category_id', category.category_id);
                    setValue('sub_category_id', subCategory.sub_category_id);
                    setIsOpenCategory(false);
                }}
            />
            <GroupModal
                isOpen={isOpenGroup}
                setIsOpen={setIsOpenGroup}
                getValues={getValues}
                onSave={(g) => {
                    setValue("group.group_id", g.group_id);
                    setValue("group.group_code", g.group_code);
                    setValue("group.group_name", g.group_name);
                    setValue("group_id", g.group_id);
                }}
            />
            <Grid container spacing={2}>
                <Grid size={12} >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant='h6' sx={{ display: "flex", alignItems: "center" }}>
                            {" ข้อมูลสินค้า "}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="ชื่อสินค้ากลาง *"
                        variant="filled"
                        autoComplete="off"
                        value={getValues('master_item_name')}
                        onChange={(e) => setValue('master_item_name', e.target.value)}
                        error={!!errors?.master_item_name}
                        helperText={errors?.master_item_name?.message || ''}
                        id='master_item_name'
                    />
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            fullWidth
                            label="รหัสสินค้า"
                            variant="filled"
                            autoComplete="off"
                            required
                            disabled
                            value={getValues('master_item_code')}
                            error={!!errors?.master_item_code}
                            helperText={errors?.master_item_code?.message || ''}
                        />
                        <TextField
                            fullWidth
                            label="หมวดหมู่สินค้า *"
                            variant="filled"
                            autoComplete="off"
                            id='category_id'
                            error={!!errors?.category_id}
                            helperText={errors?.category_id?.message || ''}
                            value={displayValue}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => setIsOpenCategory(true)}
                                            sx={{
                                                mr: -1, // ดึงเข้าขอบเหมือน MUI ของจริง
                                                color: 'action.active',
                                            }}
                                        >
                                            <ArrowForwardIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    pr: 4, // เว้นที่ให้ปุ่ม
                                },
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            fullWidth
                            label="ชื่อกลุ่มสินค้า *"
                            id='group_id'
                            error={!!errors?.group_id}
                            helperText={errors?.group_id?.message || ''}
                            variant="filled"
                            autoComplete="off"
                            value={displayValueGroup}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => setIsOpenGroup(true)}
                                            sx={{
                                                mr: -1, // ดึงเข้าขอบเหมือน MUI ของจริง
                                                color: 'action.active',
                                            }}
                                        >
                                            <ArrowForwardIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    pr: 4, // เว้นที่ให้ปุ่ม
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="รหัสกลุ่มสินค้า"
                            variant="filled"
                            autoComplete="off"
                            required
                            disabled
                            value={getValues('master_item_code')}
                            error={!!errors?.master_item_code}
                            helperText={errors?.master_item_code?.message || ''}
                        />

                    </Stack>
                </Grid>
                <Grid size={12}>
                    <UnitMasterSku
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default DataMasterSku;