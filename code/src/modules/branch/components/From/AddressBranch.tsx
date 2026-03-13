import React, { useEffect, useMemo } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { Autocomplete, Grid, Stack, TextField, Typography } from '@mui/material';
import MapAddress from './MapAddress';
import { useFetchDistrict, useFetchProvince, useFetchSubDistricts } from '../../hook/useFetchBranch';

export interface IAddressBranchProps {
  getValues: UseFormGetValues<IBranchItem>;
  setValue: UseFormSetValue<IBranchItem>;
  errors: FieldErrors<IBranchItem>;
  watch: UseFormWatch<IBranchItem>;
  actype: string;
}

const AddressBranch: React.FC<IAddressBranchProps> = ({ getValues, setValue, errors, watch, actype }) => {
  // อ่านค่าปัจจุบันจากฟอร์ม (ใช้ watch เพื่อกระตุ้น re-render เมื่อเปลี่ยน)
  const provinceId = watch('province_id') || watch('address.province_id') || 0;
  const districtId = watch('district_id') || watch('address.district_id') || 0;
  const subId = watch('sub_district_id') || watch('address.sub_district_id') || 0;

  // fetch แบบมี guard id (ให้ hooks ของคุณรองรับ id=0/undefined = ไม่ยิง)
  const { province, loading_province } = useFetchProvince();
  const { district, loading_district } = useFetchDistrict(provinceId);
  const { sub_districts, loading_sub_districts } = useFetchSubDistricts(districtId);

  // เมื่อจังหวัดเปลี่ยน → ล้างค่าที่อยู่ระดับล่าง
  useEffect(() => {
    // ถ้าว่างหรือเพิ่งเปลี่ยน ให้เคลียร์ลูก
    setValue('district_id', 0, { shouldDirty: true });
    setValue('address.district_id', 0, { shouldDirty: true });
    setValue('sub_district_id', 0, { shouldDirty: true });
    setValue('address.sub_district_id', 0, { shouldDirty: true });
    setValue('address.zip_code', '', { shouldDirty: true });
  }, [provinceId, setValue]);

  // เมื่ออำเภอเปลี่ยน → ล้างตำบล/รหัสไปรษณีย์
  useEffect(() => {
    setValue('sub_district_id', 0, { shouldDirty: true });
    setValue('address.sub_district_id', 0, { shouldDirty: true });
    setValue('address.zip_code', '', { shouldDirty: true });
  }, [districtId, setValue]);

  // ค่าที่ใช้กับ value ของ Autocomplete (หา object จาก list ด้วย id)
  const selectedProvince = useMemo(
    () => province.find(o => o.id === Number(provinceId)) ?? null,
    [province, provinceId]
  );
  const selectedDistrict = useMemo(
    () => district.find(o => o.id === Number(districtId)) ?? null,
    [district, districtId]
  );
  const selectedSubDistrict = useMemo(
    () => sub_districts.find(o => o.id === Number(subId)) ?? null,
    [sub_districts, subId]
  );

  return (
    <Grid container spacing={2} p={4}>
      <Grid size={12}>
        <Typography variant="subtitle2">{'ที่อยู่ของสาขา'}</Typography>
      </Grid>
      <Grid size={12}>
        <Stack spacing={2}>
          {/* จังหวัด */}
          <Autocomplete
            fullWidth
            loading={loading_province}
            options={province}
            value={selectedProvince}
            getOptionLabel={(o) => o.name_th}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            onChange={(_, v) => {
              const id = v?.id ?? 0;
              setValue('province_id', id, { shouldDirty: true });
              setValue('address.province_id', id, { shouldDirty: true });
              // ไม่ต้องล้างลูกที่นี่เพราะ useEffect จัดการแล้ว
            }}
            renderInput={(p) =>
              <TextField
                {...p}
                label="จังหวัด"
                variant="filled"
                autoComplete="off"
              />
            }
          />

          {/* อำเภอ / เขต */}
          <Autocomplete
            fullWidth
            loading={loading_district}
            options={district}
            disabled={!provinceId}                     // ปิดถ้ายังไม่เลือกจังหวัด
            value={selectedDistrict}
            getOptionLabel={(o) => o.name_th}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            onChange={(_, v) => {
              const id = v?.id ?? 0;
              setValue('district_id', id, { shouldDirty: true });
              setValue('address.district_id', id, { shouldDirty: true });
            }}
            renderInput={(p) => <TextField {...p} label="อำเภอ / เขต" variant="filled" autoComplete="off" />}
          />

          {/* ตำบล / แขวง */}
          <Autocomplete
            fullWidth
            loading={loading_sub_districts}
            options={sub_districts}
            disabled={!districtId}                    // ปิดถ้ายังไม่เลือกอำเภอ
            value={selectedSubDistrict}
            getOptionLabel={(o) => o.name_th}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            onChange={(_, v) => {
              const id = v?.id ?? 0;
              setValue('sub_district_id', id, { shouldDirty: true });
              setValue('address.sub_district_id', id, { shouldDirty: true });
              setValue('address.zip_code', v?.zip_code ?? '', { shouldDirty: true });
            }}
            renderInput={(p) => <TextField {...p} label="ตำบล / แขวง" variant="filled" autoComplete="off" />}
          />

          {/* รหัสไปรษณีย์ */}
          <TextField
            label="รหัสไปรษณีย์"
            fullWidth
            variant="filled"
            autoComplete="off"
            disabled={!subId}                          // ปิดถ้ายังไม่เลือกตำบล
            value={getValues('address.zip_code') || ''}
            slotProps={{
              input: {
                readOnly: true,
                inputProps: {
                  maxLength: 5,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                },
              },
            }}
          />

          {/* บ้านเลขที่ */}
          <TextField
            label="บ้านเลขที่"
            fullWidth
            variant="filled"
            autoComplete="off"
            value={getValues('address.house_number') || ''}
            onChange={(e) => {
              setValue('address.house_number', e.target.value, { shouldDirty: true });
              setValue('branch_house_number', e.target.value, { shouldDirty: true });
            }}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <MapAddress
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          errors={errors}
          actype={actype}
        />
      </Grid>
    </Grid>
  );
};

export default AddressBranch;