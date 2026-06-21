import React from "react";
import { useFetchMasterCategoryList } from "../hook/useFetchMasterCategories";
import HeadCategories from "../components/page/HeadCategories";
import TableCategories from "../components/page/TableCategories";
import CategoriesForm from "../components/form/CategoriesForm";

export interface IMasterCategoriesPageProps {}

const MasterCategoriesPage: React.FC<IMasterCategoriesPageProps> = () => {
    const master = useFetchMasterCategoryList();

    return (
        <>
            <HeadCategories master={master} />
            <TableCategories master={master} />
            <CategoriesForm master={master} />
        </>
    );
};

export default MasterCategoriesPage;