import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { IStudentItem } from "../interface/Student.interface";
import { getOneStudent } from "../service/StudentApi";

export const useStudentFetch = () => {
    const [version, setVersion] = useState(0);
    const Stu_ID = localStorage.getItem("user_id");
    const reload = useCallback(() => {
        setVersion((v) => v + 1);
    }, []);

    const Studentquery = useQuery<IStudentItem, Error>({
        queryKey: ["student_id", version],
        retry: 1,
        queryFn: async () => {
            return await getOneStudent(Number(Stu_ID));
        },
    });

    return {
        reload,
        Student_data: Studentquery.data ,
        StudentLoading: Studentquery.isLoading,
        StudentFetching: Studentquery.isFetching,
        StudentError: Studentquery.error,
        refetchStudent: Studentquery.refetch,
    };
};

export type IuseStudentFetch = ReturnType<typeof useStudentFetch>;