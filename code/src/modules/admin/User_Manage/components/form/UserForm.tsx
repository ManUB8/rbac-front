import React from "react";
import { FormProvider } from "react-hook-form";

import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { useMasterFunctionUserFromFetch } from "../../hook/useFetchUser";
import DetailUser from "./DetailUser";

export interface IUserFromProps {
    open: boolean;
    id?: number;
    onClose: () => void;
    reload: () => void;
}

const UserFrom: React.FC<IUserFromProps> = ({
    open,
    id = 0,
    onClose,
    reload,
}) => {
    const MasterUser = useMasterFunctionUserFromFetch({
        id,
        openUserModal: open,
        setOpenUserModal: (value) => {
            if (typeof value === "function") return;
            if (!value) onClose();
        },
        reload,
    });

    const methods = MasterUser.methods;

    if (MasterUser.loading) {
        return <LoadingDisplayLast loading={MasterUser.loading} />;
    }

    return (
        <FormProvider {...methods}>
            <form
                id="User-form"
                autoComplete="off"
                onSubmit={methods.handleSubmit(
                    MasterUser.onSubmitMaster,
                    (errs) => MasterUser.handleErrorSubmit(errs, methods.setFocus)
                )}
            >
                <DetailUser MasterUser={MasterUser} />
            </form>
        </FormProvider>
    );
};

export default UserFrom;