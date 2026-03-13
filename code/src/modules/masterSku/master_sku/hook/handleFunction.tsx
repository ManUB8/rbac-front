import { useAtom, type SetStateAction } from "jotai";
import { useCallback, useMemo, useRef, useState } from "react";
import type { NavigateFunction } from "react-router";
import { Box, Button, Checkbox, debounce, Divider, Grid, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Typography } from "@mui/material";
import type { UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue } from "react-hook-form";
import { searchStateSku } from "./AtomSku";
import { AppRoutes } from "../../../../router/router";
import { useFetchCategory } from "./useFetchMasterSku";
import { setToStatus, SKU_TYPE_LABELS, sortFilterList, statusToSet, type StatusKey } from "../constants/sku_option";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import type { IMasterSkuData, IMasterSkuUpdateData } from "../interface/MadterSku.interface";
import type { ITextAlert } from "../../../../shared/components/message/Alert.interface";
import type { ITextPopup } from "../../../../shared/components/popup/PopupConfirm.interface";
import dayjs from "dayjs";
import { CreateMasterSku, CreatePhotoMasterSku, DeleteMasterSkuByOne, UpdateMasterSku } from "../service/MasterSkuApi";
import { HOST_SERVER } from "../../../../shared/service/axiosInstance";
import { ApiConfig } from "../../../../shared/service/ApiConfig";
import Cookies from 'js-cookie'

export function useHandleChangeSearch(delay = 800) {
  const [_, setSearchState] = useAtom(searchStateSku);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // ใช้ string ตรง ๆ หรือ event ก็ได้
  const handleChangeSearch = useCallback(
    (valueOrEvent: string | { target?: { value?: string } }) => {
      const value =
        typeof valueOrEvent === "string"
          ? valueOrEvent
          : valueOrEvent?.target?.value ?? "";

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSearchState((prev) => ({
          ...prev,
          search: value || "", // ← ใช้ key "search" ตามของคุณ
        }));
      }, delay);
    },
    [delay, setSearchState]
  );

  return { handleChangeSearch };
}

export const handleErrorSubmit = async (element: any) => {
  console.log("errorZod", element);
};

export const handleCreate = (navigate: NavigateFunction) => {
  navigate(`${AppRoutes.master_sku}/create/0`);
};

export const handleOpenFilter = (open: boolean) => {
  console.log('open', open)
};

