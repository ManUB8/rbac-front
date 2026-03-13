import React, { useState } from 'react';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { IBranchItem, IPackagePeriodicity } from '../../../interface/Branch.interface';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { PERIODICITY_MAP, SERVICE_TYPE_LABELS } from '../../constants/package_option';
import dayjs from 'dayjs';
import ChangePackage from './modul/ChangePackage';
import RenewPackage from './modul/RenewPackage';

export interface IPackageMainViewProps {
  getValues: UseFormGetValues<IBranchItem>;
  setValue: UseFormSetValue<IBranchItem>;
  errors: FieldErrors<IBranchItem>;
  watch: UseFormWatch<IBranchItem>;
  actype: string;
}

const PackageMainView: React.FunctionComponent<IPackageMainViewProps> = ({
  watch,
  getValues,
  setValue,
  errors,
}) => {
  // ✅ กันกรณี items เป็น [] หรือ undefined
  const items = watch('nats_subscription.items') ?? [];
  const summary = items[0] ?? null;

  const [Open_Change, setOpen_Change] = useState(false);
  const [Open_Renew, setOpen_Renew] = useState(false);

  const findServiceLabel = (p?: IPackagePeriodicity) => {
    if (!p) return '-';
    const key = Object.keys(p).find((k) => p[k as keyof IPackagePeriodicity] === true);
    if (!key) return '-';

    const code = PERIODICITY_MAP[key];
    const label = SERVICE_TYPE_LABELS.find((item) => item.code === code);
    return label?.name ?? '-';
  };

  const periodicityLabel = findServiceLabel(summary?.periodicity);

  const packageName = summary?.package_name ? summary.package_name : '-';
  const priceNumber = summary?.price ?? 0;

  const priceText = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(priceNumber);

  // ✅ วันที่: ถ้าเป็น 0 / ไม่มีค่า ให้แสดงเป็น "-"
  const startText =
    summary?.start_at && summary.start_at > 0
      ? dayjs.unix(summary.start_at).format('DD/MM/YYYY')
      : '-';

  const endText =
    summary?.end_at && summary.end_at > 0
      ? dayjs.unix(summary.end_at).format('DD/MM/YYYY')
      : '-';

  return (
    <>
      <ChangePackage
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        errors={errors}
        open={Open_Change}
        setOpen={setOpen_Change}
      />

      <RenewPackage
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        errors={errors}
        open={Open_Renew}
        setOpen={setOpen_Renew}
      />

      <Grid container spacing={2} p={4}>
        {/* หัวข้อ + ปุ่มด้านขวา */}
        <Grid size={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="flex-start">
              <Typography variant="subtitle2">{'ข้อมูลแพ็กหลัก'}</Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="info"
                size="large"
                onClick={() => setOpen_Change(true)}
              >
                {'เปลี่ยนแพ็กเกจ'}
              </Button>

              <Button
                variant="contained"
                color="info"
                size="large"
                onClick={() => setOpen_Renew(true)}
              >
                {'ต่ออายุ'}
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* แถวบน: แพ็กเกจหลัก / การใช้บริการ / ราคา */}
        <Grid size={12} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{'แพ็กเกจหลัก'}</Typography>
              <Typography variant="body1">{packageName}</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{'การใช้บริการ'}</Typography>
              <Typography variant="body1">{periodicityLabel}</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{'ราคา'}</Typography>
              <Typography variant="body1">{priceText}</Typography>
            </Box>
          </Stack>
        </Grid>

        {/* แถวล่าง: วันที่เริ่มใช้งาน / วันที่สิ้นสุด */}
        <Grid size={12}>
          <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{'วันที่เริ่มใช้งาน'}</Typography>
              <Typography variant="body1">{startText}</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{'วันที่สิ้นสุด'}</Typography>
              <Typography variant="body1">{endText}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PackageMainView;