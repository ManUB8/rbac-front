import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFacultyStudentMange, getMajorFaculty, getOneStudent, getStudentMange } from "../service/StudentMangeApi";
import { IStudentDataDefule, type IFacultyItem, type IMajorItem, type IStudentByMajorResponse, type IStudentItem } from "../interface/StudentMange.interface";
import { useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as R from 'ramda';
import { MasterStudentZod } from "../utils/ValidationMasterStudent";
import Swal from "sweetalert2";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";

type ViewMode = "faculty" | "branch" | "student";

export const useStudentMangeFetch = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);

    const [viewMode, setViewMode] = useState<ViewMode>("faculty");
    const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null);
    const [selectedFacultyName, setSelectedFacultyName] = useState<string>("");
    const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
    const [selectedMajorName, setSelectedMajorName] = useState<string>("");

    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Facultyquery = useQuery<IFacultyItem[], Error>({
        queryKey: ["faculty", version],
        retry: 1,
        queryFn: async () => {
            return await getFacultyStudentMange();
        },
    });

    const Majorquery = useQuery<IMajorItem[], Error>({
        queryKey: ["major", selectedFacultyId, version],
        enabled: !!selectedFacultyId,
        retry: 1,
        queryFn: async () => {
            if (!selectedFacultyId) {
                throw new Error("ไม่พบ faculties_id");
            }
            return await getMajorFaculty(selectedFacultyId);
        },
    });

    const Studentquery = useQuery<IStudentByMajorResponse, Error>({
        queryKey: ["student-major", selectedMajorId, version],
        enabled: !!selectedMajorId,
        retry: 1,
        queryFn: async () => {
            if (!selectedMajorId) {
                throw new Error("ไม่พบ major_id");
            }
            return await getStudentMange(selectedMajorId);
        },
    });

    const handleSelectFaculty = (faculty: IFacultyItem) => {
        setSelectedFacultyId(faculty.faculty_id);
        setSelectedFacultyName(faculty.faculty_name);
        setSelectedMajorId(null);
        setSelectedMajorName("");
        setViewMode("branch");
    };

    const handleSelectMajor = (major: IMajorItem) => {
        setSelectedMajorId(major.major_id);
        setSelectedMajorName(major.major_name);
        setViewMode("student");
    };

    const handleBackToFaculty = () => {
        setSelectedFacultyId(null);
        setSelectedFacultyName("");
        setSelectedMajorId(null);
        setSelectedMajorName("");
        setViewMode("faculty");
    };

    const handleBackToBranch = () => {
        setSelectedMajorId(null);
        setSelectedMajorName("");
        setViewMode("branch");
    };

    return {
        navigate,
        reload,

        viewMode,
        selectedFacultyId,
        selectedFacultyName,
        selectedMajorId,
        selectedMajorName,

        studentmange_data: Facultyquery.data ?? [],
        major_data: Majorquery.data ?? [],
        student_data: Studentquery.data?.student ?? [],
        total_student: Studentquery.data?.count_student ?? 0,

        handleSelectFaculty,
        handleSelectMajor,
        handleBackToFaculty,
        handleBackToBranch,

        facultyLoading: Facultyquery.isLoading,
        majorLoading: Majorquery.isLoading,
        studentLoading: Studentquery.isLoading,

        facultyFetching: Facultyquery.isFetching,
        majorFetching: Majorquery.isFetching,
        studentFetching: Studentquery.isFetching,

        facultyError: Facultyquery.error,
        majorError: Majorquery.error,
        studentError: Studentquery.error,

        refetchFaculty: Facultyquery.refetch,
        refetchMajor: Majorquery.refetch,
        refetchStudent: Studentquery.refetch,
    };
};

export type IuseStudentMangeFetch = ReturnType<typeof useStudentMangeFetch>;

export const useMasterFunctionStudentFromFetch = ({
    id = 0,
    facultyId,
    majorId,
    openStudentModal,
    setOpenStudentModal,
}: {
    id?: number;
    facultyId?: number | null;
    majorId?: number | null;
    openStudentModal: boolean;
    setOpenStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const Id = id ?? 0;
    const isCreate = Id === 0;
    const [actype, setActype] = useState<"create" | "edit">("create");
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const methods = useForm<IStudentItem>({
        resolver: zodResolver(MasterStudentZod as any) as Resolver<IStudentItem>,
        defaultValues: IStudentDataDefule,
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
        setFocus,
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
            reset({
                ...IStudentDataDefule,
                faculty_id: facultyId ?? 0,
                major_id: majorId ?? 0,
            });
        }
    }, [isCreate, openStudentModal, reset, facultyId, majorId]);

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
                console.log("Create-form", form);

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "การสร้างข้อมูลสำเร็จ",
                });

                setOpenStudentModal(false);
                reset(IStudentDataDefule);
                return;
            }

            console.log("Update-form", form);

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

    const handleDelete = useCallback(async () => {
        try {
            const idToDelete = !isCreate ? Id : getValues("student_id");

            console.log("delete id", idToDelete);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ลบข้อมูลสำเร็จ",
            });

            setOpenStudentModal(false);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
            });
        }
    }, [getValues, isCreate, Id, setFlash, setOpenStudentModal]);

    const onClickDeleteMaster = useCallback(() => {
        setConfirmPopup({
            type: "warning",
            title: "ท่านต้องการลบข้อมูล !!",
            content: "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
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
        setFlash,
        setConfirmPopup,
        navigate,
        theme,
        methods,
        onSubmitMaster,
        onClickDeleteMaster,
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