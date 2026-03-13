import React from 'react';
import { Controller, type Control, type FieldErrors, type UseFormGetValues, type UseFormSetValue, type UseFormWatch } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import { Autocomplete, Box, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFetchOwnerType } from '../../hook/useFetchOwner';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormTextField from '../../../../shared/components/formController/FormTextField';

export interface IDetailOwnerProps {
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
    errors: FieldErrors<IOwnerItem>;
    watch: UseFormWatch<IOwnerItem>;
    control: Control<IOwnerItem, any, IOwnerItem>
    actype: string;
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DetailOwner: React.FunctionComponent<IDetailOwnerProps> = ({
    getValues,
    setValue,
    errors,
    actype,
    control
}) => {
    const { owner_type, food_type, user_type, loading_owner_type } = useFetchOwnerType();
    return (
        <>
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'ข้อมูลร้านค้า'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={2}>  {/* เดิมอาจจะเป็น 2 */}
                        {/* <TextField
                            label="ชื่อร้านค้า"
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            value={getValues('owner_name') || ''}
                            onChange={(e) => setValue('owner_name', e.target.value)}
                            error={!!errors?.owner_name}
                            helperText={errors?.owner_name?.message || ''}
                        />
                        <TextField
                            label="รหัสร้านค้า"
                            variant="filled"
                            autoComplete="off"
                            fullWidth
                            value={getValues('owner_code') || ''}
                            onChange={(e) => setValue('owner_code', e.target.value)}
                        /> */}
                        <FormTextField
                            label="ชื่อร้านค้า"
                            name="owner_name"
                        />
                        <FormTextField label="รหัสร้านค้า" name="owner_code" />
                    </Stack>

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        sx={{ mt: 2, width: "100%" }}
                    >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Autocomplete
                                fullWidth
                                loading={loading_owner_type}
                                limitTags={2}
                                disableCloseOnSelect
                                multiple
                                options={owner_type}
                                value={
                                    owner_type.filter((opt) =>
                                        (getValues('owner_type_names') || []).includes(opt.name)
                                    )
                                }
                                getOptionLabel={(o) => o.name}
                                isOptionEqualToValue={(o, v) => o.id === v.id}
                                onChange={(_, selectedOptions) => {
                                    const ids = selectedOptions.map((opt) => opt.id);
                                    setValue('owner_types_id', ids);
                                    const names = selectedOptions.map((opt) => opt.name);
                                    setValue('owner_type_names', names);
                                }}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <li key={key} {...optionProps}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    );
                                }}
                                renderInput={(p) => (
                                    <TextField
                                        {...p}
                                        id="owner_type_names"
                                        label="ประเภทร้านค้า"
                                        variant="filled"
                                        autoComplete="off"
                                        error={!!errors?.owner_type_names}
                                        helperText={errors?.owner_type_names?.message || ''}
                                        sx={{
                                            "& .MuiFilledInput-root": {
                                                minHeight: 100,      // ✅ เพิ่มความสูงรวม
                                                alignItems: "center",
                                            },
                                            "& .MuiInputBase-input": {
                                                paddingTop: "18px", // ✅ ดันข้อความให้อยู่กลาง
                                                paddingBottom: "6px",
                                            },
                                        }}
                                        inputProps={{
                                            ...p.inputProps,
                                            name: "owner_type_names", // ✅ สำคัญ
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            {/* <Autocomplete
                                fullWidth
                                loading={loading_owner_type}
                                limitTags={2}
                                disableCloseOnSelect
                                multiple
                                options={food_type}
                                value={
                                    food_type.filter((opt) =>
                                        (getValues('food_type_names') || []).includes(opt.name)
                                    )
                                }
                                getOptionLabel={(o) => o.name}
                                isOptionEqualToValue={(o, v) => o.id === v.id}
                                onChange={(_, selectedOptions) => {
                                    const ids = selectedOptions.map((opt) => opt.id);
                                    setValue('food_types_id', ids);
                                    const names = selectedOptions.map((opt) => opt.name);
                                    setValue('food_type_names', names);
                                }}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <li key={key} {...optionProps}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    );
                                }}
                                renderInput={(p) => (
                                    <TextField
                                        {...p}
                                        id="food_type_names"
                                        label="ประเภทอาหาร"
                                        variant="filled"
                                        autoComplete="off"
                                        error={!!errors?.food_type_names}
                                        helperText={errors?.food_type_names?.message || ''}
                                        sx={{
                                            "& .MuiFilledInput-root": {
                                                minHeight: 100,
                                                alignItems: "center",
                                            },
                                            "& .MuiInputBase-input": {
                                                paddingTop: "18px",
                                                paddingBottom: "6px",
                                            },
                                        }}
                                        inputProps={{
                                            ...p.inputProps,
                                            name: "food_type_names", // ✅ สำคัญ
                                        }}
                                    />
                                )}
                            /> */}
                            <Controller
                                name="food_type_names"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        multiple
                                        fullWidth
                                        loading={loading_owner_type}
                                        limitTags={2}
                                        disableCloseOnSelect
                                        options={food_type}
                                        value={food_type.filter((opt) => (field.value || []).includes(opt.name))}
                                        getOptionLabel={(o) => o.name}
                                        isOptionEqualToValue={(o, v) => o.id === v.id}
                                        onChange={(_, selectedOptions) => {
                                            const names = selectedOptions.map((opt) => opt.name);
                                            const ids = selectedOptions.map((opt) => opt.id);

                                            field.onChange(names);          // ✅ สำคัญ: ผูกกับ RHF
                                            setValue("food_types_id", ids); // ✅ อันนี้เป็น field อีกตัว ค่อย setValue ได้
                                        }}
                                        renderOption={(props, option, { selected }) => {
                                            const { key, ...optionProps } = props;
                                            return (
                                                <li key={key} {...optionProps}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.name}
                                                </li>
                                            );
                                        }}
                                        renderInput={(p) => (
                                            <TextField
                                                {...p}
                                                id="food_type_names"
                                                label="ประเภทอาหาร"
                                                variant="filled"
                                                error={!!errors?.food_type_names}
                                                helperText={errors?.food_type_names?.message || ""}
                                                sx={{
                                                    "& .MuiFilledInput-root": {
                                                        minHeight: 100,
                                                        alignItems: "center",
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        paddingTop: "18px",
                                                        paddingBottom: "6px",
                                                    },
                                                }}
                                                inputProps={{
                                                    ...p.inputProps,
                                                    name: "food_type_names",
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        {(getValues("branches") ?? []).length > 0 ? (
                            // แสดง Autocomplete ถ้ามีข้อมูลใน branch
                            <Autocomplete
                                disablePortal
                                options={[...(getValues("branches") ?? [])]} // ถ้ามีสาขา แสดงรายการตามสาขา
                                fullWidth
                                size="small"
                                id="fullWidth"
                                value={
                                    actype === "create"
                                        ? getValues("branch_name")
                                            ? getValues("branches")?.find(
                                                (branch) =>
                                                    branch.branch_name?.toLowerCase() ===
                                                    getValues("branch_name")?.toLowerCase()
                                            ) || null // If not found, set to null
                                            : null
                                        : actype === "edit"
                                            ? getValues("branch_name")
                                                ? getValues("branches")?.find(
                                                    (branch) =>
                                                        branch.branch_name === getValues("branch_name")
                                                ) || null // If not found, set to null
                                                : null
                                            : null
                                }
                                onChange={(_, newValue) => {
                                    if (newValue) {
                                        if (newValue.branch_name === "ยังไม่ได้สร้างสาขา") {
                                            setValue("branch_name", ""); // ล้างค่า branch_name
                                        } else {
                                            // ✅ set ค่าทั่วไป
                                            setValue("branch_name", newValue.branch_name);
                                            setValue("branch_main_id", newValue.id);

                                            // ✅ update branches array
                                            const branches = getValues("branches") || [];

                                            // map เพื่อเปลี่ยน is_branch_main: true เฉพาะอันที่เลือก
                                            const updatedBranches = branches.map((b) => ({
                                                ...b,
                                                is_branch_main: b.branch_name === newValue.branch_name, // true เฉพาะอันที่เลือก
                                            }));

                                            setValue("branches", updatedBranches);
                                        }
                                    }
                                }}
                                getOptionLabel={(option) => option.branch_name || ""} // ใช้ branch_name เป็น label
                                isOptionEqualToValue={(option, value) =>
                                    option.branch_name === value.branch_name
                                } // เปรียบเทียบ branch_name
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="สาขาหลัก"
                                        variant="filled"
                                        autoComplete="off"
                                        error={!!errors?.branch_name}
                                        helperText={
                                            !!errors?.branch_name
                                                ? errors?.branch_name?.message || ""
                                                : ""
                                        }
                                    />
                                )}
                            />
                        ) : (
                            // แสดง TextField ถ้าไม่มีข้อมูลใน branch
                            <TextField
                                disabled={true}
                                placeholder="ยังไม่ได้สร้างสาขา"
                                fullWidth
                                size="small"
                            />
                        )}
                        <Autocomplete
                            fullWidth
                            loading={loading_owner_type}
                            options={user_type}
                            value={
                                user_type.find(opt => opt.id === getValues('user_type_id')) ||
                                user_type.find(opt => opt.name === getValues('user_type_name')) ||
                                null
                            }
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(o, v) => o.id === v.id}
                            onChange={(_, v) => {
                                setValue('user_type_id', v?.id ?? '');
                                setValue('user_type_name', v?.name ?? '');
                            }}
                            renderInput={(p) =>
                                <TextField {...p}
                                    label="ประเภทผู้ใช้งาน"
                                    variant="filled"
                                    autoComplete="off"
                                    id='user_type_id'
                                    error={!!errors?.user_type_id}
                                    helperText={
                                        !!errors?.user_type_id
                                            ? errors?.user_type_id?.message || ""
                                            : ""
                                    }
                                    slotProps={{
                                        ...p.inputProps,
                                        htmlInput: {
                                            ...p.inputProps,
                                            name: "user_type_id",
                                        },
                                    }}
                                />
                            }
                        />
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                label="เบอร์โทรศัพท์"
                                variant="filled"
                                autoComplete="off"
                                fullWidth
                                id='phone'
                                value={getValues('phone') || ''}
                                slotProps={{
                                    input: {
                                        name: 'phone',
                                        inputProps: {
                                            maxLength: 10,
                                            inputMode: "numeric",
                                            pattern: "[0-9]*"
                                        },
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // ลบอักษรที่ไม่ใช่ตัวเลข
                                    setValue('phone', value)
                                }}
                                error={!!errors?.phone}
                                helperText={
                                    !!errors?.phone
                                        ? errors?.phone?.message || ""
                                        : ""
                                }

                            />
                        </Box>
                        <Box sx={{ flex: 1 }} /> {/* ช่องว่างอีกครึ่ง */}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default DetailOwner;