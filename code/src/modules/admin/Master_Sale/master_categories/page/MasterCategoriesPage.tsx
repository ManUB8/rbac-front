import React from 'react';
import { useFetchMasterCategoryList } from '../hook/useFetchMasterCategories';
import HeadCategories from '../components/page/HeadCategories';
import TableCategories from '../components/page/TableCategories';

export interface IMasterCategoriesPageProps { };

const MasterCategoriesPage: React.FunctionComponent<IMasterCategoriesPageProps> = props => {
    const master = useFetchMasterCategoryList()
    return (
        <>
            <HeadCategories master={master}/>
            <TableCategories master={master}/>
        </>
    )
};

export default MasterCategoriesPage;