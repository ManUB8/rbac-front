import React from "react";
import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { FormProvider } from "react-hook-form";
import { useMasterFunctionActivityFromFetch, type IuseActivityFetch } from "../../hook/useFetchActivity";
import ActivityModal from "./ActivityModal";

export interface IActivityFromProps {
    MasterActivity: IuseActivityFetch;
}

const ActivityFrom: React.FunctionComponent<IActivityFromProps> = ({
    MasterActivity,
}) => {
    const MasterActivitycontrol = useMasterFunctionActivityFromFetch({
        id: MasterActivity.selectedId,
        activity_id: MasterActivity.selectedId,
        formMode: MasterActivity.formMode,
        openModal: MasterActivity.openModal,
        setOpenModal: MasterActivity.setOpenModal,
        reload: MasterActivity.reload,
    });
    const methods = MasterActivitycontrol.methods;

    if (MasterActivitycontrol.loading) {
        return <LoadingDisplayLast loading={MasterActivitycontrol.loading} />;
    }

    return (
        <FormProvider {...methods}>
            <form
                autoComplete="off"
                id="activity-form"
                onSubmit={MasterActivitycontrol.handleSubmit(
                    MasterActivitycontrol.onSubmitMaster,
                    (errs) => MasterActivitycontrol.handleErrorSubmit(errs, methods.setFocus)
                )}
            >
                <ActivityModal MasterController={MasterActivitycontrol} />
            </form>
        </FormProvider>
    );
};

export default ActivityFrom;