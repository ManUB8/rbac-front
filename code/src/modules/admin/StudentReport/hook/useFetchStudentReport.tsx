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
import { searchStateStudentReport } from "./useContext";
import { getAllStudentReport } from "../service/StudentReportApi";
import type { IStudentActivityAllData, IStudentActivityAllResponse, IStudentReportResponse } from "../interface/StudentReport.interface";


export const useFetchStudentReport = () => {
    const navigate = useNavigate();
    const [searchState, setSearchStateStudentReport] = useAtom(searchStateStudentReport);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [, setFlash] = useAtom(flashAlertAtom);

    const [searchInput, setSearchInput] = useState(searchState.search ?? "");
    const [searchInputCode, setSearchInputCode] = useState(searchState.student_code ?? "");
    const debounceRef = useRef<number | null>(null);

    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const query = useQuery<IStudentActivityAllResponse, Error>({
        queryKey: ["student-report", searchState],
        staleTime: 0,
        refetchOnMount: "always",
        retry: 1,
        queryFn: async () => {
            const res = await getAllStudentReport(searchState);

            if (res.detail) {
                setFlash({
                    type_severity: res.detail.length > 0 ? "success" : "warning",
                    title: "",
                    content: res.detail,
                });
            }

            return res;
        },
    });
    
    const handleChangeSearch = useCallback((text: string) => {
        setSearchInput(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateStudentReport((prev) => ({
                ...prev,
                search: text || ""
            }));
        }, 800);
    }, [setSearchStateStudentReport]);

    useEffect(() => {
        setSearchInput(searchState.search ?? "");
    }, [searchState.search]);

    const handleChangeSearchCode = useCallback((text: string) => {
        setSearchInputCode(text);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            setSearchStateStudentReport((prev) => ({
                ...prev,
                student_code: text || "",
            }));
        }, 800);
    }, [setSearchInputCode]);

    useEffect(() => {
        setSearchInputCode(searchState.student_code ?? "");
    }, [searchState.student_code]);



    const report_data = query.data?.data
    const report_loading = query.isLoading
    const report_fetch = query.isFetched


    return {
        navigate,
        reload,
        setSearchStateStudentReport,
        searchInput,
        searchState,
        setSearchInput,
        handleChangeSearch,
        setConfirmPopup,
        report_data,
        report_fetch,
        report_loading,
        searchInputCode,
        setSearchInputCode,
        handleChangeSearchCode

    };
};

export type IuseFetchStudentReport = ReturnType<typeof useFetchStudentReport>;
