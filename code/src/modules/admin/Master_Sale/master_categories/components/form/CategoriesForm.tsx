import React from 'react';
import { useFetchMasterCategoryFrom, type IuseFetchMasterCategoryList } from '../../hook/useFetchMasterCategories';
import { Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import DetailCategories from './DetailCategories';

export interface ICategoriesFormProps {
    master: IuseFetchMasterCategoryList
};

const CategoriesForm: React.FunctionComponent<ICategoriesFormProps> = ({ master }) => {

    const masterController = useFetchMasterCategoryFrom(
        master.selectedId,
        master.setOpenModel,
        master.openModel
    )
    const methods = masterController.methods;
        return (
        <>
            <Box>
                <FormProvider {...methods}>
                    <form
                        autoComplete="off"
                        id="categories-form"
                        onSubmit={masterController.handleSubmit(
                            masterController.onSubmitMaster,
                            (errors) =>
                                masterController.handleErrorSubmit(errors, methods.setFocus)
                        )}
                    >
                        <DetailCategories masterController={masterController} master={master}/>
                    </form>
                </FormProvider>
            </Box>
        </>
    )
};

export default CategoriesForm;