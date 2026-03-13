import { atom } from "jotai";
import type { IDataMetric, IEnumPackageType, IPackageItemMain, ISearchContextPackage } from "../interface/PackageServices.interface";


export const searchStatePackage = atom<ISearchContextPackage>({
  search: '',
  page: '1',
  limit: '20',
  package_tier_code: '0',
  package_type_code: '0',
  billing_type_code: '0',
  is_active: '0',
});

export const searchStatePackageMain = atom<ISearchContextPackage>({
  search: '',
  page: '1',
  limit: '10',
  package_tier_code: '0',
  package_type_code: '1',
  billing_type_code: '0',
  is_active: '1',
});

type CacheKey = string;

export type PkgMainCacheEntry = {
  items: IPackageItemMain[];
  pages: Set<number>;
  ended: boolean;
};
export type PkgMainCache = Record<CacheKey, PkgMainCacheEntry>;

export const pkgMainCacheAtom = atom<PkgMainCache>({});



export const enumPackageAtom = atom({
  loaded: false,
  package_type: [] as IEnumPackageType[],
  package_tier: [] as IEnumPackageType[],
  billing_type: [] as IEnumPackageType[],
})

type EnumDataMetricState = {
  loaded: boolean;
  owner_level: IDataMetric[];
  branch_level: IDataMetric[];
};

export const enumDataMetricAtom = atom<EnumDataMetricState>({
  loaded: false,
  owner_level: [],
  branch_level: [],
});

type LicenseProductState = {
  loaded: boolean;
  owner_level: IDataMetric[];
  branch_level: IDataMetric[];
};

export const enumLicenseProductAtom = atom<LicenseProductState>({
  loaded: false,
  owner_level: [],
  branch_level: [],
});