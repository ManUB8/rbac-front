export interface IProvince {
  id: number;
  name_th: string;
  name_en: string;
  geo_id: number;
  geography_name: string;
}

export interface IDistrict {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
  province_name_th: string;
  province_name_en: string;
}

export interface ISubDistrict {
  id: number;
  zip_code: string;
  name_th: string;
  name_en: string;
  district_id: number;
  district_name_th: string;
  district_name_en: string;
}
