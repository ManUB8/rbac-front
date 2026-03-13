import type { IDataMetric, IPackageItem, ISearchContextPackage } from "../interface/PackageServices.interface";
import { CreatePhotoPackage, } from "../service/PackageServicesApi";
import dayjs from "dayjs";
import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { HOST_SERVER } from "../../../../shared/service/axiosInstance";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

// ✅ helper: สร้าง label ของ period
export const getPeriodLabel = (p?: IDataMetric['periodicity']) => {
  if (!p) return '-';
  switch (true) {
    case p.per_daily: return '/day';
    case p.per_monthly: return '/month';
    case p.per_yearly: return '/year';
    case p.per_none:
    default:
      return '-';
  }
};

// ✅ helper: แปลง array เป็น map ด้วย master_data_metric_id
export const toById = (arr: IDataMetric[] = []) =>
  Object.fromEntries(arr.map(x => [x.master_data_metric_id, x]));

// ✅ helper: รวม owner_data (ค่า default) กับ data_metric ในฟอร์ม (ค่าแก้ไข)
export const useMergedMetrics = (
  ownerData: IDataMetric[],
  liveFormData: IDataMetric[] // ควรใช้ watch('data_metric') เพื่ออัปเดต real-time
) => {
  const byId = toById(liveFormData);
  return ownerData.map(base => {
    const patched = byId[base.master_data_metric_id];
    // overlay: ให้ค่าที่อยู่ในฟอร์มทับค่า default (ถ้ามี)
    return patched ? { ...base, ...patched } : base;
  });
};

// ✅ helper: upsert/remove ลงในฟอร์มที่ path: 'data_metric'
export function upsertDataMetric(
  base: IDataMetric,
  newCap: number,
  watch: UseFormWatch<IPackageItem>,
  setValue: UseFormSetValue<IPackageItem>
) {
  const current = watch('data_metric') ?? [];
  const idx = current.findIndex(
    x => x.master_data_metric_id === base.master_data_metric_id
  );

  if (newCap === 0) {
    // ถ้าเป็น 0 ⇒ เอาออกจาก form (ให้ไม่ถูกส่งตอน submit)
    if (idx >= 0) {
      const next = [...current.slice(0, idx), ...current.slice(idx + 1)];
      setValue('data_metric', next, { shouldDirty: true, shouldTouch: true });
    }
    return;
  }

  // newCap !== 0 ⇒ insert/update ให้ครบโครงสร้างตามสัญญา API
  const payloadItem: IDataMetric = {
    id: current[idx]?.id ?? base.id ?? '',
    owner_level: current[idx]?.owner_level ?? base.owner_level ?? false,
    master_package_id: current[idx]?.master_package_id ?? base.master_package_id ?? '',
    master_data_metric_id: base.master_data_metric_id,
    master_name: base.master_name,
    scope: current[idx]?.scope ?? base.scope ?? '',
    periodicity: current[idx]?.periodicity ?? base.periodicity,
    cap: newCap,
    token_rule: current[idx]?.token_rule ?? base.token_rule,
    notes: current[idx]?.notes ?? base.notes ?? '',
    unit_default: base.unit_default,
  };

  if (idx >= 0) {
    const next = [...current];
    next[idx] = payloadItem;
    setValue('data_metric', next, { shouldDirty: true, shouldTouch: true });
  } else {
    setValue('data_metric', [...current, payloadItem], { shouldDirty: true, shouldTouch: true });
  }
}

// === 1) Helper อัปโหลดรูป แล้วคืน URL ===
export async function uploadPackageImage(file: File): Promise<string> {
  const startUnix = dayjs().startOf('day').unix().toString();
  const data = await CreatePhotoPackage(file, startUnix);

  // กรณี backend คืน image_name -> สร้าง URL ด้วยตัวเอง
  if (data?.image_name) {
    const fileName = String(data.image_name).split('/').pop() || '';
    return `${HOST_SERVER}` + ApiConfig.UPLOAD_ROS_API + `/original/` + fileName;
  }

  // กรณี backend คืน url ตรง ๆ (ถ้ามี)
  if (data?.url) {
    return String(data.url);
  }

  throw new Error(data?.message || 'ไม่พบ URL ของรูปที่อัปโหลด');
}
