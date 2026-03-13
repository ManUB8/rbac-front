import { useAtom, type SetStateAction } from "jotai";
import { useCallback, useMemo, useRef, useState } from "react";
import { searchStateOwner } from "./Atom";
import type { NavigateFunction } from "react-router";
import { CreateOwner, DeleteOwnerByOne, getCheckEmail, UpdateOwner } from "../service/OwnerApi";
import { debounce } from "@mui/material";
import type { FieldErrors, Path, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import { IOwnerItemDefault, type IOwnerItem } from "../interface/Owner.interface";
import type { ITextPopup } from "../../../shared/components/popup/PopupConfirm.interface";
import type { ITextAlert } from "../../../shared/components/message/Alert.interface";
import { ExportExcelFileOwner } from "./useFetchOwner";
import { getAllErrorPaths, isOutOfView } from "../../../shared/components/error/FunctionError";

export function useHandleChangeSearch(delay = 800) {
  const [_, setSearchState] = useAtom(searchStateOwner);
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
          owner_search: value || "", // ← ใช้ key "search" ตามของคุณ
        }));
      }, delay);
    },
    [delay, setSearchState]
  );

  return { handleChangeSearch };
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

export const handleCreate = (navigate: NavigateFunction) => {
  navigate(`/owner-management/view/create/0`);
};

export const handleOpenFilter = (open: boolean) => {
  console.log('open', open)
};

export const exportExcelFile = async ({
  setIsLoadData
}: {
  setIsLoadData: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoadData(true);
    await ExportExcelFileOwner();
  } catch (error) {
    console.error("Error exporting Excel file:", error);
  } finally {
    setIsLoadData(false);
  }
};

export function useCheckEmail(
  setValue: UseFormSetValue<IOwnerItem>,
  setError: UseFormSetError<IOwnerItem>,
  clearErrors: UseFormClearErrors<IOwnerItem>,
  delay = 800
) {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const doCheckEmail = useMemo(
    () =>
      debounce(async (raw: string) => {
        const email = (raw ?? '').trim();

        // ถ้าว่าง → ล้าง error และไม่ต้อง call API
        if (!email) {
          clearErrors('email');
          setValue('email', '');
          return;
        }

        // format ไม่ถูกต้อง → set error แล้วหยุด
        if (!EMAIL_REGEX.test(email)) {
          setError('email', { message: 'กรุณากรอกฟอร์ม Email ให้ถูกต้อง' });
          return;
        }

        setIsCheckingEmail(true);
        try {
          const res = await getCheckEmail(email);

          if (res.is_duplicate) {
            setError('email', { message: 'Email ถูกใช้งานแล้ว' });
          } else {
            clearErrors('email');
            setValue('email', email);
          }
        } catch (e) {
          // fallback เงียบ ๆ หรือจะแจ้ง error ก็ได้
          setError('email', { message: 'ไม่สามารถตรวจสอบอีเมลได้' });
        } finally {
          setIsCheckingEmail(false);
        }
      }, delay),
    [clearErrors, delay, setError, setValue]
  );

  return { checkEmail: doCheckEmail, isCheckingEmail };
}

// ====== Hook จัดการ password / confirm_password ======
export function usePasswordFields(
  getValues: UseFormGetValues<IOwnerItem>,
  setValue: UseFormSetValue<IOwnerItem>,
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

export const handleAddBranch = (
  getValues: UseFormGetValues<IOwnerItem>,
  actype: string,
  navigate: NavigateFunction,
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>
) => {
  console.log("ADDD BRANCH");
  console.log("actype", actype);

  const currentValues = getValues(); // ดึงค่าปัจจุบันจากฟอร์ม
  console.log("currentValues", currentValues);

  if (actype === "create") {
    const current = getValues();       // ค่าที่กรอกอยู่ในฟอร์มเจ้าของ
    setOwner(current);
    navigate(`/owner-management/branch/create/0`);
  } else if (actype === "edit") {
    console.log("edit-ac");
    const current = getValues();       // ค่าที่กรอกอยู่ในฟอร์มเจ้าของ
    setOwner(current);
    navigate(`/owner-management/branch/create/1`);
  }
};

export const onSubmitOwner = ({
  getValues,
  navigate,
  id,
  setOwner,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IOwnerItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'normal',
    title: 'ยืนยันการบันทึกบัญชีผู้ใช้งาน',
    content: 'โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกบัญชีผู้ใช้งาน',
    onClose: () => { setConfirmPopup(null); },
    onConfirm: async () => {
      await saveHandlerOwner({
        getValues,
        navigate,
        id,
        setOwner,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

const saveHandlerOwner = async ({
  getValues,
  navigate,
  id,
  setOwner,
  setFlash
}: {
  getValues: UseFormGetValues<IOwnerItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  const getFormData = getValues()
  try {

    console.log("getFormData", getFormData)
    if (id === '0') {
      const resp = await CreateOwner(getFormData)
      setFlash({
        type_severity: "success",
        title: "",
        content: "การสร้างบัญชีผู้ใช้งานสำเร็จ",
      });
      navigate('/owner-management')
      setOwner(IOwnerItemDefault)
    }
    else {
      const resp = await UpdateOwner(getFormData)
      setFlash({
        type_severity: "success",
        title: "",
        content: "แก้ไขบันทึกบัญชีผู้ใช้งานสำเร็จ",
      });
      navigate('/owner-management')
    }
  } catch (error) {
  } finally {
    // setIsLoadData(false)
  }
}

export const onClickDeleteOwner = ({
  id,
  navigate,
  setFlash,
  reload,
  setConfirmPopup
}: {
  id: string;
  navigate: NavigateFunction;
  setFlash: (f: ITextAlert | null) => void;
  reload: () => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'warning',
    title: 'ท่านต้องการลบบัญชีเจ้าของร้าน !!',
    content: 'ยืนยันหากต้องการลบบัญชีเจ้าของร้าน บัญชีเจ้าของร้านที่ลบไม่สามารถนำกลับมาได้',
    onClose: () => setConfirmPopup(null),
    onConfirm: async () => {
      await handleDelete({ id, navigate, setFlash, reload });
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

export const handleDelete = async ({
  id,
  navigate,
  setFlash,
  reload
}: {
  navigate: NavigateFunction;
  id: string;
  setFlash: (f: ITextAlert | null) => void;
  reload: () => void;
}) => {
  try {

    const Id = id
    console.log('DeleteOwnerByOne', Id)
    const res = await DeleteOwnerByOne(Id);
    setFlash({
      type_severity: "success",
      title: "",
      content: "ลบบัญชีผู้ใช้งานข้อมูลสำเร็จ",
    });
    reload();
  } catch (error) {
  } finally {
  }
};