import type { FieldErrors, Path, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import type { IBranchItem } from "../interface/Branch.interface";
import type { ITextPopup } from "../../../shared/components/popup/PopupConfirm.interface";
import type { NavigateFunction } from "react-router";
import type { ITextAlert } from "../../../shared/components/message/Alert.interface";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import { CreateBranch, DeleteBranchByOne, getCheckUsername, UpdateBranch } from "../service/BranchApi";
import { IOwnerItemDefault, type IOwnerItem } from "../../owner/interface/Owner.interface";
import { nanoid } from 'nanoid';
import type { SetStateAction } from "jotai";
import { getAllErrorPaths, isOutOfView } from "../../../shared/components/error/FunctionError";

export function useCheckUsername(
  setValue: UseFormSetValue<IBranchItem>,
  setError: UseFormSetError<IBranchItem>,
  clearErrors: UseFormClearErrors<IBranchItem>,
  delay = 800
) {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const doCheckUsername = useMemo(
    () =>
      debounce(async (raw: string) => {
        const username = (raw ?? '').trim();

        // ถ้าว่าง → ล้าง error และไม่ต้อง call API
        if (!username) {
          clearErrors('username');
          setValue('username', '');
          return;
        }

        setIsCheckingUsername(true);
        try {
          const res = await getCheckUsername(username);

          if (res.is_duplicate) {
            setError('username', { message: 'username ถูกใช้งานแล้ว' });
          } else {
            clearErrors('username');
            setValue('username', username);
          }
        } catch (e) {
          // fallback เงียบ ๆ หรือจะแจ้ง error ก็ได้
          setError('username', { message: 'ไม่สามารถตรวจสอบอีเมลได้' });
        } finally {
          setIsCheckingUsername(false);
        }
      }, delay),
    [clearErrors, delay, setError, setValue]
  );

  return { checkUsername: doCheckUsername, isCheckingUsername };
}

// ====== Hook จัดการ password / confirm_password ======
export function usePasswordFields(
  getValues: UseFormGetValues<IBranchItem>,
  setValue: UseFormSetValue<IBranchItem>,
  minLen = 8
) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const toggleShowPassword = useCallback(() => setShowPassword((v) => !v), []);
  const toggleShowConfirm = useCallback(() => setShowConfirmPassword((v) => !v), []);

  const handlePasswordChange = useCallback(
    (field: 'password' | 'confirm_password', value: string) => {
      // อัปเดตค่าใน RHF
      setValue(field as any, value as any);

      const pwd = field === 'password' ? value : (getValues('password') ?? ('' as any));
      const cfm = field === 'confirm_password' ? value : (getValues('confirm_password') ?? ('' as any));

      // validate ความยาว
      setPasswordError(!pwd || pwd.trim().length < minLen);

      // validate ตรงกัน (เช็คเมื่อมีการกรอก)
      const shouldCheckMatch = !!cfm || !!pwd;
      setPasswordConfirmError(shouldCheckMatch && !!cfm && pwd !== cfm);
    },
    [getValues, setValue, minLen]
  );

  return {
    // state
    showPassword,
    showConfirmPassword,
    passwordError,
    passwordConfirmError,
    // actions
    toggleShowPassword,
    toggleShowConfirm,
    handlePasswordChange,
  };
}

// ====== Hook จัดการ password / confirm_password ======
export function usePINFields(
  getValues: UseFormGetValues<IBranchItem>,
  setValue: UseFormSetValue<IBranchItem>,
  pinLength = 6 // ✅ ความยาว PIN (เช่น 6 หลัก)
) {
  const [showPIN, setShowPIN] = useState(false);
  const [showConfirmPIN, setShowConfirmPIN] = useState(false);

  const [pinError, setPinError] = useState(false);
  const [pinConfirmError, setPinConfirmError] = useState(false);

  const toggleShowPIN = useCallback(() => setShowPIN((v) => !v), []);
  const toggleShowConfirmPIN = useCallback(() => setShowConfirmPIN((v) => !v), []);

  const handlePINChange = useCallback(
    (field: "pin" | "confirm_pin", value: string) => {
      // อัปเดตค่าใน React Hook Form
      setValue(field as any, value as any);

      const pin = field === "pin" ? value : getValues("pin") ?? "";
      const confirm = field === "confirm_pin" ? value : getValues("confirm_pin") ?? "";

      // ✅ validate ความยาว (ต้องครบ pinLength ตัว)
      setPinError(!pin || pin.trim().length < pinLength);

      // ✅ validate ว่า PIN ตรงกัน
      const shouldCheckMatch = !!pin || !!confirm;
      setPinConfirmError(shouldCheckMatch && !!confirm && pin !== confirm);
    },
    [getValues, setValue, pinLength]
  );

  return {
    // state
    showPIN,
    showConfirmPIN,
    pinError,
    pinConfirmError,
    // actions
    toggleShowPIN,
    toggleShowConfirmPIN,
    handlePINChange,
  };
}

// export const handleErrorSubmit = async (element: any) => {
//   console.log("errorZod", element);
// };

export const handleErrorSubmit = async <T extends Record<string, any>>(
  errors: FieldErrors<T>,
  setFocus: UseFormSetFocus<T>
) => {
  const paths = getAllErrorPaths(errors);
  if (!paths.length) return;
  console.log(paths)
  // ✅ เลือก path แรกที่ "มี element อยู่จริง" ก่อน
  const pick =
    paths.find((p) => document.getElementById(p) || document.querySelector(`[name="${p}"]`)) ??
    paths[0];
    
  console.log(pick)
  setFocus(pick as Path<T>, { shouldSelect: true });

  requestAnimationFrame(() => {
    const el =
      (document.getElementById(pick) as HTMLElement | null) ||
      (document.querySelector(`[name="${pick}"]`) as HTMLElement | null);

    if (!el) return;

    // ✅ หา container ที่ scroll จริง (DialogContent)
    const container = (el.closest(".MuiDialogContent-root") as HTMLElement | null);

    if (!container) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    const top = container.scrollTop + (elRect.top - cRect.top) - 80; // -80 เผื่อหัว sticky
    container.scrollTo({ top, behavior: "smooth" });
  });
};


