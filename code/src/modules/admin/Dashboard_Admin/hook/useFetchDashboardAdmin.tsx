import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllDashboardAdminActivityRank,
    getAllDashboardAdminFacultyRank,
    getAllDashboardAdminFacultySummary,
    getAllDashboardAdminMajorRank,
    getAllDashboardAdminSum,
    getAllDashboardAdminYearCount,
    getAllYear,
} from "../service/DashboardAdminApi";
import type { IActivityDashboardResponse, IStudentSummaryResponse } from "../interface/DashboardAdmin.interface";
import { useFetchActivityFilter } from "../../ActivityManage/hook/useFetchActivity";

export const useFetchDashboardAdmin = () => {
    const navigate = useNavigate();
    const { activity_filter, activity_filter_Loading } = useFetchActivityFilter()
    const [version, setVersion] = useState(0);
    const [selectedId, setSelectedId] = useState<number | 0>(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const sumQuery = useQuery<IActivityDashboardResponse, Error>({
        queryKey: ["dashboard-admin-sum", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminSum(selectedId);
        },
    });

    const activityRankQuery = useQuery({
        queryKey: ["dashboard-admin-activity-rank", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminActivityRank(selectedId);
        },
    });

    const yearCountQuery = useQuery({
        queryKey: ["dashboard-admin-year-count", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminYearCount(selectedId);
        },
    });

    const facultyRankQuery = useQuery({
        queryKey: ["dashboard-admin-faculty-rank", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminFacultyRank(selectedId);
        },
    });

    const majorRankQuery = useQuery({
        queryKey: ["dashboard-admin-major-rank", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminMajorRank(selectedId);
        },
    });

    const facultySummaryQuery = useQuery({
        queryKey: ["dashboard-admin-faculty-summary", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdminFacultySummary(selectedId);
        },
    });

    const dashboard_data = sumQuery.data?.data
        ? {
            ...sumQuery.data.data,
            activity_rank: activityRankQuery.data ?? sumQuery.data.data.activity_rank,
            faculty_rank: facultyRankQuery.data ?? sumQuery.data.data.faculty_rank,
            major_rank: majorRankQuery.data ?? sumQuery.data.data.major_rank,
            year_count: yearCountQuery.data ?? sumQuery.data.data.year_count,
            faculty: facultySummaryQuery.data ?? sumQuery.data.data.faculty,
        }
        : undefined;
    const dashboard_Loading = sumQuery.isLoading
    const activity_rank_Loading = activityRankQuery.isLoading
    const year_count_Loading = yearCountQuery.isLoading
    const faculty_rank_Loading = facultyRankQuery.isLoading
    const major_rank_Loading = majorRankQuery.isLoading
    const faculty_summary_Loading = facultySummaryQuery.isLoading

    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        activity_filter,
        activity_filter_Loading,
        dashboard_data,
        dashboard_Loading,
        activity_rank_Loading,
        year_count_Loading,
        faculty_rank_Loading,
        major_rank_Loading,
        faculty_summary_Loading

    };
};

export type IuseuseFetchDashboardAdmin = ReturnType<typeof useFetchDashboardAdmin>;



export const useFetchYear = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const [selectedId, setSelectedId] = useState<number | 0>(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const query = useQuery<IStudentSummaryResponse, Error>({
        queryKey: ["year-admin", version],
        retry: 1,
        queryFn: async () => {
            return await getAllYear();
        },
    });
    const year_data = query.data?.faculty ?? []
    const total_stu = query.data?.count_student ?? 0
    const year_Loading = query.isLoading
    console.log("year_data",year_data)
    console.log("total_stu",total_stu)

    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        year_data,
        total_stu,
        year_Loading
    };
};
