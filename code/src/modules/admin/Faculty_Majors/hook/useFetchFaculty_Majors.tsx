import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFaculty, CreateMajors, DeleteFaculty, DeleteMajors, getAllFaculty_Majors, getOneFaculty, getOneMajors, UpdateFaculty, UpdateMajors } from "../service/Faculty_MajorsApi";
import { IFacultyDataDefule, type IFaculty_MajorsItem, type IFacultyBody } from "../interface/Faculty_Majors.Interface";
import { useAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from "react-hook-form";
import * as R from 'ramda';
import Swal from "sweetalert2";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";
import { MasterFacultyZod } from "../utils/ValidationFaculty";
import { zodResolver } from "@hookform/resolvers/zod";



export const useFaculty_MajorsFetch = () => {
    const [version, setVersion] = useState(0);
    const [openRows, setOpenRows] = useState<Record<number, boolean>>({});

    const [openModal, setOpenModal] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [facultyId, setFacultyId] = useState<number>(0);
    const [majorId, setMajorId] = useState<number>(0);
    const [formType, setFormType] = useState<"faculty" | "major">("faculty");
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Faculty_MajorsItemquery = useQuery<IFaculty_MajorsItem[], Error>({
        queryKey: ["faculty-majors", version],
        retry: 1,
        queryFn: async () => {
            return await getAllFaculty_Majors();
        },
    });

    const handleToggleRow = useCallback((facultyId: number) => {
        setOpenRows((prev) => ({
            ...prev,
            [facultyId]: !prev[facultyId],
        }));
    }, []);

    const handleOpenCreateFaculty = useCallback(() => {
        setFormType("faculty");
        setFormMode("create");
        setFacultyId(0);
        setMajorId(0);
        setOpenModal(true);
    }, []);

    const handleOpenEditFaculty = useCallback((facultyId: number) => {
        setFormType("faculty");
        setFormMode("edit");
        setFacultyId(facultyId);
        setMajorId(0);
        setOpenModal(true);
    }, []);

    const handleOpenCreateMajor = useCallback((facultyId: number) => {
        setFormType("major");
        setFormMode("create");
        setFacultyId(facultyId); // ✅ ใช้ตอนเพิ่มสาขา
        setMajorId(0);
        setOpenModal(true);
    }, []);

    const handleOpenEditMajor = useCallback((majorId: number,facultyId: number) => {
        setFormType("major");
        setFacultyId(facultyId);
        setFormMode("edit");
        setMajorId(majorId); // ✅ ใช้ตอนแก้ไขสาขา
        setOpenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
        setFormMode("create");
        setFormType("faculty");
        setFacultyId(0);
        setMajorId(0);
    }, []);

    return {
        reload,

        openRows,
        setOpenRows,
        handleToggleRow,

        openModal,
        setOpenModal,
        formMode,
        setFormMode,
        facultyId,
        setFacultyId,

        majorId,
        setMajorId,
        formType,
        setFormType,

        handleOpenCreateFaculty,
        handleOpenEditFaculty,
        handleOpenCreateMajor,
        handleOpenEditMajor,
        handleCloseModal,

        Faculty_MajorsItem_data: Faculty_MajorsItemquery.data ?? [],
        Faculty_MajorsItemLoading: Faculty_MajorsItemquery.isLoading,
        Faculty_MajorsItemFetching: Faculty_MajorsItemquery.isFetching,
        Faculty_MajorsItemError: Faculty_MajorsItemquery.error,
        refetchFaculty_MajorsItem: Faculty_MajorsItemquery.refetch,
    };
};

export type IuseFaculty_MajorsFetch = ReturnType<typeof useFaculty_MajorsFetch>;


export const useFacultyFormFetch = ({
    id = 0,
    facultyId,
    formMode,
    formType,
    majorId,
    openModal,
    setOpenModal,
    reload
}: {
    id: number;
    facultyId: number;
    majorId: number;
    formMode: "create" | "edit";
    formType: "faculty" | "major";
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
}) => {
    const navigate = useNavigate();

    const Id = formType === "major" ? majorId ?? 0 : facultyId ?? 0;
    const isCreate = formMode === "create";
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const methods = useForm<IFacultyBody>({
        resolver: zodResolver(MasterFacultyZod as any) as Resolver<IFacultyBody>,
        defaultValues: IFacultyDataDefule,
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
        queryKey: [formType === "major" ? "major-one" : "faculty-one", Id],
        enabled: openModal && formMode === "edit" && !!Id,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            if (formType === "major") {
                return await getOneMajors(Id); // ✅ API get major by major_id
            }

            return await getOneFaculty(Id); // ✅ API get faculty by faculty_id
        },
    });

    useEffect(() => {
        if (!openModal) return;
        if (formMode !== "create") return;

        if (formType === "major") {
            reset({
                ...IFacultyDataDefule,
                faculty_id: facultyId ?? 0, // ✅ เพิ่มสาขา ต้องรู้ว่าอยู่คณะไหน
                major_id: 0,
                major_name: "",
            });
            return;
        }

        reset({
            ...IFacultyDataDefule,
            faculty_id: 0,
            faculty_name: "",
        });
    }, [openModal, formMode, formType, facultyId, reset]);

    const didInitRef = useRef(false);

    useEffect(() => {
        didInitRef.current = false;
    }, [Id, openModal]);

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
        const name_by = localStorage.getItem("account_name") || "";

        try {
            if (formType === "faculty") {
                if (formMode === "create") {
                    const data_create = {
                        faculty_name: form.faculty_name,
                        created_by_name: name_by,
                    };

                    console.log("Create Faculty", data_create);
                    await CreateFaculty(data_create);
                    reload(); // ✅ โหลดข้อมูลใหม่
                    setOpenModal(false);
                } else {
                    const data_update = {
                        faculty_id: facultyId,
                        faculty_name: form.faculty_name,
                        updated_by_name: name_by,
                    };

                    console.log("Update Faculty", data_update);
                    await UpdateFaculty(data_update);
                    reload(); // ✅ โหลดข้อมูลใหม่
                    setOpenModal(false);
                }
            }

            if (formType === "major") {
                if (formMode === "create") {
                    const data_create = {
                        faculty_id: facultyId, // ✅ ใช้ facultyId ตอนเพิ่มสาขา
                        major_name: form.major_name || '',
                        created_by_name: name_by,
                    };

                    console.log("Create Major", data_create);
                    await CreateMajors(data_create);
                    reload(); // ✅ โหลดข้อมูลใหม่
                    setOpenModal(false);
                } else {
                    const data_update = {
                        faculty_id: String(facultyId) ,
                        major_id: majorId, // ✅ ใช้ majorId ตอนแก้ไขสาขา
                        major_name: form.major_name,
                        updated_by_name: name_by,
                    };

                    console.log("Update Major", data_update);
                    await UpdateMajors(data_update);
                    reload(); // ✅ โหลดข้อมูลใหม่
                    setOpenModal(false);
                }
            }

            setFlash({
                type_severity: "success",
                title: "",
                content: formMode === "create" ? "การสร้างข้อมูลสำเร็จ" : "แก้ไขข้อมูลสำเร็จ",
            });

            setOpenModal(false);
            reset(IFacultyDataDefule);
        } catch (error) {
            console.error(error);
            setFlash({
                type_severity: "error",
                title: "",
                content: "เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้",
            });
        }
    }, [
        getValues,
        formType,
        formMode,
        facultyId,
        majorId,
        reset,
        setFlash,
        setOpenModal,
    ]);

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

    const handleDelete = useCallback(
        async (deleteType?: "faculty" | "major", deleteId?: number) => {
            try {
                const name_by = localStorage.getItem("account_name") || "";
                const currentType = deleteType ?? formType;

                if (currentType === "faculty") {
                    console.log("deletefaculty")
                    const data_delete: IFacultyBody = {
                        faculty_id: deleteId ?? facultyId,
                        updated_by_name: name_by,
                    };
                    await DeleteFaculty(data_delete);
                }

                if (currentType === "major") {
                    await DeleteMajors({
                        major_id: deleteId ?? majorId,
                        updated_by_name: name_by,
                    });
                }

                setFlash({
                    type_severity: "success",
                    title: "",
                    content: "ลบข้อมูลสำเร็จ",
                });

                reload(); // ✅ สำคัญ
                setOpenModal(false);
            } catch (error) {
                console.error(error);
                setFlash({
                    type_severity: "error",
                    title: "",
                    content: "เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้",
                });
            }
        },
        [formType, facultyId, majorId, reload, setFlash, setOpenModal]
    );
    const onClickDeleteMaster = useCallback(
        (deleteType?: "faculty" | "major", deleteId?: number) => {
            setConfirmPopup({
                type: "warning",
                title: "ท่านต้องการลบข้อมูล !!",
                content: "ยืนยันหากต้องการลบข้อมูล ข้อมูลที่ลบไม่สามารถนำกลับมาได้",
                onClose: () => setConfirmPopup(null),
                onConfirm: async () => {
                    await handleDelete(deleteType, deleteId);
                    setConfirmPopup(null);
                },
                confirmText: "ยืนยัน",
                cancelText: "ยกเลิก",
            });
        },
        [handleDelete, setConfirmPopup]
    );

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
        setError,
        clearErrors,
        setFlash,
        setConfirmPopup,
        navigate,
        methods,
        onSubmitMaster,
        onClickDeleteMaster,
        handleErrorSubmit,
        refetch: query.refetch,
        queryError: query.error,
        openModal,
        setOpenModal,
        formType,
        formMode,
        facultyId,
        majorId,
        id: Id,
        isCreate,
    };
};

export type IuseFacultyFormFetch = ReturnType<typeof useFacultyFormFetch>;