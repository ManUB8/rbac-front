import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import type { IuseFetchMasterStudentYearReport } from '../../hook/useFetchStudentYearReport';
import type { IFacultyStudentCount } from '../../interface/StudentYearSummary.interface';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T) => React.ReactNode;
}

export function useMasterStudentYearReportColumns(mastercontroller: IuseFetchMasterStudentYearReport): Column<IFacultyStudentCount>[] {

    return React.useMemo<Column<IFacultyStudentCount>[]>(() => [
        {
            id: "expand",
            label: "",
            minWidth: 60,
            align: "center",
            render: (row) => (
                <IconButton
                    size="small"
                    onClick={() =>
                        mastercontroller.setOpenRows((prev) => ({
                            ...prev,
                            [row.faculty_id]: !prev[row.faculty_id],
                        }))
                    }
                >
                    {mastercontroller.openRows[row.faculty_id]
                        ? <KeyboardArrowDownIcon />
                        : <KeyboardArrowRightIcon />}
                </IconButton>
            ),
        },
        {
            id: "faculty_name",
            label: "คณะ",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.faculty_name || "-"}</Typography>
            ),
        },
        {
            id: "count_student",
            label: "จำนวนนิสิตในคณะ",
            minWidth: 200,
            align: "left",
            render: (row) => (
                <Typography variant="subtitle2">{row?.count_student || "-"} คน</Typography>
            ),
        },
       
    ], [mastercontroller]);
}