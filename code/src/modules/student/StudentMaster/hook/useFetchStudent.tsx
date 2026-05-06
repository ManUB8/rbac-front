import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as R from 'ramda';
import Swal from "sweetalert2";
import { getAllErrorPaths } from "../../../../shared/components/error/FunctionError";
import type { IStudentItem } from "../../../auth/interface/Login.interface";
import { getOneStudent } from "../service/StudentMasterApi";

export const useActivityFetch = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | 0>(0);
    const Id =  localStorage.getItem("user_id") || ''
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IStudentItem, Error>({
        queryKey: ["activity", version],
        retry: 1,
        queryFn: async () => {
            return await getOneStudent(Number(Id));
        },
    });
    const handleOpenAdd = () => {
        setSelectedId(0);
        setOpenModal(true);
    };

    const handleOpenEdit = (activity_id: number) => {
        setSelectedId(activity_id);
        setOpenModal(true);
    };

    const handleDelete = (activity_id: number) => {

    };
    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        handleOpenAdd,
        handleOpenEdit,
        handleDelete,
        openModal,
        setOpenModal,
        activity_data: Activityquery.data ?? [],
        activityLoading: Activityquery.isLoading,
        activityFetching: Activityquery.isFetching,
        activityError: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};

export type IuseActivityFetch = ReturnType<typeof useActivityFetch>;

// export const useActivityStatusFetch = () => {
//     const navigate = useNavigate();
//     const [version, setVersion] = useState(0);
//     const reload = useCallback(() => {
//         setVersion((v) => v + 1);
//     }, []);

//     const Activityquery = useQuery<IActivityItem[], Error>({
//         queryKey: ["activity", version],
//         retry: 1,
//         queryFn: async () => {
//             return await getActivityStatus();
//         },
//     });
  
//     return {
//         navigate,
//         reload,
//         activity_data: Activityquery.data ?? [],
//         total: Activityquery.data?.length ?? 0,
//         activityLoading: Activityquery.isLoading,
//         activityFetching: Activityquery.isFetching,
//         activityError: Activityquery.error,
//         refetchActivity: Activityquery.refetch,
//     };
// };
