import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosition } from "../components/PositionApi";
import type { IPositionItem } from "../interface/Position.interface";


export const useFetchPosition = () => {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const query = useQuery<IPositionItem[], Error>({
        queryKey: ["position", version],
        retry: 1,
        queryFn: async () => {
            return await getAllPosition();
        },
    });

    const position_data = query.data ?? []
    const loading_position = query.isLoading || query.isFetched

    return {
        navigate,
        reload,
        position_data,
        loading_position
    };
};
