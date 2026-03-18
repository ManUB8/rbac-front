import { useEffect, useState } from "react";
import type { IFaculty } from "../interface/Login.interface";
import { getAllFaculty } from "../service/LoginApi";


export const useFetchFaculty = () => {
    const [faculty, setFaculty] = useState<IFaculty[]>([]);
    const [loading_faculty, setLoading_Faculty] = useState(true);
    const [version, setVersion] = useState(0);

    const reload = () => setVersion(v => v + 1);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setLoading_Faculty(true);
            try {
                const res = await getAllFaculty();
                const rows = res;
                console.log(rows)

                if (!cancelled) setFaculty(rows);
            } finally {
                if (!cancelled) setLoading_Faculty(false);
            }
        };

        run();

        return () => { cancelled = true; };
    }, [version]);  // ❗️เอา searchState ออกไป

    return { faculty, loading_faculty, reload };
};