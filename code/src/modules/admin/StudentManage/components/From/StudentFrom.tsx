import React from "react";
import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { FormProvider } from "react-hook-form";
import { useMasterFunctionStudentFromFetch } from "../../hook/useFetchStudentMange";
import DateilStudent from "./DateilStudent";

export interface IStudentFromProps {
    open: boolean;
    id?: number;
    facultyId?: number | null;
    majorId?: number | null;
    onClose: () => void;
    reload: () => void; // ✅ เพิ่ม
}
const StudentFrom: React.FunctionComponent<IStudentFromProps> = ({
    open,
    id = 0,
    facultyId,
    majorId,
    onClose,
    reload,
}) => {
    const MasterStudent = useMasterFunctionStudentFromFetch({
        id,
        facultyId,
        majorId,
        openStudentModal: open,
        setOpenStudentModal: (value) => {
            if (typeof value === "function") return;
            if (!value) onClose();
        },
        reload,

    });

    const methods = MasterStudent.methods;

    if (MasterStudent.loading) {
        return <LoadingDisplayLast loading={MasterStudent.loading} />;
    }

    return (
        <FormProvider {...methods}>
            <form
                autoComplete="off"
                id="student-form"
                onSubmit={MasterStudent.handleSubmit(
                    MasterStudent.onSubmitMaster,
                    (errs) => MasterStudent.handleErrorSubmit(errs, methods.setFocus)
                )}
            >
                <DateilStudent MasterStudent={MasterStudent} />
            </form>
        </FormProvider>
    );
};

export default StudentFrom;