import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPopupAtom } from "../../../../shared/components/constants/OptionsAtom";
import { getAllDashboardAdmin } from "../service/DashboardAdminApi";
import type { IActivityDashboardResponse } from "../interface/DashboardAdmin.interface";
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