import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { searchStateStudent } from "./useContext";
import { CreateStudent, DeleteStudent, getAllStudent, getOneStudent, UpdateStudent } from "../service/Student_ManageApi";
import { useFetchFacultyMajors } from "../../Faculty_Majors/hook/useFetchFaculty_Majors";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as R from 'ramda';
import Swal from "sweetalert2";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";
import { IStudenItemDefule, type IStudentDeleteItem, type IStudentItem } from "../interface/Student_Manage.interface";
import { MasterStudentZod } from "../utils/FieldValidationStudent";


export const useMasterFunctionStudent = () => {
    const { faculty_majors, faculty_loading, } = useFetchFacultyMajors()
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const queryClient = useQueryClient();
    const [openStudentModal, setOpenStudentModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number>(0);

    const [searchState, setSearchStateStudent] = useAtom(searchStateStudent);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const debounceRef = useRef<number | null>(null);

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["students-list", searchState],
        queryFn: async () => {
            const res = await getAllStudent(searchState);
            console.log('students-res', res)
            return res;
        },
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    const student_data = data?.data ?? [];
    const total_student = data?.total_all ?? 0;
    const loading_student = isLoading || isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
    }, [queryClient]);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateStudent((prev) => ({
                ...prev,
                search: text || "",
                page: 1,
            }));
        }, 800);
    }, [setSearchStateStudent]);

    useEffect(() => {
        setSearchInput(searchState.search ?? "");
    }, [searchState.search]);

    const handleCreateStudent = useCallback(() => {
        setSelectedStudentId(0)
        setOpenStudentModal(true)
    }, [navigate]);

    const handleDelete = useCallback(async () => {
        try {
            const idToDelete = selectedStudentId;
            const name_by = localStorage.getItem("account_name") || "";

            console.log("deleteactivity", selectedStudentId)
            const data_delete: IStudentDeleteItem = {
                student_id: Number(selectedStudentId),
                updated_by_name: name_by,
            };

            if (!idToDelete) {
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "ไม่พบรหัสนักศึกษาที่ต้องการลบ",
                });
                return;
            }
            await DeleteStudent(data_delete);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลบข้อมูลนักศึกษาสำเร็จ",
            });

            reload();
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
            });
        }
    }, [selectedStudentId, setFlash, reload]);

    const onClickDeleteMaster = useCallback(() => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูลนักศึกษา !!",
            content: "ยืนยันหากต้องการลบข้อมูลนักศึกษา ข้อมูลนักศึกษาที่ลบไม่สามารถนำกลับมาได้",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await handleDelete();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [handleDelete, setConfirmPopup]);

    return {
        student_data,
        loading_student,
        total_student,

        setConfirmPopup,
        handleChangeSearch,
        searchInput,
        setSearchStateStudent,
        searchState,
        navigate,
        handleCreateStudent,

        reload,
        refetch,

        setFlash,
        openRows,
        setOpenRows,
        faculty_majors,
        faculty_loading,
        openStudentModal,
        setOpenStudentModal,
        selectedStudentId,
        setSelectedStudentId,
        onClickDeleteMaster
    };
};
export type IuseMasterFunctionStudent = ReturnType<typeof useMasterFunctionStudent>;


