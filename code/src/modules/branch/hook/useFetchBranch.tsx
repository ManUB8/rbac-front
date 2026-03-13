import { useEffect, useState } from "react";
import { IBranchItemDefault, type IBranchItem } from "../interface/Branch.interface";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchZod } from "../../../shared/components/FieldValidation";
import * as R from 'ramda';
import Swal from "sweetalert2";
import { getBranchType, getBranchByOne, getProvince, getDistrict, getSubDistrict } from "../service/BranchApi";
import type { IFilterBranchType } from "../interface/BranchType.interface";
import { useAtom } from "jotai";
import { OwnerState } from "../../owner/hook/Atom";
import type { IDistrict, IProvince, ISubDistrict } from "../interface/Address.interface";

// export const useBranchsFromFetch = (branch_id: string) => {
//     const [loading, setLoading] = useState(true);
//     const [actype, setActype] = useState("");
//     const {
//         register, handleSubmit, reset, setValue, watch, getValues, control, setError, clearErrors,
//         formState: { errors },
//     } = useForm<IBranchItem>({
//         resolver: zodResolver(BranchZod as any) as Resolver<IBranchItem>,
//         defaultValues: IBranchItemDefault,
//     });

//     useEffect(() => {
//         (async () => {
//             setLoading(true)
//             try {
//                 console.log('branch_id', branch_id)
//                 if (branch_id === '0') {
//                     setActype('create')
//                     reset(IBranchItemDefault);
//                     setLoading(false);
//                     return;
//                 }
//                 if (branch_id === '1') {
//                     setActype('create')
//                     reset(IBranchItemDefault);
//                     setLoading(false);
//                     return;
//                 }

//                 const getData = await getBranchByOne(branch_id);
//                 console.log('getData', getData);

//                 if (R.isEmpty(getData) || R.isNil(getData)) {
//                     setLoading(false);
//                     await Swal.fire({
//                         title: `ไม่พบข้อมูล`,
//                         text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
//                         icon: 'warning',
//                         confirmButtonColor: '#3085d6',
//                         confirmButtonText: 'OK',
//                     });
//                     return;
//                 }
//                 setActype('edit')
//                 reset(getData);
//             } catch (error) {
//                 console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
//                 Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, [branch_id, reset]);

//     useEffect(() => {
//         console.log('Valuse Set', getValues())
//     }, [watch()])

//     return {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         watch,
//         getValues,
//         control,
//         loading,
//         errors,
//         actype,
//         setError,
//         clearErrors
//     };
// };


export const useBranchsFromFetch = (branchParam: string) => {
    const [owner] = useAtom(OwnerState);
    const [loading, setLoading] = useState(true);
    const [actype, setActype] = useState('');
    const {
        register, handleSubmit, reset, setValue, watch, getValues, control, setError, clearErrors, setFocus,
        formState: { errors },
    } = useForm<IBranchItem>({
        resolver: zodResolver(BranchZod as any) as Resolver<IBranchItem>,
        defaultValues: IBranchItemDefault,
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log('branchParam', branchParam)
            try {
                // โหมดสร้างใหม่แบบว่าง
                if (branchParam === '0' || branchParam === '1' || branchParam === '2') {
                    setActype('create');
                    // reset(IBranchItemDefault);
                    reset({ ...IBranchItemDefault, actype: 'create' });
                    return;
                }

                // ถ้าเป็น temp id
                if (branchParam.startsWith('tmp_')) {
                    setActype('create'); // ยังไม่บันทึกจริง
                    const found = owner?.branches?.find(b => b.temp_id === branchParam);
                    reset(found ?? { ...IBranchItemDefault, actype: 'create' });
                    return;
                }

                // กรณีเป็น id จริง → call backend
                const getData = await getBranchByOne(branchParam);
                if (!getData) {
                    await Swal.fire({ title: 'ไม่พบข้อมูล', icon: 'warning' });
                    return;
                }
                setActype('edit');
                reset(getData);
            } catch (e) {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
            } finally {
                setLoading(false);
            }
        })();
    }, [branchParam, owner, reset]);

    useEffect(() => {
        console.log('Valuse Set', getValues())
    }, [watch()])
    return {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        loading,
        errors,
        actype,
        setError,
        clearErrors,
        setFocus
    };
};

export function useFetchBranchType() {
    const [branch_type, setBranch_type] = useState<IFilterBranchType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const res = await getBranchType()
            if (!mounted) return;

            if (R.isEmpty(res) || R.isNil(res)) {
                await Swal.fire({
                    title: `ไม่พบข้อมูล`,
                    text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                return;
            }

            setBranch_type(res);

        })().finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    return { branch_type, loading_branch_type: loading };
}

export function useFetchProvince() {
    const [province, setProvince] = useState<IProvince[]>([]);
    const [loading_province, setLoading_Province] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const res = await getProvince()
            if (!mounted) return;

            if (R.isEmpty(res) || R.isNil(res)) {
                await Swal.fire({
                    title: `ไม่พบข้อมูล`,
                    text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                return;
            }

            setProvince(res);

        })().finally(() => mounted && setLoading_Province(false));
        return () => { mounted = false; };
    }, []);

    return { province, loading_province };
}

export function useFetchDistrict(province_id: number) {
    const [district, setDistrict] = useState<IDistrict[]>([]);
    const [loading_district, setLoading_District] = useState(false);

    useEffect(() => {
        // ถ้าไม่มี id → ไม่ต้องโหลด / เคลียร์ของเก่าได้ตามต้องการ
        if (!province_id) {
            setDistrict([]);
            setLoading_District(false);
            return;
        }

        let mounted = true;
        const run = async () => {
            setLoading_District(true);
            try {
                const res = await getDistrict(province_id);
                if (!mounted) return;

                if (R.isEmpty(res) || R.isNil(res)) {
                    await Swal.fire({
                        title: `ไม่พบข้อมูล`,
                        text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    setDistrict([]); // เคลียร์ค่าเมื่อไม่พบ
                    return;
                }
                setDistrict(res);
            } finally {
                mounted && setLoading_District(false);
            }
        };

        run();
        return () => { mounted = false; };
    }, [province_id]);

    return { district, loading_district };
}

export function useFetchSubDistricts(district_id: number) {
    const [sub_districts, setSub_Districts] = useState<ISubDistrict[]>([]);
    const [loading_sub_districts, setLoading_Sub_Districts] = useState(false);

    useEffect(() => {
        if (!district_id) {
            setSub_Districts([]);
            setLoading_Sub_Districts(false);
            return;
        }
        console.log('district_id', district_id)
        let mounted = true;
        const run = async () => {
            setLoading_Sub_Districts(true);
            try {
                const res = await getSubDistrict(district_id);
                console.log("useFetchSubDistricts", res)
                if (!mounted) return;

                if (R.isEmpty(res) || R.isNil(res)) {
                    await Swal.fire({
                        title: `ไม่พบข้อมูล`,
                        text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    setSub_Districts([]);
                    return;
                }
                setSub_Districts(res);
                console.log(res)
            } finally {
                mounted && setLoading_Sub_Districts(false);
            }
        };

        run();
        return () => { mounted = false; };
    }, [district_id]);

    return { sub_districts, loading_sub_districts };
}