export const onSubmitMasterSku = ({
  getValues,
  navigate,
  id,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IMasterSkuData>;
  navigate: NavigateFunction;
  id?: string;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'normal',
    title: 'ยืนยันการบันทึกข้อมูลสินค้ากลาง',
    content: 'โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูลสินค้ากลาง',
    onClose: () => { setConfirmPopup(null); },
    onConfirm: async () => {
      await saveHandler({
        getValues,
        navigate,
        id,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

const saveHandler = async ({
  getValues,
  navigate,
  id,
  setFlash
}: {
  getValues: UseFormGetValues<IMasterSkuData>;
  navigate: NavigateFunction;
  id?: string;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  const form = getValues();
  try {
    console.log("getFormData", form)
    if (id === '0') {
      const name_by = Cookies.get('accountName') || ''
      const data_create = { ...form, created_by: name_by }
      const resp = await CreateMasterSku(data_create)
      setFlash({
        type_severity: "success",
        title: "",
        content: "การสร้างข้อมูลสินค้ากลางสำเร็จ",
      });
      navigate(AppRoutes.master_sku)
    }
    else {
      const name_by = Cookies.get('accountName') || ''
      const mapFormToUpdateData = (form: any): IMasterSkuUpdateData => {
        return {
          master_item_id: form.master_item_id,
          master_item_code: form.master_item_code,
          master_item_name: form.master_item_name,
          image: form.image ?? "",
          category_id: form.category?.category_id ?? "",
          sub_category_id: form.sub_category?.sub_category_id ?? "",
          group_id: form.group?.group_id ?? "",
          stock_unit_id: form.stock_unit?.stock_unit_id ?? "",
          stock_unit_ratio: form.stock_unit?.stock_unit_ratio ?? "",
          small_units: form.small_units,
          warehouse_shelf_life: form.warehouse_shelf_life ?? "",
          warehouse_storage_type_id: form.warehouse_storage_type?.warehouse_storage_type_id ?? "",
          branch_shelf_life: form.branch_shelf_life ?? "",
          branch_storage_type_id: form.branch_storage_type?.branch_storage_type_id ?? "",
          is_active: Boolean(form.is_active),
          updated_by: name_by,
        };
      };
      const data_update = mapFormToUpdateData(form);
      console.log("data_update", data_update);
      const resp = await UpdateMasterSku(data_update)
      setFlash({
        type_severity: "success",
        title: "",
        content: "แก้ไขบันทึกข้อมูลสินค้ากลางสำเร็จ",
      });
      navigate(AppRoutes.master_sku)
    }
  } catch (error) {
  } finally {
    // setIsLoadData(false)
  }
}

export const onClickDeleteMasterSku = ({
  id,
  navigate,
  setFlash,
  getValues,
  setConfirmPopup
}: {
  id?: string;
  getValues: UseFormGetValues<IMasterSkuData>
  navigate: NavigateFunction;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'warning',
    title: 'ท่านต้องการลบข้อมูลสินค้ากลาง !!',
    content: 'ยืนยันหากต้องการลบข้อมูลสินค้ากลาง ข้อมูลสินค้ากลางที่ลบไม่สามารถนำกลับมาได้',
    onClose: () => setConfirmPopup(null),
    onConfirm: async () => {
      await handleDelete({ id, navigate, setFlash, getValues });
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

export const handleDelete = async ({
  id,
  navigate,
  setFlash,
  getValues,
}: {
  getValues: UseFormGetValues<IMasterSkuData>
  navigate: NavigateFunction;
  id?: string;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  try {

    const Id = id ? id : getValues('master_item_id')
    console.log('master_item_id', Id)
    const res = await DeleteMasterSkuByOne(Id);
    setFlash({
      type_severity: "success",
      title: "",
      content: "ลบข้อมูลแพ็คเกจสำเร็จ",
    });
    navigate(AppRoutes.master_sku)
  } catch (error) {
  } finally {
  }
};

// === 1) Helper อัปโหลดรูป แล้วคืน URL ===
export async function uploadMasterSkuImage(file: File, img_url: string): Promise<string> {
  const res = await CreatePhotoMasterSku(file, img_url);
  console.log('uploadMasterSkuImage res =', res);

  // ถ้า response เป็น string → สำเร็จแน่นอน
  if (typeof res === 'string') {
    const filePath = res;
    // const finalUrl = `${HOST_SERVER}${ApiConfig.UPLOAD_ROS_SKU_API}?image_path=${encodeURIComponent(filePath)}`;
    const finalUrl = `${ApiConfig.UPLOAD_ROS_SKU_API}?image_path=${encodeURIComponent(filePath)}`;
    return finalUrl;
  }

  // ถ้า response เป็น object
  const code = Number(res?.status?.code ?? 0);
  if (code !== 1000) {
    throw new Error(res?.status?.description || 'อัปโหลดไม่สำเร็จ');
  }

  const filePath = res?.data;
  if (!filePath) throw new Error('ไม่พบไฟล์รูป');

  // return `${HOST_SERVER}${ApiConfig.UPLOAD_ROS_SKU_API}?image_path=${encodeURIComponent(filePath)}`;
  return `${ApiConfig.UPLOAD_ROS_SKU_API}?image_path=${encodeURIComponent(filePath)}`;
}


const API_BASE = 'https://sys.apisupergourmet.com/api';
// หรือใช้ env ก็ได้ เช่น `${import.meta.env.VITE_API_DOMAIN}/api`

export const toStoredPath = (urlOrPath: string) => {
  if (!urlOrPath) return '';
  // ถ้าเป็น full url ที่ขึ้นต้นด้วย API_BASE -> ตัดให้เหลือแค่ path
  if (urlOrPath.startsWith(API_BASE)) {
    return urlOrPath.replace(API_BASE, '');
  }
  // ถ้าเป็น full url แต่ไม่ใช่ API_BASE ก็ลองตัดแบบ generic ด้วย URL()
  try {
    const u = new URL(urlOrPath);
    return `${u.pathname}${u.search}`;
  } catch {
    // กรณีเป็น path อยู่แล้ว
    return urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  }
};

export const toDisplayUrl = (urlOrPath: string) => {
  if (!urlOrPath) return '';
  // ถ้าเป็น full url อยู่แล้ว
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) return urlOrPath;
  // ถ้าเป็น path -> เติม base
  return `${API_BASE}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;
};