export const onClickDeleteBranch = ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'normal',
    title: 'ท่านต้องการลบบัญชีสาขา',
    content: 'กดยืนยันหากต้องการลบบัญชีสาขา บัญชีสาขาที่ลบไม่สามารถนำกลับมาได้',
    onClose: () => setConfirmPopup(null),
    onConfirm: async () => {
      await handleDelete({
        getValues,
        navigate,
        id,
        setOwner,
        owner,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

export const handleDelete = async ({
  getValues,
  navigate,
  id,
  setOwner,
  setFlash
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  try {
    if (id?.startsWith('tmp_')) {
      setOwner(prev => {
        // if (!prev) return prev;
        return {
          ...prev,
          branches: (prev.branches ?? []).filter(b => b.temp_id !== id),
        };
      });
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'ลบบัญชีสาขาผู้ใช้งานข้อมูลสำเร็จ!!!',
      });
      navigate(-1);
    }
    else {
      const Id = getValues('id')
      console.log('DeleteBranchByOne', Id)
      const res = await DeleteBranchByOne(Id);
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'ลบบัญชีสาขาผู้ใช้งานข้อมูลสำเร็จ!!!',
      });
      navigate(-1);
    }
  } catch (error) {
  } finally {
  }
};

export const onSubmitBranch = ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  console.log('setConfirmPopup', setConfirmPopup)
  setConfirmPopup({
    type: 'normal',
    title: 'ยืนยันการบันทึกสาขา',
    content: 'โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกสาชา',
    onClose: () => { setConfirmPopup(null); },
    onConfirm: async () => {
      await saveHandlerBranch({
        getValues,
        navigate,
        id,
        setOwner,
        owner,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

const saveHandlerBranch = async ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  console.log('saveHandlerBranch')
  const tempId = 'tmp_' + nanoid(); // ตัวระบุชั่วคราว
  const formBranch = getValues()
  console.log("id", id)
  console.log("formBranch", formBranch)
  try {
    if (id === '0') {
      setOwner(prev => ({
        ...(prev ?? IOwnerItemDefault),
        branches: [
          ...(prev?.branches ?? []),
          { ...formBranch, id: '', temp_id: tempId }
        ],
      }));
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การสร้างสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else if (id === '1') {
      // CreateBranch
      const payload = {
        ...formBranch,
        owner_id: owner?.id || "", // ใช้ owner.id ถ้ามี

      };
      const resp = await CreateBranch(payload);
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การสร้างสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else if (id?.startsWith('tmp_')) {
      setOwner(prev => {
        // if (!prev) return prev;
        return {
          ...prev,
          branches: (prev.branches ?? []).map(b =>
            b.temp_id === id
              ? {
                // คง temp tag และ id เดิมไว้
                ...b,
                ...formBranch,
                id: b.id ?? '',          // กันหลุดเป็น undefined
                temp_id: b.temp_id,      // คงไว้เพื่อหาแก้ไขรอบต่อไปได้
              }
              : b
          ),
        };
      });

      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การบันทึกการแก้ไขสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else {
      // const nats = formBranch.nats_subscription;
      // const summary = formBranch.package_summary;

      const nats = formBranch.nats_subscription;
      const summary = formBranch.package_summary;

      const itemsFixed = (() => {
        const items = (nats?.items ?? []).map((it) => ({ ...it })); // clone กัน mutate ของเดิม
        if (items.length === 0) return items;

        const mainPackageId = (items[0] as any)?.package_id ?? ''; // ปรับ key ให้ตรงของจริงถ้าชื่อไม่ใช่ package_id

        // index 0 ต้องว่างเสมอ
        (items[0] as any).compatible_main_package_id = '';

        // index 1..n ต้องชี้ไปหา mainPackageId
        for (let i = 1; i < items.length; i++) {
          (items[i] as any).compatible_main_package_id = mainPackageId;
        }

        return items;
      })();
      if (formBranch.nats_subscription) delete formBranch.nats_subscription;

      const payload = {
        ...formBranch,
        package_request: {
          owner_id: nats?.owner_id || '',
          branch_id: nats?.branch_id || '',
          auto_renew: nats?.auto_renew || true,
          items: itemsFixed,
        },
        package_summary: {
          package_name_main: summary.package_main_name || summary.package_name_main,
          start_date: summary.start_at || summary.start_date,
          end_date: summary.end_at || summary.end_date,
          price: summary.total_price || summary.price,
          unit_price: summary.unit_price || summary.unit_price,
          payment_status: summary.payment_status || summary.payment_status,
          add_pk_Count: summary.addon_count || summary.add_pk_Count,
          add_pk: summary.add_pk || summary.addons,
        }

      };

      const resp = await UpdateBranch(payload);
      setOwner(IOwnerItemDefault)
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การบันทึกการแก้ไขสาขาสำเร็จ',
      });
      navigate(-1);
    }
  } catch (err) {
  } finally {
    // optional
  }
};

export const genMerchantId = () => {
  const ts = Math.floor(Date.now() / 1000); // 10 หลัก (seconds)
  const rnd = Math.floor(Math.random() * 1e4)
    .toString()
    .padStart(4, '0');
  return `MID${ts}-${rnd}`;
};