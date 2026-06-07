import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDashboardAdmin, getAllYear } from "../service/DashboardAdminApi";
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

    const query = useQuery<IActivityDashboardResponse, Error>({
        queryKey: ["dashboard-admin", version, selectedId],
        retry: 1,
        queryFn: async () => {
            return await getAllDashboardAdmin(selectedId);
        },
    });
    const dashboard_data = query.data?.data
    const dashboard_Loading = query.isLoading
    console.log("dashboard_data",dashboard_data)

    return {
        navigate,
        reload,
        selectedId,
        setSelectedId,
        activity_filter,
        activity_filter_Loading,
        dashboard_data,
        dashboard_Loading

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
