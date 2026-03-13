import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useAtom, type SetStateAction } from 'jotai';
import { enumDataMetricAtom, searchStatePackage } from './AtomPackageServices';
import { useNavigate, useParams, type NavigateFunction } from 'react-router';
import type { StatusKey } from '../constants/package_option';
import { confirmPopupAtom } from '../../../../shared/components/constants/OptionsAtom';
import { IPackageItemDefaul, type IDataMetric, type IPackageItem, type IStatusData } from '../interface/PackageServices.interface';
import { CreatePackage, DeletePackageByOne, getAllEnumDataMetric, getAllMasterPackage, getPackageByOne, UpdatePackage } from '../service/PackageServicesApi';
import { AppRoutes } from '../../../../router/router';
import Swal from 'sweetalert2';
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormGetValues, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackageZod } from '../../../../shared/components/FieldValidation';
import * as R from 'ramda';

import type { ITextAlert } from '../../../../shared/components/message/Alert.interface';
import type { ITextPopup } from '../../../../shared/components/popup/PopupConfirm.interface';
import { useQuery } from '@tanstack/react-query';
import { getAllErrorPaths } from '../../../../shared/components/error/FunctionError';

export const useMasterFunctionPackage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [searchState, setSearchStatePackage] = useAtom(searchStatePackage);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);

    const [valueTab, setValueTab] = useState<StatusKey>(
        String(searchState.package_type_code) as StatusKey
    );

    const [packagedata, setPackage_Data] = useState<IPackageItem[]>([]);
    const [status_data, setStatus_Data] = useState<IStatusData[]>([]);
    const [loading_package, setLoading_package] = useState(false);
    const [total_package, setTotal_package] = useState<number>(0);
    const [version, setVersion] = useState(0);

    const reload = useCallback(() => setVersion((v) => v + 1), []);

    const selectedQty = useMemo(() => {
        if (!status_data?.length) return total_package;
        return status_data.find((s) => String(s.code) === String(valueTab))?.qty ?? 0;
    }, [status_data, valueTab, total_package]);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            setSearchStatePackage((prev) => ({
                ...prev,
                search: text || "",
                page: '1',
            }));
        }, 800);
    }, [setSearchStatePackage]);

    useEffect(() => {
        setSearchInput(searchState.search ?? "");
    }, [searchState.search]);


    const handleCreatePackage = useCallback(() => {
        navigate(`${AppRoutes.package_services}/view/create/0`);
    }, [navigate]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading_package(true);
            try {
                const res = await getAllMasterPackage(searchState);
                if (cancelled) return;

                const data = res?.data ?? [];
                setPackage_Data(data);

                const fixedStatusData: IStatusData[] = (res?.status_data ?? []).map((d: any) => ({
                    labal: d.labal,
                    code: String(d.code) as StatusKey,
                    qty: d.qty,
                }));

                setStatus_Data(fixedStatusData);

                const totalQty = fixedStatusData.find((item) => item.code === "0")?.qty ?? 0;
                setTotal_package(totalQty);
            } finally {
                if (!cancelled) setLoading_package(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [searchState, version]);

    return {
        packagedata,
        loading_package,
        total_package,
        selectedQty,
        status_data,
        searchState,
        setSearchStatePackage,
        valueTab,
        setValueTab,
        setConfirmPopup,
        handleChangeSearch,
        searchInput,
        navigate,
        theme,
        handleCreatePackage,
        reload,
    };
};

export type IuseMasterFunctionPackage = ReturnType<typeof useMasterFunctionPackage>;

export const useMasterFunctionPackageFromFetch = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { id: routeId } = useParams<{ id?: string }>();
    const package_id = routeId ?? "0";


    const [valueTab, setValueTab] = useState<string>("1");
    const [loading, setLoading] = useState(true);
    const [actype, setActype] = useState<"create" | "edit">("create");

    const methods = useForm<IPackageItem>({
        resolver: zodResolver(PackageZod as any) as Resolver<IPackageItem>,
        defaultValues: IPackageItemDefaul,
        shouldFocusError: true,
    });
    const { register, handleSubmit, reset, setValue, watch, getValues, control, setError, clearErrors, formState: { errors },setFocus } = methods;

    const params = useParams();
    console.log("params:", params);

    // ✅ Fetch package
    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            console.log('package_id', package_id)
            try {
                if (package_id === "0") {
                    if (cancelled) return;
                    setActype("create");
                    const current = getValues();
                    reset({ ...current, actype: "create" } as any);
                    return;
                }

                const data = await getPackageByOne(package_id);
                if (cancelled) return;

                if (R.isEmpty(data) || R.isNil(data)) {
                    await Swal.fire({
                        title: "ไม่พบข้อมูล",
                        text: "เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข",
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                    return;
                }

                setActype("edit");
                reset(data);
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
                if (!cancelled) Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลได้", "error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [package_id, reset, getValues]);

    // ✅ debug (optional)
    const values = watch();
    useEffect(() => console.log("Values", values), [values]);

    // const handleErrorSubmit = async (element: any) => {
    //     console.log("errorZod", element);
    // };

    const handleErrorSubmit = async <T extends Record<string, any>>(
      errors: FieldErrors<T>,
      setFocus: UseFormSetFocus<T>
    ) => {
      const paths = getAllErrorPaths(errors);
      if (!paths.length) return;
      console.log("paths", paths)
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
    

    const handleChangeTab = useCallback((_event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
    }, []);

    // ✅ normalize: device permissions
    const normalizeDevicePermissions = useCallback((perms: any[]) => {
        if (!Array.isArray(perms)) return [];
        return perms.map((dev) => ({
            product_device_id: dev.product_device_id,
            product_device_name: dev.product_device_name,
            is_selected: dev.is_selected ?? true,
            pages: Array.isArray(dev.pages) ? dev.pages.map((p: any) => p.page_id) : [],
            functions: Array.isArray(dev.functions) ? dev.functions.map((f: any) => f.function_id) : [],
        }));
    }, []);

    // ✅ normalize: compatible package ids
    const normalizeCompatible = useCallback((items: any[]) => {
        if (!Array.isArray(items)) return [];
        return items.map((p: any) => p.package_id);
    }, []);

    const saveHandler = useCallback(
        async ({
            getValues,
            navigate,
            package_id,
            setFlash,
        }: {
            getValues: UseFormGetValues<IPackageItem>;
            navigate: NavigateFunction;
            package_id: string;
            setFlash: (f: ITextAlert | null) => void;
        }) => {
            const form = getValues();

            const payload = {
                ...form,
                product_device_permissions: normalizeDevicePermissions(form.product_device_permissions as any),
                compatible_package_ids: normalizeCompatible(form.compatible_package_ids as any),
            };

            try {
                if (package_id === "0") {
                    await CreatePackage(payload as any);
                    setFlash({
                        type_severity: "success",
                        title: "",
                        content: "การสร้างแพ็คเกจใช้งานสำเร็จ",
                    });
                } else {
                    await UpdatePackage(payload as any);
                    setFlash({
                        type_severity: "success",
                        title: "",
                        content: "แก้ไขบันทึกแพ็คเกจใช้งานสำเร็จ",
                    });
                }

                navigate("/package-services");
            } catch (error) {
                console.error("Save package error:", error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "บันทึกไม่สำเร็จ โปรดลองอีกครั้ง",
                });
            }
        },
        [normalizeCompatible, normalizeDevicePermissions]
    );

    const onSubmitPackage = useCallback(
        ({
            getValues,
            navigate,
            package_id,
            setFlash,
            setConfirmPopup,
        }: {
            getValues: UseFormGetValues<IPackageItem>;
            navigate: NavigateFunction;
            package_id: string;
            setFlash: (f: ITextAlert | null) => void;
            setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
        }) => {
            setConfirmPopup({
                type: "normal",
                title: "ยืนยันการบันทึกแพ็คเกจ",
                content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกแพ็คเกจ",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await saveHandler({ getValues, navigate, package_id, setFlash });
                    setConfirmPopup(null);
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [saveHandler]
    );

    const handleDelete = useCallback(
        async ({
            id,
            navigate,
            setFlash,
            getValues,
            setConfirmPopup,
        }: {
            id?: string;
            getValues: UseFormGetValues<IPackageItem>;
            navigate: NavigateFunction;
            setFlash: (f: ITextAlert | null) => void;
            setConfirmPopup?: (update: SetStateAction<ITextPopup | null>) => void;
        }) => {
            try {
                const Id = id ?? getValues("package_id");
                if (!Id) {
                    setFlash({
                        type_severity: "warning",
                        title: "",
                        content: "ไม่พบ package_id สำหรับลบ",
                    });
                    return;
                }

                await DeletePackageByOne(Id);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลแพ็คเกจสำเร็จ",
                });

                setConfirmPopup?.(null);
                navigate("/package-services");
            } catch (error) {
                console.error("Delete error:", error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "ลบไม่สำเร็จ โปรดลองอีกครั้ง",
                });
            }
        },
        []
    );

    const onClickDeletePackage = useCallback(
        ({
            id,
            navigate,
            setFlash,
            getValues,
            setConfirmPopup,
        }: {
            id?: string;
            getValues: UseFormGetValues<IPackageItem>;
            navigate: NavigateFunction;
            setFlash: (f: ITextAlert | null) => void;
            setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
        }) => {
            setConfirmPopup({
                type: "warning",
                title: "ท่านต้องการลบแพ็คเกจ !!",
                content: "ยืนยันหากต้องการลบแพ็คเกจ แพ็คเกจที่ลบไม่สามารถนำกลับมาได้",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await handleDelete({ id, navigate, setFlash, getValues, setConfirmPopup });
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [handleDelete]
    );

    return {
        navigate,
        theme,

        package_id,
        actype,
        loading,

        valueTab,
        setValueTab,
        handleChangeTab,

        handleSubmit,
        setValue,
        watch,
        getValues,
        errors,
        setError,
        clearErrors,
        setFocus,
        methods,

        onSubmitPackage,
        handleErrorSubmit,
        onClickDeletePackage,
        handleDelete,
    };
};

export type IuseMasterFunctionPackageFromFetch = ReturnType<typeof useMasterFunctionPackageFromFetch>;


export function useFetchPackageType() {
    const mainQuery = useQuery({
        queryKey: ['master-package', 'main'],
        queryFn: async () => {
            const res = await getAllMasterPackage({
                search: '',
                page: '1',
                limit: '100',
                package_tier_code: '0',
                package_type_code: '1',
                billing_type_code: '0',
                is_active: '1',
            });
            return res?.data ?? [];
        },
    });

    const addOnQuery = useQuery({
        queryKey: ['master-package', 'addon'],
        queryFn: async () => {
            const res = await getAllMasterPackage({
                search: '',
                page: '1',
                limit: '100',
                package_tier_code: '0',
                package_type_code: '2',
                billing_type_code: '0',
                is_active: '1',
            });
            return res?.data ?? [];
        },
    });

    return {
        package_main: mainQuery.data ?? [],
        package_on: addOnQuery.data ?? [],
        loading: mainQuery.isLoading || addOnQuery.isLoading,
        error: mainQuery.error || addOnQuery.error,
        refetch: () => {
            mainQuery.refetch();
            addOnQuery.refetch();
        },
    };
}