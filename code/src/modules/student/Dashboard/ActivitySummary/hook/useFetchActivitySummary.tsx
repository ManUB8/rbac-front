import { useCallback, useState } from "react";
import { getActivitySummaryDashboard } from "../service/ActivitySummaryApi";
import { useQuery } from "@tanstack/react-query";
import type { IStudentActivityHistoryResponse } from "../interface/ActivitySummary.interface";
import Cookies from "js-cookie";

export const usFetcheActivityStudentCode = () => {
    const userId = Cookies.get("userId");
    const code = Number(userId);
    console.log("stu_code", code);
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const query = useQuery<IStudentActivityHistoryResponse, Error>({
        queryKey: ["activity_code", version, code],
        retry: 1,
        queryFn: async () => {
            return await getActivitySummaryDashboard(code);
        },
    });
    const dashboard_code = query.data?.data

    return {
        reload,
        dashboard_code,
        dashboard_Loading: query.isLoading,
        dashboard_Fetching: query.isFetching,
        dashboard_Error: query.error,
        refetchdashboard: query.refetch,
    };
};

export type IusFetcheActivityStudentCode = ReturnType<typeof usFetcheActivityStudentCode>;