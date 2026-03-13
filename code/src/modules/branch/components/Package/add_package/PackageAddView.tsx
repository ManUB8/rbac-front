import React, { useMemo, useState } from 'react';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import dayjs, { type Dayjs } from 'dayjs';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import type { IBranchItem } from '../../../interface/Branch.interface';
import { SERVICE_TYPE_LABELS } from '../../constants/package_option';

import { usePackageCompatibleMain } from '../../../../product&services/package_services/hook/useFetchPackage';
import type { IPackageItemMain } from '../../../../product&services/package_services/interface/PackageServices.interface';

import AddonViewRow from './view_edit/AddonViewRow';
import type { ServiceOpt } from './view_edit/ AddonEditRow';
import AddonEditRow from './view_edit/ AddonEditRow';

export interface IPackageAddViewProps {
  getValues: UseFormGetValues<IBranchItem>;
  setValue: UseFormSetValue<IBranchItem>;
  errors: FieldErrors<IBranchItem>;
  watch: UseFormWatch<IBranchItem>;
  actype: string;
}

type Periodicity = { daily: boolean; monthly: boolean; yearly: boolean };

const PERIODICITY_MAP: Record<keyof Periodicity, string> = {
  daily: '1',
  monthly: '2',
  yearly: '3',
};

const emptyPeriod: Periodicity = { daily: false, monthly: false, yearly: false };

