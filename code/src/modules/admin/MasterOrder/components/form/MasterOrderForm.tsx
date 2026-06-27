import React from 'react';
import { useFetcOrderFrom, type IuseFetchMasterFunctionOrder } from '../../hook/useFetchMasterOrder';
import { Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import DetailOrder from './DetailOrder';

export interface IMasterOrderFormProps {
    mastercontroller: IuseFetchMasterFunctionOrder
};

const MasterOrderForm: React.FunctionComponent<IMasterOrderFormProps> = ({ mastercontroller }) => {
    const controller = useFetcOrderFrom(mastercontroller.selectedId, mastercontroller.openModal, mastercontroller.setOpenModal)
    const methods = controller.methods;
    return (
        <>
            <Box>
                <FormProvider {...methods}>
                    <form
                        autoComplete="off"
                        id="order-form"
                        onSubmit={controller.handleSubmit(
                            controller.onSubmitMaster,
                            (errors) =>
                                controller.handleErrorSubmit(errors, methods.setFocus)
                        )}
                    >
                        <DetailOrder mastercontroller={mastercontroller} controller={controller} />
                    </form>
                </FormProvider>
            </Box>
        </>
    )
};

export default MasterOrderForm;