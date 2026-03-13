import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import * as R from 'ramda';
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { enumDataMetricAtom, enumPackageAtom, pkgMainCacheAtom, searchStatePackage, searchStatePackageMain, type PkgMainCache, type PkgMainCacheEntry } from "./AtomPackageServices";
import { IPackageItemDefaul, type IBillingType, type IDataMetric, type IEnumPackageType, type IPackageData, type IPackageItem, type IPackageItemMain, type IPackageTier, type IPackageType, type IPagePermission, type IStatusData } from "../interface/PackageServices.interface";
import { getAllEnumDataMetric, getAllEnumPackage, getAllMasterPackage, getLicensePackageByPage, getPackageByOne, getPackageCompatibleMain } from "../service/PackageServicesApi";
import type { StatusKey } from "../constants/package_option";
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackageZod } from "../../../../shared/components/FieldValidation";



export const useFetchEnumPackage = () => {
  const [state, setState] = useAtom(enumPackageAtom)
  const [loading, setLoading] = useState(!state.loaded)

  useEffect(() => {
    if (state.loaded) return
      ; (async () => {
        setLoading(true)
        try {
          const res = await getAllEnumPackage()
          setState({
            loaded: true,
            package_type: res.package_types ?? [],
            package_tier: res.package_tiers ?? [],
            billing_type: res.billing_types ?? [],
          })
        } finally {
          setLoading(false)
        }
      })()
  }, [state.loaded, setState])

  return {
    package_type: state.package_type,
    package_tier: state.package_tier,
    billing_type: state.billing_type,
    loading_enum_package: loading,
  }
}