export const useMasterFunctionStudentFromFetch = ({
    id = 0,
    openStudentModal,
    reload,
    setOpenStudentModal,
}: {
    id?: number;
    openStudentModal: boolean;
    setOpenStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
}) => {
    const [searchState, setSearchStateStudent] = useAtom(searchStateStudent);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const Id = id ?? 0;
    const isCreate = Id === 0;
    const [actype, setActype] = useState<"create" | "edit">("create");
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const methods = useForm<IStudentItem>({
        resolver: zodResolver(MasterStudentZod as any) as Resolver<IStudentItem>,
        defaultValues: IStudenItemDefule,
        shouldFocusError: true,
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = methods;


    const query = useQuery({
        queryKey: ["student-one", Id],
        enabled: openStudentModal && !isCreate && !!Id,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            return await getOneStudent(Id);
        },
    });

    useEffect(() => {
        setActype(isCreate ? "create" : "edit");
    }, [isCreate]);

    useEffect(() => {
        if (isCreate && openStudentModal) {
            reset(IStudenItemDefule);
        }
    }, [isCreate, openStudentModal, reset]);

    const didInitRef = useRef(false);

    useEffect(() => {
        didInitRef.current = false;
    }, [Id, openStudentModal]);

    useEffect(() => {
        if (isCreate) return;
        if (!query.data) return;
        if (didInitRef.current) return;

        didInitRef.current = true;

        const getData = query.data as any;

        if (R.isEmpty(getData) || R.isNil(getData)) {
            Swal.fire({
                title: "ไม่พบข้อมูล",
                text: "เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            return;
        }

        reset(getData);
    }, [query.data, isCreate, reset]);

    useEffect(() => {
        if (isCreate) return;
        if (!query.isError) return;

        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", query.error);
    }, [isCreate, query.isError, query.error]);

    const loading = query.isLoading;

    const values = watch();
    useEffect(() => {
        console.log("Values Set", values);
    }, [values]);

    const handleErrorSubmit = async <T extends Record<string, any>>(
        errors: FieldErrors<T>,
        setFocus: UseFormSetFocus<T>
    ) => {
        const paths = getAllErrorPaths(errors);
        if (!paths.length) return;

        const pick =
            paths.find(
                (p) =>
                    document.getElementById(p) ||
                    document.querySelector(`[name="${p}"]`)
            ) ?? paths[0];

        setFocus(pick as Path<T>, { shouldSelect: true });

        requestAnimationFrame(() => {
            const el =
                (document.getElementById(pick) as HTMLElement | null) ||
                (document.querySelector(`[name="${pick}"]`) as HTMLElement | null);

            if (!el) return;

            const container = el.closest(".MuiDialogContent-root") as HTMLElement | null;

            if (!container) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            const elRect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();

            const top = container.scrollTop + (elRect.top - cRect.top) - 80;
            container.scrollTo({ top, behavior: "smooth" });
        });
    };

    const saveHandler = useCallback(async () => {
        const form = getValues();

        try {
            if (isCreate) {
                const name_by = localStorage.getItem("account_name") || "";
                const data_create = { ...form, created_by_name: name_by };
                console.log("Create-form", data_create);
                const res = await CreateStudent(data_create);


                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างข้อมูลสำเร็จ",
                });

                setOpenStudentModal(false);
                reset(IStudenItemDefule);
                return;
            }

            console.log("Update-form", form);
            const name_by = localStorage.getItem("account_name") || "";
            const data_update = { ...form, updated_by_name: name_by };
            const res = await UpdateStudent(data_update);
            await queryClient.invalidateQueries();
            await queryClient.invalidateQueries({ queryKey: ["students-list", searchState] });

            setFlash({
                type_severity: "success",
                title: "",
                content: "แก้ไขบันทึกข้อสำเร็จ",
            });

            setOpenStudentModal(false);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [getValues, isCreate, reset, setFlash, setOpenStudentModal]);

    const onSubmitMaster = useCallback(() => {
        setConfirmPopup({
            type: "normal",
            title: "ยืนยันการบันทึกข้อมูล",
            content: "โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกข้อมูล",
            onClose: () => setConfirmPopup(null),
            onConfirm: async () => {
                await saveHandler();
                setConfirmPopup(null);
            },
            confirmText: "ยืนยัน",
            cancelText: "ยกเลิก",
        });
    }, [saveHandler, setConfirmPopup]);

    return {
        register,
        handleSubmit,
        reset,
        setValue,
        reload,
        watch,
        getValues,
        control,
        loading,
        errors,
        actype,
        setError,
        clearErrors,
        setFlash,
        setConfirmPopup,
        navigate,
        methods,
        onSubmitMaster,
        handleErrorSubmit,
        refetch: query.refetch,
        queryError: query.error,
        openStudentModal,
        setOpenStudentModal,
        id: Id,
        isCreate,
    };
};

export type IuseMasterFunctionStudentFromFetch = ReturnType<typeof useMasterFunctionStudentFromFetch>;