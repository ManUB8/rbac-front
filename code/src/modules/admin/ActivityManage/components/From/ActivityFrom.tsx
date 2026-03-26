import React from "react";
import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { FormProvider } from "react-hook-form";
import { useMasterFunctionActivityFromFetch, type IuseActivityFetch } from "../../hook/useFetchActivity";
import ActivityModal from "./ActivityModal";

export interface IActivityFromProps {
    master: IuseActivityFetch;
}

const ActivityFrom: React.FunctionComponent<IActivityFromProps> = ({
    master,
}) => {
    const mastercontrol = useMasterFunctionActivityFromFetch({
        id: master.selectedId,
        openModal: master.openModal,
        setOpenModal: master.setOpenModal,
    });

    const methods = mastercontrol.methods;

    if (mastercontrol.loading) {
        return <LoadingDisplayLast loading={mastercontrol.loading} />;
    }

    return (
        <FormProvider {...methods}>
            <form
                autoComplete="off"
                id="activity-form"
                onSubmit={mastercontrol.handleSubmit(
                    mastercontrol.onSubmitMaster,
                    (errs) => mastercontrol.handleErrorSubmit(errs, methods.setFocus)
                )}
            >
                <ActivityModal mastercontrol={mastercontrol} />
            </form>
        </FormProvider>
    );
};

export default ActivityFrom;