export const useFetchEnumDataMetric = () => {
  const [state, setState] = useAtom(enumDataMetricAtom);
  const [loading, setLoading] = useState(!state.loaded);

  useEffect(() => {
    if (state.loaded) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getAllEnumDataMetric();
        const list: IDataMetric[] = Array.isArray(res) ? res : res ?? [];
        const owner = list.filter((x) => x.owner_level === true);
        const branch = list.filter((x) => x.owner_level === false);
        console.log('list', list)
        console.log('owner', owner)
        console.log('branch', branch)
        setState({
          loaded: true,
          owner_level: owner,
          branch_level: branch,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [state.loaded, setState]);

  return {
    owner_level: state.owner_level,
    branch_level: state.branch_level,
    loading_data_metric: loading,
  };
};

export const useFetchLicenseProduct = () => {
  const [state, setState] = useAtom(enumDataMetricAtom);
  const [loading, setLoading] = useState(!state.loaded);

  useEffect(() => {
    if (state.loaded) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getAllEnumDataMetric();
        const list: IDataMetric[] = Array.isArray(res) ? res : res ?? [];
        const owner = list.filter((x) => x.owner_level === true);
        const branch = list.filter((x) => x.owner_level === false);
        console.log('list', list)
        console.log('owner', owner)
        console.log('branch', branch)
        setState({
          loaded: true,
          owner_level: owner,
          branch_level: branch,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [state.loaded, setState]);

  return {
    owner_level: state.owner_level,
    branch_level: state.branch_level,
    loading_data_metric: loading,
  };
};

export const useLicenseProductFetch = (page: string) => {
  const [loading, setLoading] = useState(true);
  const [product_data, setProduct_Data] = useState<IPagePermission[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        console.log('page', page)

        const getData = await getLicensePackageByPage(Number(page));
        console.log('getData', getData);

        if (R.isEmpty(getData) || R.isNil(getData)) {
          // await Swal.fire({
          //     title: `ไม่พบข้อมูล`,
          //     text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
          //     icon: 'warning',
          //     confirmButtonColor: '#3085d6',
          //     confirmButtonText: 'OK',
          // });
          setProduct_Data([])
          return;
        }
        setProduct_Data(getData)
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  return {
    loading,
    product_data
  };
};

const cacheKey = (p: {
  search: string;
  limit: number;
  tier: string;
  type: string;
  billing: string;
  active: string;
}) =>
  JSON.stringify({
    q: p.search.trim().toLowerCase(),
    l: p.limit,
    t: p.tier,
    y: p.type,
    b: p.billing,
    a: p.active ? "1" : "0",
  });

export const usePkgMainWithCache = () => {
  const [searchState] = useAtom(searchStatePackageMain);
  const [cache, setCache] = useAtom(pkgMainCacheAtom);
  const [loading, setLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false); // 👈 flag ให้ reload ทันทีที่เปิด

  const limitNum = Number(searchState.limit || "10");

  const key = useMemo(
    () =>
      cacheKey({
        search: searchState.search,
        limit: limitNum,
        tier: searchState.package_tier_code,
        type: searchState.package_type_code,
        billing: searchState.billing_type_code,
        active: searchState.is_active,
      }),
    [
      searchState.search,
      searchState.package_tier_code,
      searchState.package_type_code,
      searchState.billing_type_code,
      searchState.is_active,
      limitNum,
    ]
  );

  const entry: PkgMainCacheEntry =
    cache[key] ?? { items: [], pages: new Set<number>(), ended: false };

  /** โหลดหน้า n (จะไม่ยิงซ้ำถ้าเคยโหลดแล้ว หรือจบหน้าสุดท้ายแล้ว) */
  const loadPage = useCallback(
    async (page: number, forceReload = false) => {
      // ถ้าไม่บังคับ reload และ cache มีหน้าแล้ว → ข้าม
      if (!forceReload && (entry.ended || entry.pages.has(page))) return;

      setLoading(true);
      try {
        const res = await getAllMasterPackage({
          search: searchState.search,
          page: String(page),
          limit: String(limitNum),
          package_tier_code: searchState.package_tier_code,
          package_type_code: searchState.package_type_code,
          billing_type_code: searchState.billing_type_code,
          is_active: searchState.is_active,
        });

        const raw: any[] = res?.data ?? [];
        const mapped: IPackageItemMain[] = raw.map((x) => ({
          package_id: x.package_id ?? "",
          package_name: x.package_name ?? "",
          package_code: x.package_code ?? "",
          is_active: !!x.is_active,
          price_daily: x.price_daily,
          price_monthly: x.price_monthly,
          price_yearly: x.price_yearly,
        }));

        setCache((prev) => {
          const cur = forceReload
            ? { items: [], pages: new Set<number>(), ended: false } // 👈 เคลียร์ cache ก่อน
            : prev[key] ?? { items: [], pages: new Set<number>(), ended: false };

          const pages = new Set(cur.pages);
          pages.add(page);

          const merged = forceReload ? mapped : [...cur.items];
          if (!forceReload) {
            for (const m of mapped) {
              if (!merged.some((p) => String(p.package_id) === String(m.package_id))) {
                merged.push(m);
              }
            }
          }

          const ended = mapped.length < limitNum;
          return {
            ...prev,
            [key]: { items: merged, pages, ended: cur.ended || ended },
          };
        });
      } finally {
        setLoading(false);
      }
    },
    [
      entry.ended,
      entry.pages,
      key,
      limitNum,
      searchState.is_active,
      searchState.search,
      searchState.package_tier_code,
      searchState.package_type_code,
      searchState.billing_type_code,
      setCache,
    ]
  );

  // โหลดครั้งแรก (หรือเมื่อ key เปลี่ยน)
  useEffect(() => {
    if (!cache[key]) void loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // ✅ trigger เมื่อ modal เปิด → บังคับ reload ล่าสุด
  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      void loadPage(1, true); // 👈 reload แบบ force
    }
  }, [shouldReload, loadPage]);

  const nextPage = useMemo(() => {
    if (entry.pages.size === 0) return 1;
    return Math.max(...Array.from(entry.pages)) + 1;
  }, [entry.pages]);

  return {
    items: entry.items,
    loading,
    hasMore: !entry.ended,
    loadFirst: () => loadPage(1, true), // 👈 force reload ทุกครั้ง
    loadNext: () => loadPage(nextPage),
    reloadNow: () => setShouldReload(true), // 👈 ใช้ตอนเปิด modal
  };
};


export const useFetchAllMasterPackageMain = () => {
  const [searchState] = useAtom(searchStatePackage);
  const [packagedata, setPackage_Data] = useState<IPackageItem[]>([]);
  const [status_data, setStatus_Data] = useState<IStatusData[]>([]);
  const [loading_package, setLoading_package] = useState(true);
  const [total_package, setTotal_package] = useState<number>(0);
  const [version, setVersion] = useState(0);

  const reload = () => setVersion(v => v + 1); // เรียกดึงใหม่

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading_package(true);
      try {
        console.log("searchState", searchState)
        // กัน cache เล็กน้อย (ทางเลือก)
        const res = await getAllMasterPackage(searchState);
        const data = res?.data ?? [IPackageItemDefaul];
        setPackage_Data(data)

        const fixedStatusData: IStatusData[] = res.status_data.map((d) => ({
          labal: d.labal, // map labal → label
          code: d.code as StatusKey,
          qty: d.qty,
        }));
        console.log('fixedStatusData', fixedStatusData)
        const totalQty = fixedStatusData.find((item) => item.code === '0')?.qty ?? 0;
        setTotal_package(totalQty)
        setStatus_Data(fixedStatusData)
        console.log('useFetchPackage', res)
        if (cancelled) return;


      } finally {
        if (!cancelled) setLoading_package(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [searchState, version]);

  return { packagedata, loading_package, total_package, status_data, reload };
};

export const usePackageCompatibleMain = (packageId?: string) => {
  const [loading_add, setLoading_Add] = useState(false);
  const [package_add, setPackage_Add] = useState<IPackageItem[]>([]);

  useEffect(() => {
    if (!packageId) return;

    (async () => {
      setLoading_Add(true);
      try {
        const data = await getPackageCompatibleMain(packageId);
        console.log("[effect] compatible data =", data);
        setPackage_Add(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading_Add(false);
      }
    })();
  }, [packageId]);

  return { loading_add, package_add };
};