const PackageAddView: React.FunctionComponent<IPackageAddViewProps> = ({
  watch,
  getValues,
  setValue,
  errors,
}) => {
  const theme = useTheme();

  // ✅ กัน items เป็น undefined/[] และให้ reactive ตาม RHF
  const items = watch('nats_subscription.items') ?? [];
  const mainItem = items[0] ?? null;
  const addonItems = items.length > 1 ? items.slice(1) : [];

  // ✅ mainPackageId ต้องกันกรณีไม่มี mainItem
  const mainPackageId = mainItem?.package_id ?? '';
  const { package_add, loading_add } = usePackageCompatibleMain(mainPackageId);

  // ✅ ตั้งค่า items แบบ type-safe มากขึ้น
  const setItems = (next: any[]) => setValue('nats_subscription.items', next as any);

  const [editingSet, setEditingSet] = useState<Set<number>>(new Set());

  const toggleEdit = (globalIndex: number, force?: boolean) => {
    setEditingSet((prev) => {
      const next = new Set(prev);
      const shouldEdit = force ?? !next.has(globalIndex);
      if (shouldEdit) next.add(globalIndex);
      else next.delete(globalIndex);
      return next;
    });
  };

  const isEditing = (globalIndex: number) => editingSet.has(globalIndex);

  const formatDateUnix = (unix?: number) =>
    !unix || unix <= 0 ? '-' : dayjs.unix(unix).format('DD/MM/YYYY');

  const getServiceTypeLabel = (p?: Periodicity) => {
    if (!p) return '-';
    const key = (Object.keys(p) as (keyof Periodicity)[]).find((k) => p[k]);
    if (!key) return '-';
    const code = PERIODICITY_MAP[key];
    return SERVICE_TYPE_LABELS.find((s) => s.code === code)?.name ?? '-';
  };

  const getSelectedServiceOpt = (p?: Periodicity): ServiceOpt | null => {
    if (!p) return null;
    const key = (Object.keys(p) as (keyof Periodicity)[]).find((k) => p[k]);
    if (!key) return null;
    const code = PERIODICITY_MAP[key];
    return (SERVICE_TYPE_LABELS.find((s) => s.code === code) as ServiceOpt) ?? null;
  };

  const calcEndByService = (start: Dayjs, serviceCode?: string): Dayjs | null => {
    if (!serviceCode) return null;
    switch (serviceCode) {
      case '1':
        return start.add(1, 'day');
      case '2':
        return start.add(1, 'month');
      case '3':
        return start.add(1, 'year');
      default:
        return null;
    }
  };

  const getServiceOptionsByPkg = (pkg?: IPackageItemMain | null): ServiceOpt[] => {
    if (!pkg) return SERVICE_TYPE_LABELS.filter((o) => o.code === '4') as ServiceOpt[];

    const enabled: string[] = [];
    if (pkg.price_daily?.is_selected) enabled.push('1');
    if (pkg.price_monthly?.is_selected) enabled.push('2');
    if (pkg.price_yearly?.is_selected) enabled.push('3');

    let opts = SERVICE_TYPE_LABELS.filter((o) => enabled.includes(o.code)) as ServiceOpt[];
    if (opts.length === 0) opts = SERVICE_TYPE_LABELS.filter((o) => o.code === '4') as ServiceOpt[];
    return opts;
  };

  const calcPriceFromPkgService = (pkg?: IPackageItemMain | null, serviceCode?: string) => {
    if (!pkg || !serviceCode) return 0;
    switch (serviceCode) {
      case '1':
        return pkg.price_daily?.is_selected ? pkg.price_daily.price : 0;
      case '2':
        return pkg.price_monthly?.is_selected ? pkg.price_monthly.price : 0;
      case '3':
        return pkg.price_yearly?.is_selected ? pkg.price_yearly.price : 0;
      default:
        return 0;
    }
  };

  const canAddMore = useMemo(() => {
    if (!package_add || package_add.length === 0) return false;
    const usedIds = new Set(addonItems.map((a: any) => a.package_id));
    return package_add.some((pkg: IPackageItemMain) => !usedIds.has(pkg.package_id));
  }, [package_add, addonItems]);

  const getAvailablePackagesForRow = (globalIndex: number) => {
    const currentItems = (getValues('nats_subscription.items') ?? []) as any[];
    const currentAddon = currentItems[globalIndex];

    const used = new Set(
      currentItems
        .slice(1)
        .filter((_, i) => i + 1 !== globalIndex)
        .map((a: any) => a.package_id)
    );

    const list = package_add || [];
    return list.filter(
      (p: IPackageItemMain) => !used.has(p.package_id) || p.package_id === currentAddon?.package_id
    );
  };

  const handleAddAddon = () => {
    // ✅ ถ้าไม่มี main package ยังไม่ให้เพิ่ม addon (กัน state เพี้ยน)
    if (!mainItem?.package_id) return;
    if (!package_add || package_add.length === 0) return;

    const usedIds = new Set(addonItems.map((a: any) => a.package_id));
    const nextPkg = package_add.find((pkg: IPackageItemMain) => !usedIds.has(pkg.package_id));
    if (!nextPkg) return;

    const startAt = mainItem?.start_at && mainItem.start_at > 0 ? mainItem.start_at : dayjs().startOf('day').unix();

    const newAddon: any = {
      package_id: nextPkg.package_id,
      package_code: nextPkg.package_code,
      package_name: nextPkg.package_name,
      price: 0,
      periodicity: { ...emptyPeriod },
      start_at: startAt,
      end_at: mainItem?.end_at ?? 0,
      compatible_main_package_id: mainItem.package_id,
    };

    const nextItems = [...items, newAddon];
    setItems(nextItems);

    // ✅ package_summary กัน undefined
    const currentSummary = (getValues('package_summary') || {}) as any;
    const currentAddPk = (currentSummary.add_pk || []) as { name: string }[];
    const nextAddPk = [...currentAddPk, { name: nextPkg.package_name }];

    setValue('package_summary' as any, {
      ...currentSummary,
      add_pk: nextAddPk,
      add_pk_Count: nextAddPk.length,
    });

    const newGlobalIndex = nextItems.length - 1;
    toggleEdit(newGlobalIndex, true);
  };

  const handleRemoveAddon = (globalIndex: number) => {
    const nextItems = items.filter((_, i) => i !== globalIndex);
    setItems(nextItems);

    setEditingSet((prev) => {
      const next = new Set<number>();
      prev.forEach((idx) => {
        if (idx === globalIndex) return;
        next.add(idx > globalIndex ? idx - 1 : idx);
      });
      return next;
    });

    const currentSummary = (getValues('package_summary') || {}) as any;
    const currentAddPk = (currentSummary.add_pk || []) as { name: string }[];
    const nextAddPk = currentAddPk.filter((_, idx) => idx !== globalIndex - 1);

    setValue('package_summary' as any, {
      ...currentSummary,
      add_pk: nextAddPk,
      add_pk_Count: nextAddPk.length,
    });
  };

  const handleChangeAddonPackage = (globalIndex: number, pkg: IPackageItemMain | null) => {
    const next = [...items];
    const addon = next[globalIndex];
    if (!addon) return;

    if (!pkg) {
      next[globalIndex] = {
        ...addon,
        package_id: '',
        package_name: '',
        price: 0,
        periodicity: { ...emptyPeriod },
      };
      setItems(next);
      return;
    }

    next[globalIndex] = {
      ...addon,
      package_id: pkg.package_id,
      package_name: pkg.package_name,
      price: 0,
      periodicity: { ...emptyPeriod },
    };
    setItems(next);

    // ✅ ถ้าอยากให้ package_summary เปลี่ยนชื่อด้วย (optional) บอก เดี๋ยวใส่ให้
  };

  const handleChangeServiceType = (globalIndex: number, opt: ServiceOpt | null) => {
    const next = [...items];
    const addon = next[globalIndex];
    if (!addon) return;

    const pkg = (package_add || []).find((p: IPackageItemMain) => p.package_id === addon.package_id) ?? null;
    const serviceCode = opt?.code;

    const price = calcPriceFromPkgService(pkg, serviceCode);

    const periodicity: Periodicity = {
      daily: serviceCode === '1',
      monthly: serviceCode === '2',
      yearly: serviceCode === '3',
    };

    const startDay = addon.start_at ? dayjs.unix(addon.start_at).startOf('day') : dayjs().startOf('day');
    const endDay = calcEndByService(startDay, serviceCode);

    next[globalIndex] = {
      ...addon,
      price,
      periodicity,
      end_at: endDay ? endDay.startOf('day').unix() : addon.end_at ?? 0,
    };
    setItems(next);
  };

  const handleAddonStartDateChange = (globalIndex: number, val: Dayjs | null) => {
    const next = [...items];
    const addon = next[globalIndex];
    if (!addon) return;

    if (!val) {
      next[globalIndex] = { ...addon, start_at: 0 };
      setItems(next);
      return;
    }

    const startDay = val.startOf('day');
    const serviceKey = (Object.keys(addon.periodicity || {}) as (keyof Periodicity)[]).find(
      (k) => addon.periodicity?.[k]
    );
    const serviceCode = serviceKey ? PERIODICITY_MAP[serviceKey] : undefined;
    const endDay = calcEndByService(startDay, serviceCode);

    next[globalIndex] = {
      ...addon,
      start_at: startDay.unix(),
      end_at: endDay ? endDay.startOf('day').unix() : addon.end_at ?? 0,
    };
    setItems(next);
  };

  const handleAddonEndDateChange = (globalIndex: number, val: Dayjs | null) => {
    const next = [...items];
    const addon = next[globalIndex];
    if (!addon) return;

    if (!val) {
      next[globalIndex] = { ...addon, end_at: 0 };
      setItems(next);
      return;
    }

    let endDay = val.startOf('day');
    if (addon.start_at) {
      const startDay = dayjs.unix(addon.start_at).startOf('day');
      if (endDay.isBefore(startDay)) endDay = startDay;
    }

    next[globalIndex] = { ...addon, end_at: endDay.unix() };
    setItems(next);
  };

  return (
    <Grid container spacing={2} p={4}>
      <Grid size={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">{'ข้อมูลแพ็กเกจเสริม'}</Typography>

          <Button
            variant="contained"
            color="info"
            size="large"
            startIcon={<AddOutlinedIcon fontSize="small" />}
            onClick={handleAddAddon}
            // ✅ ถ้าไม่มี mainItem ก็ disable ไปเลย
            disabled={!mainItem?.package_id || !canAddMore || loading_add}
          >
            {'เพิ่มแพ็กเกจเสริม'}
          </Button>
        </Stack>
      </Grid>

      {/* ✅ ไม่มี main package */}
      {!mainItem?.package_id && (
        <Grid size={12} sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {'ยังไม่มีแพ็กเกจหลัก (ต้องเลือกแพ็กเกจหลักก่อน ถึงจะเพิ่มแพ็กเกจเสริมได้)'}
          </Typography>
        </Grid>
      )}

      {/* ✅ ไม่มี addon */}
      {mainItem?.package_id && addonItems.length === 0 && (
        <Grid size={12} sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {'ยังไม่มีแพ็กเกจเสริม'}
          </Typography>
        </Grid>
      )}

      {addonItems.map((addon: any, index: number) => {
        const globalIndex = index + 1;
        const editing = isEditing(globalIndex);

        const priceText = new Intl.NumberFormat('th-TH', {
          style: 'currency',
          currency: 'THB',
          maximumFractionDigits: 0,
        }).format(addon.price ?? 0);

        const serviceLabel = getServiceTypeLabel(addon.periodicity);

        const availablePackages = getAvailablePackagesForRow(globalIndex);
        const selectedPkg =
          (package_add || []).find((p: IPackageItemMain) => p.package_id === addon.package_id) ?? null;

        const serviceOptions = getServiceOptionsByPkg(selectedPkg);
        const currentService = getSelectedServiceOpt(addon.periodicity);

        const mainStartDay = mainItem?.start_at ? dayjs.unix(mainItem.start_at).startOf('day') : null;
        const mainEndDay = mainItem?.end_at ? dayjs.unix(mainItem.end_at).startOf('day') : null;

        const addonStartValue = addon.start_at ? dayjs.unix(addon.start_at) : null;
        const addonEndValue = addon.end_at ? dayjs.unix(addon.end_at) : null;

        if (!editing) {
          return (
            <AddonViewRow
              key={addon.subscription_item_id ?? `${addon.package_id}-${index}`}
              index={index}
              addon={addon}
              priceText={priceText}
              serviceLabel={serviceLabel}
              formatDateUnix={formatDateUnix}
              onRemove={() => handleRemoveAddon(globalIndex)}
              onEdit={() => toggleEdit(globalIndex, true)}
            />
          );
        }

        return (
          <AddonEditRow
            key={addon.subscription_item_id ?? `${addon.package_id}-${index}`}
            index={index}
            addon={addon}
            loadingAdd={loading_add}
            availablePackages={availablePackages}
            selectedPkg={selectedPkg}
            serviceOptions={serviceOptions}
            currentService={currentService}
            addonStartValue={addonStartValue}
            addonEndValue={addonEndValue}
            mainStartDay={mainStartDay}
            mainEndDay={mainEndDay}
            errors={errors}
            onRemove={() => handleRemoveAddon(globalIndex)}
            onSave={() => toggleEdit(globalIndex, false)}
            onChangePackage={(pkg:any) => handleChangeAddonPackage(globalIndex, pkg)}
            onChangeService={(opt:any) => handleChangeServiceType(globalIndex, opt)}
            onChangePrice={(price:any) => {
              const next = [...items];
              next[globalIndex] = { ...next[globalIndex], price };
              setItems(next);
            }}
            onChangeStart={(val:any) => handleAddonStartDateChange(globalIndex, val)}
            onChangeEnd={(val:any) => handleAddonEndDateChange(globalIndex, val)}
          />
        );
      })}
    </Grid>
  );
};

export default PackageAddView;