import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import type {
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import type { IMasterSkuData } from '../../../../interface/MadterSku.interface';
import { useFetchInfo } from '../../../../hook/useFetchMasterSku';
import { NumericFormat } from 'react-number-format';

export interface IUnitMasterSkuProps {
    getValues: UseFormGetValues<IMasterSkuData>;
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
}

const UnitMasterSku: React.FC<IUnitMasterSkuProps> = ({
    getValues,
    setValue,
    errors,
    watch,
}) => {
    const { units_data } = useFetchInfo();

    const smallUnits = watch('small_units') ?? [];
    const firstSmall = smallUnits[0] ?? null;
    const restSmall = smallUnits.slice(1);

    const handleChangeRatio = (index: number, value: string) => {
        setValue(`small_units.${index}.small_unit_ratio`, value);
    };

    const handleChangeUnit = (
        index: number,
        unit: { unit_id: string; unit_name: string } | null,
    ) => {
        setValue(`small_units.${index}.small_unit_id`, unit?.unit_id ?? '');
        setValue(`small_units.${index}.small_unit_name`, unit?.unit_name ?? '');
    };

    const handleAddSmallUnit = () => {
        const newItem = {
            priority: `${smallUnits.length + 1}`,
            small_unit_id: '',
            small_unit_name: '',
            small_unit_ratio: '1',
        };
        setValue('small_units', [...smallUnits, newItem]);
    };

    const handleDeleteUnit = (index: number) => {
        const updated = [...smallUnits];
        updated.splice(index, 1);

        const fixed = updated.map((u, i) => ({
            ...u,
            priority: `${i + 1}`,
        }));

        setValue('small_units', fixed);
    };

    // กล่องรวม (จำนวน | เส้นแบ่ง | Autocomplete หน่วย)
    const renderUnitBox = (params: {
        ratio: string;
        onChangeRatio: (v: string) => void;
        unitId: string;
        onChangeUnit: (unit: { unit_id: string; unit_name: string } | null) => void;
        name: string;
        id: string;

        errorUnit?: boolean;
        helperTextUnit?: string;
    }) => {
        const {
            ratio,
            onChangeRatio,
            unitId,
            onChangeUnit,
            name,
            id,
            errorUnit,
            helperTextUnit,
        } = params;


        const selectedUnit =
            units_data.find((u) => u.unit_id === unitId) ?? null;

        // return (
        //     <Box
        //         sx={(t) => ({
        //             display: 'flex',
        //             alignItems: 'center',
        //             borderRadius: 2,
        //             border: `1px solid ${errorUnit ? t.palette.error.main : t.palette.outlineVariant}`,
        //             height: 56,
        //             px: 2,
        //             bgcolor: t.palette.background.paper,
        //             gap: 2,
        //         })}
        //     >
        //         {/* จำนวน */}
        //         <NumericFormat
        //             customInput={TextField}
        //             fullWidth
        //             variant="filled"
        //             value={ratio}
        //             thousandSeparator=","
        //             allowNegative={false}
        //             decimalScale={0}        // ไม่เอาทศนิยม
        //             onValueChange={(values) => {
        //                 onChangeRatio(values.value);  // ส่งเฉพาะตัวเลขล้วนกลับไป
        //             }}
        //             slotProps={{
        //                 input: {
        //                     disableUnderline: true,
        //                 }
        //             }}
        //             isAllowed={(values) => {
        //                 const { floatValue } = values;
        //                 return floatValue === undefined || floatValue >= 1;
        //             }}
        //             sx={{
        //                 '& .MuiFilledInput-root': {
        //                     backgroundColor: 'transparent !important',
        //                     border: 'none',
        //                     px: 0,
        //                 },
        //                 '& .MuiFilledInput-input': {
        //                     padding: '0 !important',
        //                 },
        //             }}
        //         />

        //         {/* เส้นแบ่ง */}
        //         <Box
        //             sx={(t) => ({
        //                 width: 1,
        //                 height: '60%',
        //                 borderLeft: `1px solid ${t.palette.divider}`,
        //             })}
        //         />

        //         {/* หน่วย (Autocomplete) */}
        //         <Autocomplete
        //             fullWidth
        //             options={units_data}
        //             getOptionLabel={(option: any) => option.unit_name ?? ''}
        //             value={selectedUnit}
        //             onChange={(_, newValue: any | null) => {
        //                 onChangeUnit(newValue);
        //             }}
        //             renderInput={(paramsText) => (
        //                 <TextField
        //                     {...paramsText}
        //                     variant="filled"
        //                     placeholder="ระบุหน่วย *"
        //                     id={id}
        //                     name={name}
        //                     InputProps={{
        //                         ...paramsText.InputProps,
        //                         disableUnderline: true,
        //                         name: name
        //                     }}
        //                     error={!!errorUnit}
        //                     helperText={helperTextUnit || ' '}
        //                     sx={{
        //                         '& .MuiFilledInput-root': {
        //                             backgroundColor: 'transparent !important',
        //                             border: 'none',
        //                             px: 0,
        //                         },
        //                         '& .MuiFilledInput-input': {
        //                             padding: '0 !important',
        //                         },
        //                     }}
        //                 />
        //             )}
        //             sx={{
        //                 '& .MuiInputBase-root': {
        //                     padding: '0 !important',
        //                     minHeight: 'unset',
        //                 },
        //                 '& .MuiAutocomplete-input': {
        //                     padding: '0 !important',
        //                 },
        //             }}
        //         />
        //     </Box>
        // );
        return (
            <Box sx={{ width: '100%' }}>
                {/* แถว input สูง 56 ตลอด */}
                <Box
                    sx={(t) => ({
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        border: `1px solid ${errorUnit ? t.palette.error.main : t.palette.outlineVariant}`,
                        height: 56,
                        px: 2,
                        bgcolor: t.palette.background.paper,
                        gap: 2,
                    })}
                >
                    {/* จำนวน */}
                    <NumericFormat
                        customInput={TextField}
                        fullWidth
                        variant="filled"
                        value={ratio}
                        thousandSeparator=","
                        allowNegative={false}
                        decimalScale={0}
                        onValueChange={(values) => onChangeRatio(values.value)}
                        slotProps={{ input: { disableUnderline: true } }}
                        isAllowed={(values) => values.floatValue === undefined || values.floatValue >= 1}
                        sx={{
                            '& .MuiFilledInput-root': { backgroundColor: 'transparent !important', border: 'none', px: 0 },
                            '& .MuiFilledInput-input': { padding: '0 !important' },
                        }}
                    />

                    {/* เส้นแบ่ง */}
                    <Box sx={(t) => ({ width: 1, height: '60%', borderLeft: `1px solid ${t.palette.divider}` })} />

                    {/* หน่วย */}
                    <Autocomplete
                        fullWidth
                        options={units_data}
                        getOptionLabel={(o: any) => o.unit_name ?? ''}
                        value={selectedUnit}
                        onChange={(_, v) => onChangeUnit(v)}
                        renderInput={(paramsText) => (
                            <TextField
                                {...paramsText}
                                id={id}
                                name={name}
                                variant="filled"
                                placeholder="ระบุหน่วย *"
                                error={!!errorUnit}
                                // ❌ ไม่ใส่ helperText ในนี้แล้ว
                                InputProps={{
                                    ...paramsText.InputProps,
                                    disableUnderline: true,
                                    name: name
                                }}
                                sx={{
                                    '& .MuiFilledInput-root': { backgroundColor: 'transparent !important', border: 'none', px: 0 },
                                    '& .MuiFilledInput-input': { padding: '0 !important' },
                                }}
                            />
                        )}
                        sx={{
                            '& .MuiInputBase-root': { padding: '0 !important', minHeight: 'unset' },
                            '& .MuiAutocomplete-input': { padding: '0 !important' },
                        }}
                    />
                </Box>

                {/* helperText แยกด้านล่าง: จองพื้นที่ไว้ตลอด ไม่ดัน layout */}
                <Typography
                    variant="caption"
                    sx={(t) => ({
                        display: 'block',
                        minHeight: 18,          // กัน layout เด้ง
                        mt: 0.5,
                        mr: 1.5,
                        textAlign: 'right',
                        color: errorUnit ? t.palette.error.main : 'transparent',
                    })}
                >
                    {helperTextUnit || ' '}
                </Typography>
            </Box>
        );

    };

    return (
        <Grid container spacing={2}>
            {/* title */}
            <Grid size={12}>
                <Typography variant='h6'>
                    {"หน่วย"}
                </Typography>
            </Grid>

            {/* แถวบน: เก็บ  =  ใช้(ตัวแรก) */}
            <Grid container size={12} spacing={2} alignItems="flex-start">
                {/* ซ้าย: เก็บ */}
                <Grid size={{ xs: 12, md: 5.5 }}>
                    <Box
                        sx={(t) => ({
                            border: `1px solid ${t.palette.outlineVariant}`,
                            borderRadius: 2,
                            p: 2,
                            width: '100%',
                        })}
                    >
                        <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                            เก็บ
                        </Typography>

                        {renderUnitBox({
                            ratio: getValues('stock_unit_ratio') ?? getValues('stock_unit.stock_unit_ratio'),
                            onChangeRatio: (v) => setValue('stock_unit_ratio', v),

                            unitId: getValues('stock_unit_id') ?? getValues('stock_unit.stock_unit_id'),
                            onChangeUnit: (unit) => {
                                setValue('stock_unit_id', unit?.unit_id ?? '');
                                setValue('stock_unit.stock_unit_id', unit?.unit_id ?? '');
                                setValue('stock_unit.stock_unit_name', unit?.unit_name ?? '');
                            },

                            name: 'stock_unit_id',
                            id: 'stock_unit_id',

                            errorUnit: !!errors?.stock_unit_id,
                            helperTextUnit: errors?.stock_unit_id?.message as string,
                        })}
                    </Box>
                </Grid>

                {/* ตรงกลาง: =  (อยู่แถวนี้ตลอด) */}
                <Grid
                    size={{ xs: 12, md: 1 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 6
                    }}
                >
                    <Typography variant="h5">=</Typography>
                </Grid>

                {/* ขวาบน: ใช้ (ตัวแรก) */}
                <Grid size={{ xs: 12, md: 5.5 }}>
                    <Box
                        sx={(t) => ({
                            border: `1px solid ${t.palette.outlineVariant}`,
                            borderRadius: 2,
                            p: 2,
                            width: '100%',
                        })}
                    >
                        <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                            ใช้
                        </Typography>

                        {firstSmall ? (
                            renderUnitBox({
                                ratio: firstSmall.small_unit_ratio,
                                onChangeRatio: (v) => handleChangeRatio(0, v),

                                unitId: firstSmall.small_unit_id,
                                onChangeUnit: (unit) => handleChangeUnit(0, unit),

                                name: `small_units.0.small_unit_id`,
                                id: `small_units-0-small_unit_id`,

                                errorUnit: !!errors?.small_units?.[0]?.small_unit_id,
                                helperTextUnit: errors?.small_units?.[0]?.small_unit_id?.message as string,
                            })
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                {"ยังไม่มีหน่วยใช้"}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            {/* แถวล่าง: ใช้ (2..n) + ปุ่มเพิ่มฝั่งขวา */}
            <Grid container size={12} spacing={2} sx={{ mt: 1 }}>
                {/* ช่องว่างให้ตรงกับ "เก็บ" */}
                <Grid size={{ xs: 12, md: 5.5 }} />
                {/* ช่องว่างใต้ '=' */}
                <Grid size={{ xs: 12, md: 1 }} />

                {/* ขวาล่าง: ใช้ (2..n) + ปุ่มเพิ่ม */}
                <Grid size={{ xs: 12, md: 5.5 }}>
                    {restSmall.map((u, idx) => {
                        const realIndex = idx + 1;      // index ใน small_units
                        const labelIndex = realIndex + 1; // ใช้ (2), ใช้ (3)...

                        return (
                            <Box
                                key={realIndex}
                                sx={(t) => ({
                                    border: `1px solid ${t.palette.outlineVariant}`,
                                    borderRadius: 2,
                                    p: 2,
                                    width: '100%',
                                    mb: 2,
                                })}
                            >
                                {/* แถวหัว: ใช้ (2) ........  X */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                    }}
                                >
                                    <Typography fontSize={18} fontWeight={500}>
                                        ใช้ ({labelIndex})
                                    </Typography>

                                    <IconButton onClick={() => handleDeleteUnit(realIndex)} size="small">
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                {/* แถวล่าง: กล่อง จำนวน | เส้นแบ่ง | หน่วย */}
                                {/* {restSmall.map((u, idx) => {
                                    const realIndex = idx + 1;

                                    return (
                                        <Box key={realIndex} >
                                            {renderUnitBox({
                                                ratio: u.small_unit_ratio,
                                                onChangeRatio: (v) => handleChangeRatio(realIndex, v),

                                                unitId: u.small_unit_id,
                                                onChangeUnit: (unit) => handleChangeUnit(realIndex, unit),

                                                name: `small_units.${realIndex}.small_unit_id`,
                                                id: `small_units-${realIndex}-small_unit_id`,

                                                errorUnit: !!errors?.small_units?.[realIndex]?.small_unit_id,
                                                helperTextUnit:
                                                    errors?.small_units?.[realIndex]?.small_unit_id?.message as string,
                                            })}
                                        </Box>
                                    );
                                })} */}
                                <Box key={realIndex} >
                                    {renderUnitBox({
                                        ratio: u.small_unit_ratio,
                                        onChangeRatio: (v) => handleChangeRatio(realIndex, v),

                                        unitId: u.small_unit_id,
                                        onChangeUnit: (unit) => handleChangeUnit(realIndex, unit),

                                        name: `small_units.${realIndex}.small_unit_id`,
                                        id: `small_units-${realIndex}-small_unit_id`,

                                        errorUnit: !!errors?.small_units?.[realIndex]?.small_unit_id,
                                        helperTextUnit:
                                            errors?.small_units?.[realIndex]?.small_unit_id?.message as string,
                                    })}
                                </Box>
                            </Box>
                        );
                    })}

                    {/* ปุ่มเพิ่มหน่วยใช้ */}
                    <Box
                        sx={{
                            mt: 2,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            color="info"
                            size="large"
                            startIcon={<AddOutlinedIcon fontSize="small" />}
                            onClick={handleAddSmallUnit}
                            sx={{
                                height: 56,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant='subtitle1' color='tertiary.main'>{"เพิ่มหน่วยใช้"}</Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UnitMasterSku;