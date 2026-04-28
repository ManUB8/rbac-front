import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getAllActivity } from "../service/ActivityApi";
import type { IActivityItem } from "../interface/Activity.interface";

export const useActivityFetch = () => {
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Activityquery = useQuery<IActivityItem[], Error>({
        queryKey: ["activity_id", version],
        retry: 1,
        queryFn: async () => {
            return await getAllActivity();
        },
    });

    return {
        reload,
        Activity_data: Activityquery.data ?? [] ,
        ActivityLoading: Activityquery.isLoading,
        ActivityFetching: Activityquery.isFetching,
        ActivityError: Activityquery.error,
        refetchActivity: Activityquery.refetch,
    };
};

export type IuseActivityFetch = ReturnType<typeof useActivityFetch>;