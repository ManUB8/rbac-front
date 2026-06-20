import React from 'react';
import { useFetchProductFrom, type IuseFetchMasterFunctionProduct } from '../../hook/useFetchMasterProduct';
import { Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import DetailProduct from './DetailProduct';

export interface IMasterProductFormProps {
    master_product: IuseFetchMasterFunctionProduct;
};

const MasterProductForm: React.FunctionComponent<IMasterProductFormProps> = ({ master_product }) => {
    const controller = useFetchProductFrom(master_product.selectedId, master_product.openModal, master_product.setOpenModal);
    const methods = controller.methods;
    return (
        <>
            <Box>
                <FormProvider {...methods}>
                    <form
                        autoComplete="off"
                        id="product-form"
                        onSubmit={controller.handleSubmit(
                            controller.onSubmitMaster,
                            (errors) =>
                                controller.handleErrorSubmit(errors, methods.setFocus)
                        )}
                    >
                        <DetailProduct controller={controller} master_product={master_product} />
                    </form>
                </FormProvider>
            </Box>
        </>
    )
};

export default MasterProductForm;