import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as R from 'ramda';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { useForm, type FieldErrors, type Path, type Resolver, type UseFormSetFocus } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPopupAtom, flashAlertAtom } from '../../../../shared/components/constants/OptionsAtom';
import type { IStudentYearSummaryBody } from '../interface/StudentYearSummary.interface';
import { getAllStudentYearReport } from '../service/StudentYearSummaryApi';
export const useFetchMasterStudentYearReport = () => {
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const queryClient = useQueryClient();
    const [studentCodeInput, setStudentCodeInput] = useState("");
    const [searchInput, setSearchInput] = useState<IStudentYearSummaryBody>({
        year_status: "",
        student_code_prefix: "",
    });

    const debounceRef = useRef<number | null>(null);

    const query = useQuery({
        queryKey: ["student_year_list", searchInput],
        queryFn: async () => getAllStudentYearReport(searchInput),
        enabled: !!searchInput.year_status || !!searchInput.student_code_prefix,
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
    });

    const student_year_data = query.data?.faculty ?? [];
    const total_student_year = query.data?.count_student ?? 0;
    const loading_student_year = query.isLoading || query.isFetching;

    const reload = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["student_year_list"] });
    }, [queryClient]);

    const handleChangeYearStatus = useCallback((year_status: string) => {
        setSearchInput((prev) => ({
            ...prev,
            year_status,
        }));
    }, [setSearchInput]);

    const handleChangeStudentCodePrefix = useCallback((text: string) => {
        setStudentCodeInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchInput((prev) => ({
                ...prev,
                student_code_prefix: text,
            }));
        }, 800);
    }, [setSearchInput]);



    return {
        setConfirmPopup,
        studentCodeInput,
        setStudentCodeInput,
        searchInput,
        setSearchInput,
        handleChangeYearStatus,
        handleChangeStudentCodePrefix,

        navigate,
        reload,
        setFlash,
        openRows,
        setOpenRows,

        student_year_data,
        total_student_year,
        loading_student_year,
    };
};
export type IuseFetchMasterStudentYearReport = ReturnType<typeof useFetchMasterStudentYearReport>;
